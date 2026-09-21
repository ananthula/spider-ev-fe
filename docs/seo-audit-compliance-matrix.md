# Spider Energy SEO Audit Compliance Matrix

Source: Developer Implementation Report - Spider Energy, dated 20 September 2026

Production target: https://spiderenergy.in/

Verification date: 21 September 2026

Release commit baseline: `9f00c92`

## Status definitions

| Status | Meaning |
| --- | --- |
| Pass | Implemented and verified on production or in the release build. |
| Partial | The main implementation exists, but part of the acceptance criterion or external measurement is incomplete. |
| Blocked | Completion requires approved business data, third-party access, or an external system response. |

## Executive verification summary

| Check | Result | Evidence |
| --- | --- | --- |
| Production crawl | Pass | 107 sitemap URLs crawled; 107 returned 200; no crawler issues. |
| Deployment SEO QA | Partial | 12 automated groups passed, 0 errors, 13 price warnings. |
| Structured data | Partial | Sitewide entity graph, 25 breadcrumb routes, 13 charger Products, seven SpiderVault variants, AC/DC collections, CPMS and app schemas validated; Product prices remain unavailable. |
| Social assets | Pass | 20 product/model OG JPEGs return 200 at 1200x630; all 13 charger routes use unique absolute OG URLs. |
| Product rich-result readiness | Blocked | Product Offers do not contain approved public INR prices. |
| Current Core Web Vitals field data | Blocked | PageSpeed API quota was unavailable during verification; Search Console/CrUX access is required. |

## P0 backlog

| Audit requirement | Status | Production/repository evidence | Remaining action |
| --- | --- | --- | --- |
| Create Brand nodes and link Products | Pass | Homepage graph contains `#organization`, `#brand-spiderev`, and `#brand-spidervault`; all charger Products reference the SpiderEV Brand and Organization manufacturer IDs. | None. |
| Resolve `/spiderev`, `/spider-ev`, `/spidervault`, and `/spider-vault` | Pass | `/spiderev` returns 200. The three aliases return 301 to a 200 canonical destination. Navigation links to SpiderEV and SpiderVault. | None. The approved long-URL canonical strategy is in use for SpiderVault. |
| Add Offers to every charger and SpiderVault Product | Partial | All 13 charger and seven SpiderVault Products have INR Offer, seller, and availability fields. | Add approved `price` and `priceValidUntil` values. |
| Replace logo Product images with product photography | Partial | Every Product image returns 200 as WebP and none uses the logo. Spider Spark, Ultra, Surge and smaller SpiderVault models have dedicated assets. | Obtain dedicated photography for the six AC SKUs, generic-image DC SKUs, and SpiderVault 30/60/120. |
| Unify LocalBusiness, price range, and NAP | Pass | Homepage and locator use `https://spiderenergy.in/#localbusiness`; `priceRange` is `₹₹`; schema, contact page, and footer expose T-Hub address, phone, and email. | Keep Google Business Profile aligned when its URL is approved. |

## P1 backlog

| Audit requirement | Status | Production/repository evidence | Remaining action |
| --- | --- | --- | --- |
| BreadcrumbList on money pages | Pass | 25 product, hub, service, franchise, application, and vault routes have valid absolute breadcrumb positions. | None. |
| SpiderVault ProductGroup and model Products | Pass | Canonical BESS page contains one ProductGroup, seven Product variants, Service nodes, FAQ, SKUs, brand/manufacturer links, images, and INR Offers. | Add approved prices when supplied. |
| CollectionPage and ItemList on AC/DC hubs | Pass | AC collection contains six product URLs; DC collection contains seven. | None. |
| Remove duplicate Organization from About | Pass | `/about-us` source contains one Organization node with `#organization`. | None. |
| Per-product 1200x630 OG images | Pass | All 13 charger routes have unique OG URLs; all 20 charger/model files return 1200x630 JPEGs. | Refresh Facebook and LinkedIn caches after each future card change. |
| Title and H1 brand rules | Pass | Homepage title leads with Spider Energy; company pages use Spider Energy; charger/app pages use SpiderEV; BESS uses SpiderVault; homepage H1 no longer uses an unsupported superlative. | Monitor search results until old cached titles/snippets are replaced. |
| Gallery and Spider Hulk descriptions | Pass | Gallery description is 144 characters; Spider Hulk description is 139 characters; both are unique and brand/location relevant. | None. |

## P2 backlog

| Audit requirement | Status | Production/repository evidence | Remaining action |
| --- | --- | --- | --- |
| SearchAction only with a working search endpoint | Pass | WebSite schema omits SearchAction because no verified search endpoint exists. | Add only after a real search route ships. |
| SKU and MPN identifiers | Pass | Every charger Product has an `SE-AC-*` or `SE-DC-*` SKU/MPN; every SpiderVault Product has an `SE-SV-*` SKU. | Add GTIN only if verified identifiers become available. |
| CSP and immutable caching | Pass | Production sends CSP with GTM/analytics allowances; hashed assets use `public, max-age=31536000, immutable`; HSTS includes subdomains and preload. | Recheck after analytics or third-party integrations change. |
| Optional `llms.txt` | Pass | `/llms.txt` returns 200, describes both brands and key routes, is advertised in `robots.txt`, and is linked from the footer. | Keep product claims and route inventory current. |

## Page-by-page schema matrix

