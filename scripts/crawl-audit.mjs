/**
 * crawl-audit.mjs
 *
 * A standards-compliant SEO crawler for spiderenergy.in
 * Respects robots.txt, follows internal links, and audits every page for:
 *   - Status code
 *   - Title tag (presence + length)
 *   - Meta description (presence + length)
 *   - Meta keywords
 *   - H1 tag (presence + length)
 *   - H2 tags (first H2 + count)
 *   - Word count (visible text)
 *   - Schema/JSON-LD detection
 *   - Open Graph tags
 *   - Canonical URL
 *   - Internal links found
 *   - Crawl depth
 *
 * Usage:
 *   node scripts/crawl-audit.mjs [--url https://spiderenergy.in] [--max 100] [--output crawl-report.json]
 *
 * Defaults to crawling the live site. Use --url http://localhost:4173 for local preview.
 * Outputs both a summary table to stdout and a detailed JSON report.
 */

import { writeFileSync } from "fs";

// ─── Configuration ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);
function getArg(flag, fallback) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

const BASE_URL = getArg("--url", "https://spiderenergy.in").replace(/\/$/, "");
const MAX_PAGES = parseInt(getArg("--max", "100"), 10);
const OUTPUT_FILE = getArg("--output", "crawl-report.json");
const DELAY_MS = parseInt(getArg("--delay", "500"), 10); // polite crawl delay
const USER_AGENT = "SpiderEnergyCrawlAudit/1.0 (+https://spiderenergy.in)";

// ─── Robots.txt Parser ──────────────────────────────────────────────────────

let disallowedPaths = [];

