/**
 * Post-deployment SEO QA for a Vercel preview or production deployment.
 *
 * Usage:
 *   node scripts/seo-deployment-qa.mjs --url https://preview.example.vercel.app
 *   node scripts/seo-deployment-qa.mjs --url https://spiderenergy.in
 */

const args = process.argv.slice(2);
const valueFor = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

if (args.includes("--help")) {
  console.log("Usage: node scripts/seo-deployment-qa.mjs --url <deployment-url> [--canonical-origin https://spiderenergy.in]");
  process.exit(0);
}

const BASE_URL = valueFor("--url", "https://spiderenergy.in").replace(/\/$/, "");
const CANONICAL_ORIGIN = valueFor("--canonical-origin", "https://spiderenergy.in").replace(/\/$/, "");
const errors = [];
const warnings = [];
const passes = [];

const productRoutes = [
  ...["spider-mini", "spider-lite", "spider-smart", "spider-blaze", "spider-strike", "spider-dash"].map((id) => `/products/ac/${id}`),
  ...["spider-base", "spider-fast", "spider-spark", "spider-falcon", "spider-ultra", "spider-surge", "spider-hulk"].map((id) => `/products/dc/${id}`),
];
const vaultIds = ["spidervault-3", "spidervault-5", "spidervault-12", "spidervault-20", "spidervault-30", "spidervault-60", "spidervault-120"];
const redirectExpectations = {
  "/spider-ev": "/spiderev",
  "/spider-vault": "/spidervault-bess-battery-energy-storage",
  "/spidervault": "/spidervault-bess-battery-energy-storage",
};

function pass(message) {
  passes.push(message);
  console.log(`  ✓ ${message}`);
}

