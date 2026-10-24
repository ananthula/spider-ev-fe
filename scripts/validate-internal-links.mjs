/**
 * Validates same-origin page links in the prerendered site.
 *
 * Runtime-only XML endpoints are explicitly allowlisted because they are
 * served by Vercel rather than generated as HTML in dist/.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const DIST_DIR = join(ROOT, "dist");
const BASE_URL = "https://spiderenergy.in";
const RUNTIME_ONLY_PATHS = new Set(["/news-sitemap.xml"]);
const NON_PAGE_EXTENSIONS = /\.(?:css|csv|eot|gif|ico|jpeg|jpg|js|json|map|mp3|mp4|pdf|png|svg|txt|webm|webp|woff2?|xml)$/i;
const HREF_PATTERN = /\bhref\s*=\s*(?:"([^"]+)"|'([^']+)')/gi;

function collectHtmlFiles(directory) {
  const files = [];

  for (const name of readdirSync(directory)) {
    const fullPath = join(directory, name);
    if (statSync(fullPath).isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
    } else if (name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function getPagePath(href) {
  if (
    !href ||
    href.startsWith("#") ||
    (href.startsWith("/") === false && !/^https?:\/\//i.test(href))
  ) {
    return null;
  }

  let url;
  try {
    url = new URL(href, BASE_URL);
  } catch {
    return null;
  }

  if (url.origin !== BASE_URL) return null;

  const pathname = decodeURIComponent(url.pathname);
  if (RUNTIME_ONLY_PATHS.has(pathname) || NON_PAGE_EXTENSIONS.test(pathname)) {
    return null;
  }

  return pathname === "" ? "/" : pathname.replace(/\/+$/, "") || "/";
}

function routeExists(pathname) {
  if (pathname === "/") return existsSync(join(DIST_DIR, "index.html"));

  const relativePath = pathname.replace(/^\/+/, "");
  return [
    join(DIST_DIR, relativePath),
    join(DIST_DIR, relativePath, "index.html"),
    join(DIST_DIR, relativePath + ".html"),
  ].some(existsSync);
}

if (!existsSync(DIST_DIR)) {
  console.error("Internal-link validation failed: dist/ does not exist.");
  process.exit(1);
}

const missing = new Map();
const checked = new Set();

for (const file of collectHtmlFiles(DIST_DIR)) {
  const html = readFileSync(file, "utf-8");
  for (const match of html.matchAll(HREF_PATTERN)) {
    const pagePath = getPagePath(match[1] || match[2]);
    if (!pagePath || checked.has(pagePath)) continue;

    checked.add(pagePath);
    if (!routeExists(pagePath)) {
      missing.set(pagePath, relative(ROOT, file));
    }
  }
}

if (missing.size > 0) {
  console.error(
    "Internal-link validation failed: " + missing.size + " missing page route(s)."
  );
  for (const [pagePath, sourceFile] of missing) {
    console.error("  " + sourceFile + " -> " + pagePath);
  }
  process.exit(1);
}

console.log("Checked " + checked.size + " same-origin page link target(s).");
console.log("All internal page links resolve to generated routes.");
