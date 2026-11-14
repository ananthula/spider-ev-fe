import process from "node:process";

const BASE_URL = "https://spiderenergy.in";
const DEFAULT_WORDPRESS_API_URL =
  "https://public-api.wordpress.com/wp/v2/sites/spiderenergy1.wordpress.com";
const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;
const BLOG_CATEGORY_SLUG = (process.env.WORDPRESS_BLOG_CATEGORY_SLUG || "")
  .trim()
  .toLowerCase();
const DISALLOWED_STORAGE_TERMS =
  /\b(?:bess|battery energy storage|energy storage system|battery storage|spidervault|spider vault|grid storage)\b/i;

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, "");
}

function decodeHtmlEntities(value = "") {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function escapeXml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getTitle(post) {
  const renderedTitle = typeof post?.title === "object" ? post.title.rendered : post?.title;
  return decodeHtmlEntities(stripHtml(String(renderedTitle || ""))).trim();
}

function isDisallowedStoragePost(post) {
  return DISALLOWED_STORAGE_TERMS.test(getTitle(post) + " " + (post?.slug || ""));
}

function hasAllowedBlogCategory(post) {
  if (!BLOG_CATEGORY_SLUG) return true;
  return (post?._embedded?.["wp:term"] || [])
    .flat()
    .some(
      (term) =>
        term.taxonomy === "category" &&
        String(term.slug || "").toLowerCase() === BLOG_CATEGORY_SLUG,
    );
}

function parseDate(value, treatAsUtc = false) {
  if (!value) return null;
  const stringValue = String(value);
  const normalized =
    treatAsUtc && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(stringValue)
      ? `${stringValue}Z`
      : stringValue;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getPublicationDate(post) {
  return parseDate(post?.date_gmt, true) || parseDate(post?.date);
}

export function getRecentNewsPosts(posts = [], now = new Date()) {
  const cutoff = now.getTime() - NEWS_WINDOW_MS;

  return posts
    .map((post) => ({ post, publicationDate: getPublicationDate(post) }))
    .filter(({ post, publicationDate }) => {
      return Boolean(
        post?.slug &&
        getTitle(post) &&
        !isDisallowedStoragePost(post) &&
        hasAllowedBlogCategory(post) &&
        publicationDate &&
        publicationDate.getTime() >= cutoff &&
        publicationDate.getTime() <= now.getTime(),
      );
    })
    .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());
}

export function buildNewsSitemap(posts, now = new Date()) {
  const newsPosts = getRecentNewsPosts(posts, now);
  const entries = newsPosts.map(({ post, publicationDate }) => {
    const title = escapeXml(getTitle(post));
    const slug = encodeURIComponent(String(post.slug).trim());

    return `  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <news:news>
      <news:publication>
        <news:name>SpiderEnergy</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publicationDate.toISOString()}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries.length ? `\n${entries.join("\n")}` : ""}
</urlset>`;
}

async function fetchRecentBlogs(now = new Date()) {
  const apiUrl = (process.env.WORDPRESS_API_URL || DEFAULT_WORDPRESS_API_URL).replace(/\/$/, "");
  const url = new URL(`${apiUrl}/posts`);
  url.searchParams.set("status", "publish");
  url.searchParams.set("after", new Date(now.getTime() - NEWS_WINDOW_MS).toISOString());
  url.searchParams.set("orderby", "date");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", "100");
  url.searchParams.set("_embed", "1");
  url.searchParams.set("_fields", "slug,title,date,date_gmt,_embedded");

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`WordPress API returned HTTP ${response.status}`);
  }

  const posts = await response.json();
  if (!Array.isArray(posts)) {
    throw new Error("WordPress API returned an unexpected response");
  }

  return posts;
}

export default async function handler(_request, response) {
  try {
    const now = new Date();
    const posts = await fetchRecentBlogs(now);

    response
      .status(200)
      .setHeader("Content-Type", "application/xml; charset=utf-8")
      .setHeader("Cache-Control", "no-store")
      .send(buildNewsSitemap(posts, now));
  } catch (error) {
    console.error("Error generating News Sitemap:", error);
    response
      .status(500)
      .setHeader("Content-Type", "application/xml; charset=utf-8")
      .setHeader("Cache-Control", "no-store")
      .send(
        '<?xml version="1.0" encoding="UTF-8"?><error>Unable to generate news sitemap</error>',
      );
  }
}