function fail(message) {
  errors.push(message);
  console.error(`  ✗ ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.warn(`  ⚠ ${message}`);
}

async function request(path, options = {}) {
  return fetch(`${BASE_URL}${path}`, {
    headers: { "User-Agent": "SpiderEnergyDeploymentQA/1.0" },
    ...options,
  });
}

function extract(html, expression) {
  return html.match(expression)?.[1]?.trim() || null;
}

function jsonLd(html) {
  const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  return blocks.map((match) => JSON.parse(match[1]));
}

function canonicalFor(path) {
  return path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
}

function jpegSize(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (sofMarkers.has(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    if (marker === 0xd9 || marker === 0xda) break;
    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2) break;
    offset += 2 + length;
  }
  return null;
}

async function checkDiscoveryFiles() {
  const [robots, llms, sitemap] = await Promise.all([
    request("/robots.txt"),
    request("/llms.txt"),
    request("/sitemap.xml"),
  ]);
  if (!robots.ok) fail(`robots.txt returned ${robots.status}`);
  else {
    const robotsText = await robots.text();
    if (!robotsText.includes("Sitemap:")) fail("robots.txt does not declare the sitemap");
    else if (!robotsText.includes("https://spiderenergy.in/llms.txt")) fail("robots.txt does not advertise llms.txt");
    else pass("robots.txt declares the sitemap and llms.txt");
  }

  if (!llms.ok) fail(`llms.txt returned ${llms.status}`);
  else if (!/SpiderEV[\s\S]+SpiderVault/.test(await llms.text())) fail("llms.txt is missing the brand hierarchy");
  else pass("llms.txt exposes SpiderEV and SpiderVault");

  if (!sitemap.ok) {
    fail(`sitemap.xml returned ${sitemap.status}`);
    return [];
  }
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  if (!urls.includes("/spiderev")) fail("sitemap.xml is missing /spiderev");
  else pass(`sitemap.xml exposes ${urls.length} canonical URLs`);
  return urls;
}

async function checkPage(path) {
  const response = await request(path);
  if (!response.ok) {
    fail(`${path} returned ${response.status}`);
    return;
  }
  const html = await response.text();
  const title = extract(html, /<title>([^<]+)<\/title>/i);
  const description = extract(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = extract(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const ogImage = extract(html, /<meta\s+property="og:image"\s+content="([^"]+)"/i);
  const h1 = extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let schemas = [];
  try {
    schemas = jsonLd(html);
  } catch (error) {
    fail(`${path} contains invalid JSON-LD: ${error.message}`);
  }
  if (!title) fail(`${path} is missing a title`);
  if (!description) fail(`${path} is missing a meta description`);
  if (!h1) fail(`${path} is missing an H1 in prerendered content`);
  if (canonical !== canonicalFor(path)) fail(`${path} canonical is ${canonical || "missing"}`);
  if (!ogImage) fail(`${path} is missing og:image`);
  if (schemas.length === 0) fail(`${path} is missing JSON-LD`);
}

async function checkStructuredData() {
  const ogImages = new Set();
  for (const path of productRoutes) {
    const response = await request(path);
    if (!response.ok) {
      fail(`${path} returned ${response.status} during structured-data validation`);
      continue;
    }
    const html = await response.text();
    let schemas = [];
    try {
      schemas = jsonLd(html);
    } catch (error) {
      fail(`${path} contains invalid JSON-LD: ${error.message}`);
      continue;
    }
    const product = schemas.find((schema) => schema["@type"] === "Product");
    if (!product) {
      fail(`${path} is missing Product schema`);
      continue;
    }
    if (!product.sku || !product.mpn) fail(`${path} is missing sku/mpn`);
    if (product.brand?.["@id"] !== `${CANONICAL_ORIGIN}/#brand-spiderev`) fail(`${path} does not reference the SpiderEV Brand @id`);
    if (!product.offers || product.offers.priceCurrency !== "INR") fail(`${path} is missing an INR Offer`);
    if (!product.offers.price) warn(`${path} has no approved public price; Product rich-result eligibility remains limited`);
    const ogImage = extract(html, /<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (ogImage) ogImages.add(ogImage);
  }
  if (ogImages.size !== productRoutes.length) fail(`Expected ${productRoutes.length} unique charger OG images; found ${ogImages.size}`);
  else pass("all 13 charger routes have unique OG images and linked Product schemas");

  const response = await request("/spidervault-bess-battery-energy-storage");
  if (!response.ok) {
    fail(`/spidervault-bess-battery-energy-storage returned ${response.status} during structured-data validation`);
    return;
  }
  let schemas = [];
  try {
    schemas = jsonLd(await response.text());
  } catch (error) {
    fail(`/spidervault-bess-battery-energy-storage contains invalid JSON-LD: ${error.message}`);
    return;
  }
  const groupGraph = schemas.find((schema) => schema["@graph"]?.some((node) => node["@type"] === "ProductGroup"))?.["@graph"] || [];
  const variants = groupGraph.filter((node) => node["@type"] === "Product");
  if (variants.length !== 7) fail(`Expected 7 SpiderVault variants; found ${variants.length}`);
  else pass("SpiderVault ProductGroup exposes all 7 current variants");
}

async function checkOgAssets() {
  const ids = [...productRoutes.map((path) => path.split("/").pop()), ...vaultIds];
  let validAssets = 0;
  for (const id of ids) {
    const response = await request(`/og/products/${id}.jpg`);
    if (!response.ok) {
      fail(`/og/products/${id}.jpg returned ${response.status}`);
      continue;
    }
    if (!response.headers.get("content-type")?.includes("image/jpeg")) {
      fail(`/og/products/${id}.jpg has an unexpected content type`);
      continue;
    }
    const size = jpegSize(Buffer.from(await response.arrayBuffer()));
    if (!size || size.width !== 1200 || size.height !== 630) {
      fail(`/og/products/${id}.jpg is not 1200x630`);
      continue;
    }
    validAssets += 1;
  }
  if (validAssets === ids.length) pass("20 product/model OG assets are reachable at 1200x630");
}

async function checkRedirectsAndHeaders() {
  for (const [source, destination] of Object.entries(redirectExpectations)) {
    const response = await request(source, { redirect: "manual" });
    const location = response.headers.get("location");
    const resolved = location ? new URL(location, BASE_URL).pathname : null;
    if (response.status !== 301 || resolved !== destination) fail(`${source} expected 301 to ${destination}; received ${response.status} to ${resolved || "nowhere"}`);
    else pass(`${source} redirects permanently to ${destination}`);
  }

  const home = await request("/");
  const csp = home.headers.get("content-security-policy");
  if (!csp || !csp.includes("default-src 'self'")) fail("Content-Security-Policy header is missing or incomplete");
  else pass("Content-Security-Policy is active");
  const html = await home.text();
  if (!/<link\s+rel="preload"\s+as="image"[^>]+fetchpriority="high"/i.test(html)) fail("Homepage is missing a high-priority LCP image preload");
  else pass("homepage preloads its LCP image at high priority");
  const asset = extract(html, /(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/i);
  if (!asset) fail("Could not discover a hashed build asset for cache validation");
  else {
    const response = await request(asset);
    const cache = response.headers.get("cache-control") || "";
    if (!/max-age=31536000/.test(cache) || !/immutable/.test(cache)) fail(`${asset} is missing immutable one-year caching`);
    else pass("hashed assets use immutable one-year caching");
  }
}

console.log(`\nSpider Energy deployment SEO QA\nTarget: ${BASE_URL}\nCanonical origin: ${CANONICAL_ORIGIN}\n`);

try {
  const sitemapPaths = await checkDiscoveryFiles();
  for (const path of sitemapPaths) await checkPage(path);
  if (sitemapPaths.length > 0) pass(`all ${sitemapPaths.length} sitemap pages returned complete prerendered SEO metadata`);
  await checkStructuredData();
  await checkOgAssets();
  await checkRedirectsAndHeaders();
} catch (error) {
  fail(`QA runner stopped unexpectedly: ${error.stack || error.message}`);
}

console.log(`\nSummary: ${passes.length} passed, ${warnings.length} warnings, ${errors.length} errors`);
if (warnings.length) console.log("Warnings are non-blocking but require business input before Product rich-result eligibility is complete.");
if (errors.length) process.exit(1);
