# Spider Energy SEO Deployment QA

Use this runbook for the Vercel preview first, then repeat it against production after the release.

## 1. Pre-deployment gates

```bash
npm run generate:og
npm run build
npx eslint src/pages/SpiderEVHubPage.jsx src/components/SEO.jsx src/seo/schemas.js scripts/prerender.mjs scripts/generate-sitemap.mjs scripts/generate-og-assets.mjs scripts/seo-deployment-qa.mjs
```

Confirm that:

- `dist/sitemap.xml` includes `/spiderev` and the canonical SpiderVault page.
- All 20 files in `public/og/products/` are 1200×630 JPEGs.
- No generated product OG image contains placeholder or invented product photography.
- Prices, ratings, certificate identifiers, and backup claims have not been added without approval.

The repository-wide `npm run lint` currently has unrelated baseline failures. Do not treat those as introduced by this SEO change; use the targeted lint command above until the existing lint backlog is resolved.

## 2. Automated preview validation

After Vercel provides the preview URL, run:

```bash
npm run qa:seo:deploy -- --url https://YOUR-PREVIEW.vercel.app
```

The command validates:

- every sitemap URL returns a successful prerendered page;
- titles, descriptions, H1s, canonicals, Open Graph metadata, and JSON-LD exist;
- all 13 charger Product nodes contain SKU, MPN, Brand references, Offers, and real product images;
- the SpiderVault ProductGroup exposes seven model variants;
- all 20 OG assets return as 1200×630 JPEGs;
- `/spider-ev`, `/spider-vault`, and `/spidervault` return 301 redirects to canonical destinations;
- CSP and immutable hashed-asset caching headers are active;
- `robots.txt`, `llms.txt`, and `sitemap.xml` are reachable.

Canonical checks intentionally expect `https://spiderenergy.in`, even on a preview deployment. Override only when testing another canonical origin:

```bash
npm run qa:seo:deploy -- --url https://preview.example.com --canonical-origin https://example.com
```

## 3. Manual structured-data checks

Test these representative URLs in Google Rich Results Test and Schema.org Validator:

- `/`
- `/spiderev`
- `/electric-vehicle-ev-ac-charger`
- `/products/ac/spider-mini`
- `/products/dc/spider-hulk`
- `/spidervault-bess-battery-energy-storage`
- `/cpms-ev-charging-point-management-system`
- `/ev-charging-station-app`

Expected results:

- exactly one Spider Energy Organization node with `#organization`;
- SpiderEV and SpiderVault Brand nodes resolve through stable `@id` references;
- Product, BreadcrumbList, CollectionPage/ItemList, FAQPage, SoftwareApplication, MobileApplication, HowTo, and ProductGroup nodes parse without critical errors;
- Product price warnings are expected until approved INR list prices are supplied;
- no aggregate ratings appear unless supported by published review data.

## 4. Redirect and canonical checks

```bash
curl -I https://spiderenergy.in/spider-ev
curl -I https://spiderenergy.in/spider-vault
curl -I https://spiderenergy.in/spidervault
```

Each alias must return one 301 hop to a URL that returns 200. Confirm that `/spiderev` is self-canonical and the long SpiderVault URL remains self-canonical.

## 5. Social sharing validation

Refresh these URLs in Facebook Sharing Debugger and LinkedIn Post Inspector:

- one AC SKU;
- one generic-image DC SKU;
- Spider Spark, Ultra, and Surge;
- the SpiderVault BESS page.

Verify that each card is uncropped, displays the exact product name and power/capacity, and does not fall back to `/og-image.jpg`.

## 6. Search Console rollout

After production deployment:

1. Submit the updated sitemap.
2. Inspect and request indexing for `/spiderev`.
3. Inspect one AC product, one DC product, and the SpiderVault page.
4. Confirm Google-selected canonical matches the declared canonical.
5. Monitor Enhancement reports for Product and Breadcrumb errors for seven days.

## 7. Performance and security checks

Run PageSpeed Insights on the homepage, SpiderEV hub, Spider Mini, Spider Hulk, and SpiderVault pages. Record LCP, INP, and CLS for mobile and desktop.

Verify with the browser network panel that:

- hashed `/assets/*` files use `max-age=31536000, immutable`;
- HTML is not cached immutably;
- no CSP violations block analytics, fonts, maps, product images, or application bundles;
- the homepage LCP image loads eagerly with high fetch priority.

## 8. Release acceptance

Release is approved when automated QA reports zero errors, manual validators show no critical structured-data errors, redirects use one permanent hop, social cards render correctly, and Search Console can inspect the new hub.

Approved INR prices remain a separate business dependency. Add them to Product Offers only after the commercial owner confirms price and validity dates.
