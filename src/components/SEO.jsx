/**
 * SEO.jsx
 *
 * Reusable component that injects JSON-LD structured data, Open Graph image,
 * and Twitter Card meta tags via react-helmet-async.
 * Use alongside the existing <Helmet> title/description already on each page.
 *
 * Props:
 *   - schema: JSON-LD object for structured data
 *   - breadcrumbs: BreadcrumbList JSON-LD object
 *   - ogImage: Custom OG image path or absolute URL (defaults to logo-based og-image.jpg)
 *              For blog/news posts, pass the post's featured image URL.
 */
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://spiderenergy.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

function absoluteImageUrl(image) {
  if (!image) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(image)) return image;
  return `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export function SEO({
  schema,
  schemas,
  breadcrumbs,
  ogImage,
  title,
  description,
  canonicalPath,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  ogType = "website",
}) {
  const location = useLocation();
  const image = absoluteImageUrl(ogImage);
  const path = canonicalPath ?? location.pathname;
  const canonicalUrl = path === "/"
    ? `${BASE_URL}/`
    : `${BASE_URL}${path.replace(/\/$/, "")}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robots} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Spider Energy" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={canonicalUrl} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}

      {/* Open Graph image (overrides prerender default when a custom image is passed) */}
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}

      {/* Primary JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Additional JSON-LD schemas (e.g. FAQPage alongside Service) */}
      {schemas && schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}

      {/* Breadcrumb JSON-LD (separate script block per Google guidelines) */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbs)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