async function fetchRobotsTxt() {
  try {
    const res = await fetch(`${BASE_URL}/robots.txt`, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (res.ok) {
      const text = await res.text();
      let inUserAgent = false;
      for (const line of text.split("\n")) {
        const trimmed = line.trim().toLowerCase();
        if (trimmed.startsWith("user-agent:")) {
          const agent = trimmed.split(":")[1].trim();
          inUserAgent = agent === "*" || agent === "spiderenergycrawlaudit";
        } else if (inUserAgent && trimmed.startsWith("disallow:")) {
          const path = line.trim().split(":").slice(1).join(":").trim();
          if (path) disallowedPaths.push(path);
        }
      }
      console.log(`  robots.txt: ${disallowedPaths.length} disallow rules found`);
    } else {
      console.log("  robots.txt: not found (200 OK assumed for all paths)");
    }
  } catch (err) {
    console.log(`  robots.txt: fetch failed (${err.message}), proceeding without`);
  }
}

function isAllowedByRobots(pathname) {
  for (const rule of disallowedPaths) {
    if (pathname.startsWith(rule)) return false;
  }
  return true;
}

// ─── HTML Parsing Helpers (regex-based, no deps) ─────────────────────────────

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractAll(html, regex) {
  const results = [];
  let match;
  const re = new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g");
  while ((match = re.exec(html)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");
}

function stripTags(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function extractLinks(html, baseUrl, currentPath) {
  const links = new Set();
  const hrefRegex = /href="([^"]+)"/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    let href = match[1];
    // Skip anchors, mailto, tel, javascript, external
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    // Convert relative to absolute
    if (href.startsWith("/")) {
      href = baseUrl + href;
    } else if (!href.startsWith("http")) {
      // Relative path
      const base = currentPath.endsWith("/") ? currentPath : currentPath.substring(0, currentPath.lastIndexOf("/") + 1);
      href = baseUrl + base + href;
    }
    // Only internal links
    if (href.startsWith(baseUrl)) {
      // Normalize: strip trailing slash, strip hash
      let url = href.split("#")[0].split("?")[0];
      if (url !== baseUrl && url.endsWith("/")) url = url.slice(0, -1);
      links.add(url);
    }
  }
  return [...links];
}

// ─── Page Auditor ───────────────────────────────────────────────────────────

function auditPage(html, url, statusCode, depth) {
  const pathname = url.replace(BASE_URL, "") || "/";

  // Title
  const title = decodeEntities(extractTag(html, /<title>([^<]*)<\/title>/i));
  const titleLength = title ? title.length : 0;

  // Meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)
    || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i);
  const description = descMatch ? decodeEntities(descMatch[1]) : null;
  const descLength = description ? description.length : 0;

  // Meta keywords
  const kwMatch = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i)
    || html.match(/<meta\s+content="([^"]*)"\s+name="keywords"/i);
  const keywords = kwMatch ? decodeEntities(kwMatch[1]) : null;

  // H1
  const h1s = extractAll(html, /<h1[^>]*>([^<]*)<\/h1>/i);
  const h1 = h1s.length > 0 ? decodeEntities(h1s[0]) : null;
  const h1Length = h1 ? h1.length : 0;
  const h1Count = h1s.length;

  // H2s
  const h2s = extractAll(html, /<h2[^>]*>([^<]*)<\/h2>/gi);
  const h2First = h2s.length > 0 ? decodeEntities(h2s[0]) : null;
  const h2Count = h2s.length;

  // Word count (strip all HTML, count words)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyText = bodyMatch ? stripTags(bodyMatch[1]) : stripTags(html);
  const wordCount = countWords(bodyText);

  // Schema (JSON-LD)
  const schemaScripts = extractAll(html, /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  const schemaCount = schemaScripts.length;
  const schemaTypes = [];
  for (const script of schemaScripts) {
    try {
      const data = JSON.parse(script);
      if (data["@type"]) schemaTypes.push(data["@type"]);
      if (data["@graph"]) {
        for (const item of data["@graph"]) {
          if (item["@type"]) schemaTypes.push(item["@type"]);
        }
      }
    } catch (e) { /* skip malformed */ }
  }

  // Open Graph
  const ogTitle = extractTag(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDesc = extractTag(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const ogImage = extractTag(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const hasOG = !!(ogTitle || ogDesc || ogImage);

  // Canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;

  // Meta robots
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i);
  const metaRobots = robotsMatch ? robotsMatch[1] : null;

  // Language
  const langMatch = html.match(/<html[^>]*\slang="([^"]*)"/i);
  const language = langMatch ? langMatch[1] : null;

  // Internal links
  const internalLinks = extractLinks(html, BASE_URL, pathname);

  return {
    url,
    pathname,
    statusCode,
    depth,
    title,
    titleLength,
    description,
    descLength,
    keywords: keywords ? "Yes" : "No",
    h1,
    h1Length,
    h1Count,
    h2First,
    h2Count,
    wordCount,
    schemaCount,
    schemaTypes: schemaTypes.join(", "),
    hasSchema: schemaCount > 0 ? "Yes" : "No",
    hasOG: hasOG ? "Yes" : "No",
    canonical,
    metaRobots,
    language,
    internalLinksCount: internalLinks.length,
    internalLinks,
  };
}

// ─── Crawler ────────────────────────────────────────────────────────────────

async function crawl() {
  console.log(`\n🕷️  Spider Energy Crawl Audit`);
  console.log(`   Base URL: ${BASE_URL}`);
  console.log(`   Max pages: ${MAX_PAGES}`);
  console.log(`   Crawl delay: ${DELAY_MS}ms\n`);

  // Step 1: Fetch and parse robots.txt
  await fetchRobotsTxt();

  const visited = new Set();
  const queue = [{ url: BASE_URL, depth: 0 }]; // start from homepage
  const results = [];
  const errors = [];

  while (queue.length > 0 && visited.size < MAX_PAGES) {
    const { url, depth } = queue.shift();

    // Normalize URL
    let normalizedUrl = url.split("#")[0].split("?")[0];
    if (normalizedUrl !== BASE_URL && normalizedUrl.endsWith("/")) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }

    // Skip if already visited
    if (visited.has(normalizedUrl)) continue;
    visited.add(normalizedUrl);

    const pathname = normalizedUrl.replace(BASE_URL, "") || "/";

    // Check robots.txt
    if (!isAllowedByRobots(pathname)) {
      console.log(`  ⊘ ${pathname} (blocked by robots.txt)`);
      continue;
    }

    // Skip known non-HTML resources
    if (/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|eot|mp4|pdf|zip|xml|json)$/i.test(pathname)) {
      visited.delete(normalizedUrl); // don't count assets
      continue;
    }

    // Fetch page
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(normalizedUrl, {
        headers: {
          "User-Agent": USER_AGENT,
          "Accept": "text/html,application/xhtml+xml",
        },
        redirect: "follow",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const statusCode = res.status;
      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("text/html")) {
        console.log(`  ⊘ ${pathname} (${contentType})`);
        continue;
      }

      const html = await res.text();
      const pageResult = auditPage(html, normalizedUrl, statusCode, depth);
      results.push(pageResult);

      const statusIcon = statusCode === 200 ? "✓" : statusCode >= 300 && statusCode < 400 ? "↳" : "✗";
      console.log(`  ${statusIcon} [${statusCode}] ${pathname} — ${pageResult.titleLength}c title, ${pageResult.h2Count} H2s, ${pageResult.wordCount} words, schema: ${pageResult.hasSchema}`);

      // Extract and queue internal links
      if (statusCode === 200) {
        for (const link of pageResult.internalLinks) {
          if (!visited.has(link)) {
            queue.push({ url: link, depth: depth + 1 });
          }
        }
      }
    } catch (err) {
      const errorMsg = err.name === "AbortError" ? "timeout" : err.message;
      console.log(`  ✗ ${pathname} — ERROR: ${errorMsg}`);
      errors.push({ url: normalizedUrl, error: errorMsg });
      results.push({ url: normalizedUrl, pathname, statusCode: 0, depth, error: errorMsg });
    }

    // Polite delay between requests
    if (queue.length > 0) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  // ─── Report ───────────────────────────────────────────────────────────────

  console.log(`\n${"═".repeat(80)}`);
  console.log(`CRAWL SUMMARY`);
  console.log(`${"═".repeat(80)}`);
  console.log(`Pages crawled: ${results.length}`);
  console.log(`Errors: ${errors.length}`);

  const okPages = results.filter(r => r.statusCode === 200);
  const redirectPages = results.filter(r => r.statusCode >= 300 && r.statusCode < 400);
  const errorPages = results.filter(r => r.statusCode >= 400 || r.statusCode === 0);

  console.log(`  200 OK: ${okPages.length}`);
  console.log(`  3xx Redirects: ${redirectPages.length}`);
  console.log(`  4xx/5xx/Errors: ${errorPages.length}`);

  // Issues summary
  console.log(`\n${"─".repeat(80)}`);
  console.log(`ISSUES FOUND:`);
  console.log(`${"─".repeat(80)}`);

  const issues = [];

  for (const page of okPages) {
    const pageIssues = [];
    if (!page.title) pageIssues.push("❌ Missing title");
    else if (page.titleLength < 50) pageIssues.push(`⚠ Title short (${page.titleLength}c)`);
    else if (page.titleLength > 60) pageIssues.push(`⚠ Title long (${page.titleLength}c)`);

    if (!page.description) pageIssues.push("❌ Missing description");
    else if (page.descLength < 120) pageIssues.push(`⚠ Desc short (${page.descLength}c)`);
    else if (page.descLength > 160) pageIssues.push(`⚠ Desc long (${page.descLength}c)`);

    if (page.keywords === "No") pageIssues.push("⚠ No meta keywords");
    if (!page.h1) pageIssues.push("❌ Missing H1");
    else if (page.h1Count > 1) pageIssues.push(`⚠ Multiple H1s (${page.h1Count})`);
    if (page.h2Count === 0) pageIssues.push("⚠ No H2 tags");
    if (page.wordCount < 100) pageIssues.push(`⚠ Low word count (${page.wordCount})`);
    if (page.hasSchema === "No") pageIssues.push("⚠ No JSON-LD schema");
    if (page.hasOG === "No") pageIssues.push("⚠ No Open Graph tags");
    if (!page.canonical) pageIssues.push("⚠ No canonical URL");

    if (pageIssues.length > 0) {
      issues.push({ pathname: page.pathname, issues: pageIssues });
      console.log(`  ${page.pathname}`);
      for (const issue of pageIssues) {
        console.log(`    ${issue}`);
      }
    }
  }

  if (issues.length === 0) {
    console.log("  ✅ No issues found!");
  }

  // Summary table
  console.log(`\n${"─".repeat(80)}`);
  console.log(`ALL PAGES:`);
  console.log(`${"─".repeat(80)}`);
  console.log(`${"#".padEnd(4)} ${"URL".padEnd(55)} ${"Code".padEnd(5)} ${"Title".padEnd(6)} ${"Desc".padEnd(6)} ${"H1".padEnd(4)} ${"H2s".padEnd(4)} ${"Words".padEnd(6)} ${"Schema".padEnd(7)} ${"OG".padEnd(4)}`);
  console.log(`${"─".repeat(100)}`);

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.statusCode === 200) {
      console.log(
        `${String(i + 1).padEnd(4)} ${r.pathname.padEnd(55)} ${String(r.statusCode).padEnd(5)} ${String(r.titleLength).padEnd(6)} ${String(r.descLength).padEnd(6)} ${String(r.h1Length).padEnd(4)} ${String(r.h2Count).padEnd(4)} ${String(r.wordCount).padEnd(6)} ${r.hasSchema.padEnd(7)} ${r.hasOG.padEnd(4)}`
      );
    } else {
      console.log(
        `${String(i + 1).padEnd(4)} ${r.pathname.padEnd(55)} ${String(r.statusCode || "ERR").padEnd(5)} ${"—".padEnd(6)} ${"—".padEnd(6)} ${"—".padEnd(4)} ${"—".padEnd(4)} ${"—".padEnd(6)} ${"—".padEnd(7)} ${"—".padEnd(4)}`
      );
    }
  }

  // Write detailed JSON report
  const report = {
    meta: {
      baseUrl: BASE_URL,
      crawledAt: new Date().toISOString(),
      totalPages: results.length,
      okPages: okPages.length,
      errors: errorPages.length,
    },
    pages: results.map(r => {
      const { internalLinks, ...rest } = r;
      return { ...rest, internalLinksCount: internalLinks?.length || 0 };
    }),
    issues,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2), "utf-8");
  console.log(`\n📄 Detailed report saved to: ${OUTPUT_FILE}`);
  console.log(`   Open it with: cat ${OUTPUT_FILE} | jq '.pages[] | {url, titleLength, descLength, wordCount, hasSchema}'`);
}

crawl().catch(err => {
  console.error("Crawler error:", err);
  process.exit(1);
});