| Page group | Status | Verified schema/evidence | Remaining action |
| --- | --- | --- | --- |
| Homepage | Pass | Organization, both Brands, WebSite, unified LocalBusiness; corrected NAP and title. | None. |
| SpiderEV hub | Pass | Brand, CollectionPage/ItemList, FAQ and Breadcrumb; route returns 200 and is in sitemap at priority 0.9. | Request indexing in Search Console. |
| SpiderVault aliases and canonical page | Pass | Short aliases redirect permanently; canonical page contains Brand, ProductGroup, seven Products, Services, FAQ and Breadcrumb. | Request indexing/recrawl. |
| AC and DC hubs | Pass | CollectionPage, ItemList, Breadcrumb and Brand relationships; expected 6/7 product counts. | None. |
| AC products (6) | Partial | Product, FAQ, Breadcrumb, SKU/MPN, Brand/manufacturer, INR Offer and unique OG image. | Prices and dedicated per-SKU photography remain. |
| DC products (7) | Partial | Same schema coverage as AC; Hulk metadata corrected. | Prices and dedicated photography for generic-image models remain. |
| SpiderConnect CPMS | Pass | SoftwareApplication, SpiderEV Brand, Organization provider, INR Offer, FAQ and Breadcrumb. | None. |
| SpiderEV app | Pass | MobileApplication, Brand/provider, free INR Offer, HowTo and Breadcrumb. | None. |
| About | Pass | One sitewide Organization graph and Brand definitions; no duplicate Organization. | None. |
| Contact and locator | Pass | Canonical NAP present; locator resolves to the shared LocalBusiness ID. | None. |
| Franchise and solution services | Pass | Service/FAQ schemas retained and Breadcrumb added. | None. |
| Gallery | Pass | Description corrected; metadata, canonical and OG present. | ImageGallery remains optional. |
| Blog and posts | Pass | Blog/BlogPosting and Breadcrumb retained; all 71 current posts contain internal commercial/product links. | Continue internal-link QA for new posts. |
| Har Ghar, partner, and ROI | Pass | Breadcrumbs retained; ROI application schema preserved. | None. |

## Technical implementation

| Audit requirement | Status | Evidence | Remaining action |
| --- | --- | --- | --- |
| Self-referencing absolute canonicals | Pass | All 107 sitemap pages passed canonical validation; tracking-query test canonicalized to the clean URL. | None. |
| HTTP/www normalization and HSTS | Pass | HTTP and www redirect to the HTTPS apex; final responses send `max-age=63072000; includeSubDomains; preload`. | None. |
| Unique social metadata | Pass | Product `og:url` matches canonical; Twitter uses `summary_large_image`; product OG images are unique. | Validate platform cache presentation after deployment. |
| Factual alt text | Pass | Charger product/card alt text follows model, power, charger type and SpiderEV pattern. | Maintain the pattern for new assets. |
| Lazy-load below-fold images | Pass | Product grids, footer, BESS selector and supporting imagery use lazy loading and async decoding. | Recheck new components during review. |
| Eager/high-priority LCP images | Pass | Homepage first hero and charger product hero load eagerly at high priority; prerendered homepage/product heads include high-priority image preloads. | Confirm impact with field CWV after deployment. |
| Reserve image/video space | Partial | Intrinsic dimensions are present on homepage hero, navigation/footer logo, charger cards/heroes, product hero, BESS selector and BESS hero video. | Continue adding dimensions to remaining legacy supporting images when those components are touched. |
| Route code splitting | Pass | Production build emits route-specific chunks for products, BESS, apps, services and blog pages. | Monitor bundle growth. |
| Defer analytics | Pass | Analytics loads after the browser `load` event. | Reassess if tag manager configuration grows. |
| Prerender sitemap parity | Pass | 107/107 sitemap pages expose non-empty H1/body content, critical links and schema without requiring JavaScript. | Keep deployment crawl as a release gate. |
| Core Web Vitals thresholds | Blocked | Implementation levers are present, but current mobile/desktop LCP, INP and CLS were not available from PageSpeed during verification. | Run PageSpeed/CrUX and Search Console CWV after the deployment cache settles. |

## External QA and business dependencies

| Dependency | Status | Owner/action |
| --- | --- | --- |
| Approved public INR prices and validity dates | Blocked | Commercial owner must supply values before Product rich-result eligibility can be complete. |
| Review counts and ratings | Pass | No aggregateRating is published. Add only verified review data. |
| Certificate numbers and claims | Pass | No unverified certificate identifiers were invented. Compliance owner must approve additions. |
| Google Business Profile URL | Blocked | Add to `sameAs` only after the canonical GBP URL is confirmed. |
| Google Rich Results Test | Partial | Local/live JSON-LD parses and required relationships exist; Product price warnings remain. Run representative URLs in Google's UI after prices are added. |
| Search Console indexing and selected canonical | Blocked | Requires authenticated Search Console URL Inspection for hub and representative product URLs. |
| Facebook/LinkedIn card cache | Partial | Direct metadata and image files pass; authenticated debugger cache refresh is still external. |
| PageSpeed/CrUX field metrics | Blocked | Requires a successful PageSpeed or Search Console/CrUX run after deployment. |

## Release acceptance

The technical release is acceptable for crawling, entity resolution, canonicalization, navigation, structured-data parsing, social metadata, security headers and cache policy. Full commercial SEO signoff remains blocked by approved Product prices. Full performance signoff remains blocked until field Core Web Vitals are measured after deployment.
