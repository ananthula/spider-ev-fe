/**
 * build-blog.mjs
 *
 * Builds blog JSON consumed by the React app, sitemap, and prerender scripts.
 *
 * Source priority:
 *   1. WordPress CMS (cms.spiderenergy.in) when reachable and returning posts
 *   2. Local markdown in content/blog/ when CMS is down, disabled, or empty
 *
 * Outputs:
 *   - src/data/blog-posts.json         (metadata array for listing page + sitemap)
 *   - src/data/blog-content/<slug>.json (per-post { meta, html } for detail page)
 *
 * Env:
 *   WORDPRESS_API_URL      Base WP REST URL (default: https://cms.spiderenergy.in/wp-json/wp/v2)
 *   WORDPRESS_CMS_ENABLED  Set to "false" to force markdown fallback
 *
 * Run: node scripts/build-blog.mjs
 */

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  rmSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTENT_DIR = join(ROOT, "content", "blog");
const DATA_DIR = join(ROOT, "src", "data");
const CONTENT_OUT_DIR = join(DATA_DIR, "blog-content");

/** Load KEY=VALUE pairs from .env / .env.local without adding a dependency. */
function loadEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const file = join(ROOT, name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf-8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

loadEnvFiles();

const DEFAULT_WP_API = "https://cms.spiderenergy.in/wp-json/wp/v2";
const WP_API_URL = (process.env.WORDPRESS_API_URL || DEFAULT_WP_API).replace(/\/$/, "");
const CMS_ENABLED = process.env.WORDPRESS_CMS_ENABLED !== "false";
const FETCH_TIMEOUT_MS = 12_000;

// ─── Shared helpers ──────────────────────────────────────────────────────────

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(html = "") {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function normalizeDate(dateStr = "") {
  if (!dateStr) return "";
  return dateStr.slice(0, 10);
}

function normalizeDescription(description = "", maxLength = 160) {
  const clean = stripHtml(description);
  if (clean.length <= maxLength) return clean;
  const shortened = clean.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 100 ? lastSpace : shortened.length).trim()}…`;
}

// The page template owns the single H1; headings inside authored content start at H2.
function normalizeArticleHtml(html = "") {
  return html
    .replace(/<h1(\s[^>]*)?>/gi, "<h2$1>")
    .replace(/<\/h1>/gi, "</h2>")
    .replace(/<th>/gi, '<th scope="col">')
    .replace(
      /<table>/gi,
      '<div class="blog-table-scroll" role="region" aria-label="Article data table" tabindex="0"><table>'
    )
    .replace(/<\/table>/gi, "</table></div>");
}

function resetContentOutDir() {
  if (existsSync(CONTENT_OUT_DIR)) {
    rmSync(CONTENT_OUT_DIR, { recursive: true, force: true });
  }
  mkdirSync(DATA_DIR, { recursive: true });
  mkdirSync(CONTENT_OUT_DIR, { recursive: true });
}

function writePosts(posts, sourceLabel) {
  resetContentOutDir();

  const sorted = [...posts].sort(
    (a, b) => new Date(b.meta.date) - new Date(a.meta.date)
  );

  for (const { meta, html } of sorted) {
    writeFileSync(
      join(CONTENT_OUT_DIR, `${meta.slug}.json`),
      JSON.stringify({ meta, html }, null, 2),
      "utf-8"
    );
    console.log(`  ✓ ${meta.slug}`);
  }

  const index = sorted.map((p) => p.meta);
  writeFileSync(join(DATA_DIR, "blog-posts.json"), JSON.stringify(index, null, 2), "utf-8");
  console.log(`\nProcessed ${index.length} blog posts from ${sourceLabel} → src/data/`);
}

// ─── WordPress source ────────────────────────────────────────────────────────

async function fetchWordPressPage(page) {
  const url = `${WP_API_URL}/posts?status=publish&per_page=100&page=${page}&_embed=1`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`WordPress API HTTP ${res.status} for ${url}`);
  }

  const totalPages = Number.parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("WordPress API returned unexpected payload (expected array)");
  }

  return { data, totalPages };
}

function mapWordPressPost(post) {
  const embedded = post._embedded || {};
  const author =
    embedded.author?.[0]?.name ||
    "Spider Energy Team";

  const featured =
    embedded["wp:featuredmedia"]?.[0]?.source_url ||
    "";

  const terms = embedded["wp:term"] || [];
  const categories = (terms[0] || []).map((t) => t.name).filter(Boolean);
  const tags = (terms[1] || []).map((t) => t.name).filter(Boolean);

  const html = normalizeArticleHtml(post.content?.rendered || "");
  const title = stripHtml(post.title?.rendered || "");
  const description = normalizeDescription(
    stripHtml(post.excerpt?.rendered || "").slice(0, 300) ||
    stripHtml(html).slice(0, 180)
  );

  const slug = post.slug;
  if (!title || !slug) return null;

  const meta = {
    title,
    slug,
    description,
    date: normalizeDate(post.date),
    modifiedDate: normalizeDate(post.modified || post.date),
    author,
    category: categories[0] || "General",
    readTime: estimateReadTime(html),
    image: featured,
    tags,
    published: post.status === "publish",
    source: "wordpress",
  };

  return { meta, html };
}

async function loadFromWordPress() {
  if (!CMS_ENABLED) {
    console.log("WordPress CMS disabled via WORDPRESS_CMS_ENABLED=false");
    return null;
  }

  console.log(`Trying WordPress CMS at ${WP_API_URL} ...`);

  try {
    const all = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const { data, totalPages: pages } = await fetchWordPressPage(page);
      totalPages = pages;
      all.push(...data);
      page += 1;
    }

    const mapped = all.map(mapWordPressPost).filter(Boolean);

    if (mapped.length === 0) {
      console.warn(
        "  ⚠ CMS reachable but returned 0 published posts — falling back to markdown"
      );
      return null;
    }

    console.log(`  ✓ Fetched ${mapped.length} post(s) from WordPress`);
    return mapped;
  } catch (err) {
    console.warn(`  ⚠ WordPress CMS unavailable: ${err.message}`);
    console.warn("  → Falling back to local markdown in content/blog/");
    return null;
  }
}

// ─── Markdown fallback ───────────────────────────────────────────────────────

function loadFromMarkdown() {
  marked.setOptions({
    gfm: true,
    breaks: false,
  });

  if (!existsSync(CONTENT_DIR)) {
    console.log("No content/blog/ directory found");
    return [];
  }

  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("No blog posts found in content/blog/");
    return [];
  }

  console.log(`Reading ${files.length} markdown file(s) from content/blog/ ...`);
  const posts = [];

  for (const file of files) {
    const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
    const { data: frontmatter, content } = matter(raw);

    const required = ["title", "slug", "description", "date", "author", "category", "image"];
    const missing = required.filter((field) => !frontmatter[field]);
    if (missing.length > 0) {
      console.warn(`  ⚠ Skipping ${file}: missing fields: ${missing.join(", ")}`);
      continue;
    }

    const html = normalizeArticleHtml(marked(content));
    const meta = {
      title: frontmatter.title,
      slug: frontmatter.slug,
      description: normalizeDescription(frontmatter.description),
      date: normalizeDate(String(frontmatter.date)),
      modifiedDate: normalizeDate(String(frontmatter.modifiedDate || frontmatter.date)),
      author: frontmatter.author,
      category: frontmatter.category,
      readTime: frontmatter.readTime || estimateReadTime(html),
      image: frontmatter.image,
      tags: frontmatter.tags || [],
      published: frontmatter.published !== false,
      source: "markdown",
    };

    posts.push({ meta, html });
  }

  return posts;
}

function countMatches(value, pattern) {
  return (value.match(pattern) || []).length;
}

function preserveLocalStructure(cmsPosts, markdownPosts) {
  const localBySlug = new Map(markdownPosts.map((post) => [post.meta.slug, post]));

  return cmsPosts.map((cmsPost) => {
    const localPost = localBySlug.get(cmsPost.meta.slug);
    if (!localPost) return cmsPost;

    const cmsTableCount = countMatches(cmsPost.html, /<table\b/gi);
    const localTableCount = countMatches(localPost.html, /<table\b/gi);
    const cmsSectionCount = countMatches(cmsPost.html, /<h[23]\b/gi);
    const localSectionCount = countMatches(localPost.html, /<h[23]\b/gi);
    const needsTableFallback = localTableCount > cmsTableCount;
    const needsHeadingFallback = cmsSectionCount === 0 && localSectionCount > 0;

    if (!needsTableFallback && !needsHeadingFallback) return cmsPost;

    const reasons = [
      needsTableFallback ? `${localTableCount} local table(s) vs ${cmsTableCount} in CMS` : null,
      needsHeadingFallback ? "CMS body has no semantic H2/H3 sections" : null,
    ].filter(Boolean);
    console.warn(`  ⚠ ${cmsPost.meta.slug}: using structure-preserving Markdown body (${reasons.join(", ")})`);

    return {
      meta: { ...cmsPost.meta, structureSource: "markdown" },
      html: localPost.html,
    };
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const fromCms = await loadFromWordPress();
  const fromMarkdown = loadFromMarkdown();
  const posts = fromCms ? preserveLocalStructure(fromCms, fromMarkdown) : fromMarkdown;
  const sourceLabel = fromCms ? "WordPress CMS" : "markdown";

  if (posts.length === 0) {
    resetContentOutDir();
    writeFileSync(join(DATA_DIR, "blog-posts.json"), "[]", "utf-8");
    console.log("\nNo blog posts available — wrote empty blog-posts.json");
    return;
  }

  writePosts(posts, sourceLabel);
}

main().catch((err) => {
  console.error("build-blog failed:", err);
  process.exit(1);
});
