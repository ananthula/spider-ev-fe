/**
 * schemas.js
 *
 * Central JSON-LD structured data generators for spiderenergy.in
 * All schemas follow https://schema.org/ and Google's structured data guidelines.
 */

const BASE_URL = "https://spiderenergy.in";

// ─── Organization + WebSite (used on every page) ─────────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Spider Energy",
      legalName: "Spider Energy",
      alternateName: ["SpiderEV", "Spider Vault", "Spider Green Energy Solutions"],
      url: `${BASE_URL}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE_URL}/#logo`,
        url: `${BASE_URL}/spider-ev-logo.png`,
        width: 417,
        height: 188,
        caption: "Spider Energy logo",
      },
      image: { "@id": `${BASE_URL}/#logo` },
      description:
        "Spider Energy manufactures and deploys EV charging infrastructure and battery energy storage across India, with a focus on Telangana and Andhra Pradesh. Its product lines are SpiderEV and SpiderVault.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "T-Hub, Raidurgam",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500081",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9997776080",
          contactType: "sales",
          email: "connect@spiderenergy.in",
          availableLanguage: ["English", "Hindi", "Telugu"],
          areaServed: "IN",
        },
      ],
      email: "connect@spiderenergy.in",
      sameAs: [
        "https://www.instagram.com/spider.ev/",
        "https://in.linkedin.com/company/spider-green-energy-solutions",
      ],
      areaServed: [
        { "@type": "State", name: "Telangana" },
        { "@type": "State", name: "Andhra Pradesh" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Electric Vehicle Charging",
        "EV Chargers",
        "EVSE",
        "EV Infrastructure",
        "AC Chargers",
        "DC Fast Chargers",
        "OCPP charge point management systems",
        "Battery energy storage systems",
      ],
      brand: [
        { "@id": `${BASE_URL}/#brand-spiderev` },
        { "@id": `${BASE_URL}/#brand-spidervault` },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "EV Charging Products & Solutions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "AC EV Chargers (3.3kW - 80kW)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "DC Fast Chargers (3kW - 240kW)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "EV Charging Station Installation (EPC)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Charging Point Management System (CPMS)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "EV Charging Station Franchise",
            },
          },
        ],
      },
    },
    {
      "@type": "Brand",
      "@id": `${BASE_URL}/#brand-spiderev`,
      name: "SpiderEV",
      url: `${BASE_URL}/spiderev`,
      logo: `${BASE_URL}/spider-ev-logo.png`,
      description:
        "SpiderEV is Spider Energy's EV charging product line, covering AC and DC chargers, SpiderConnect CPMS, and the SpiderEV charging app.",
      parentOrganization: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Brand",
      "@id": `${BASE_URL}/#brand-spidervault`,
      name: "SpiderVault",
      url: `${BASE_URL}/spidervault-bess-battery-energy-storage`,
      description:
        "SpiderVault is Spider Energy's battery energy storage line for homes, commercial buildings, industry, and EV charging stations.",
      parentOrganization: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Spider Energy",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": ["LocalBusiness", "Electrician"],
      "@id": `${BASE_URL}/#localbusiness`,
      name: "Spider Energy",
      url: `${BASE_URL}/`,
      image: { "@id": `${BASE_URL}/#logo` },
      telephone: "+91-9997776080",
      email: "connect@spiderenergy.in",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "T-Hub, Raidurgam",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500081",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 17.4435,
        longitude: 78.3772,
      },
      parentOrganization: { "@id": `${BASE_URL}/#organization` },
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      }],
    },
  ],
};

// ─── Product Schema ──────────────────────────────────────────────────────────

/**
 * Generate Product schema from product data.
 * @param {object} product - Product object from productData (ProductDetailPage)
 * @param {string} category - "ac" or "dc"
 * @param {string} productId - slug like "spider-smart"
 */
export function getProductSchema(product, category, productId, image) {
  const typeLabel = category === "ac" ? "AC EV Charger" : "DC Fast EV Charger";
  const categoryLabel =
    category === "ac"
      ? "Electric Vehicle Chargers > AC Chargers"
      : "Electric Vehicle Chargers > DC Fast Chargers";
  const url = `${BASE_URL}/products/${category}/${productId}`;
  const sku = `SE-${category.toUpperCase()}-${productId.replace(/^spider-/, "").toUpperCase()}-${product.power.replace(/[^0-9.]/g, "")}`;

  const additionalProperty = [
    { "@type": "PropertyValue", name: "Power Output", value: product.power },
    {
      "@type": "PropertyValue",
      name: "Connector Type",
      value: product.connector,
    },
    {
      "@type": "PropertyValue",
      name: "Input Voltage",
      value: product.inputVoltage,
    },
    {
      "@type": "PropertyValue",
      name: "Output Current",
      value: product.outputCurrent,
    },
    {
      "@type": "PropertyValue",
      name: "Protection Rating",
      value: product.ipRating,
    },
    {
      "@type": "PropertyValue",
      name: "Certifications",
      value: product.certifications,
    },
    { "@type": "PropertyValue", name: "Protocol", value: product.ocpp },
  ];

  if (product.outputVoltage) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "DC Output Voltage",
      value: product.outputVoltage,
    });
  }

  if (product.chargingSpeed) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Charging Speed",
      value: product.chargingSpeed,
    });
  }

  if (product.cooling) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Cooling",
      value: product.cooling,
    });
  }

  if (product.management) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Management",
      value: product.management,
    });
  }

  if (product.protocol) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Protocol Support",
      value: product.protocol,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${product.name} — ${product.power} ${typeLabel}`,
    description: product.tagline,
    sku,
    mpn: sku,
    brand: { "@id": `${BASE_URL}/#brand-spiderev` },
    manufacturer: { "@id": `${BASE_URL}/#organization` },
    category: categoryLabel,
    url,
    ...(image ? { image: absoluteUrl(image) } : {}),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${BASE_URL}/#organization` },
      areaServed: "IN",
    },
    additionalProperty,
  };
}

function absoluteUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

// ─── FAQ Schema ──────────────────────────────────────────────────────────────

/**
 * Generate FAQPage schema from an array of FAQ items.
 * @param {Array<{question: string, answer: string}>} faqItems
 */
export function getFAQSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Breadcrumb Schema ───────────────────────────────────────────────────────

/**
 * Generate BreadcrumbList schema.
 * @param {Array<{name: string, url?: string}>} items - Ordered breadcrumb items
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: absoluteUrl(item.url) } : {}),
    })),
  };
}

// ─── Service Schema ──────────────────────────────────────────────────────────

/**
 * Generate Service schema for solution pages.
 * @param {object} opts
 * @param {string} opts.name - Service name
 * @param {string} opts.description - Service description
 * @param {string} opts.url - Page URL
 * @param {string} [opts.serviceType] - Type of service
 */
export function getServiceSchema({ name, description, url, serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}${url}`,
    serviceType: serviceType || name,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "State", name: "Telangana" },
      { "@type": "State", name: "Andhra Pradesh" },
    ],
  };
}

// ─── Software Application Schema ─────────────────────────────────────────────

/**
 * Generate SoftwareApplication schema.
 * @param {object} opts
 * @param {string} opts.name
 * @param {string} opts.description
 * @param {string} opts.url
 * @param {string} [opts.applicationCategory]
 * @param {string} [opts.operatingSystem]
 */
export function getSoftwareAppSchema({
  name,
  description,
  url,
  applicationCategory = "UtilitiesApplication",
  operatingSystem = "Android, iOS",
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}${url}#app`,
    name,
    description,
    url: `${BASE_URL}${url}`,
    applicationCategory,
    operatingSystem,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    brand: { "@id": `${BASE_URL}/#brand-spiderev` },
    provider: { "@id": `${BASE_URL}/#organization` },
  };
}

// ─── Local Business Schema ───────────────────────────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Spider Energy",
  url: BASE_URL,
  telephone: "+91-9997776080",
  email: "connect@spiderenergy.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "T-Hub, Raidurgam",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.4435,
    longitude: 78.3772,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "₹₹",
  image: `${BASE_URL}/spider-ev-logo.png`,
  parentOrganization: { "@id": `${BASE_URL}/#organization` },
  sameAs: [
    "https://www.instagram.com/spider.ev/",
    "https://in.linkedin.com/company/spider-green-energy-solutions",
  ],
};

// ─── ItemList Schema (for product listing pages) ─────────────────────────────

// ─── Article / BlogPosting Schema ───────────────────────────────────────────

/**
 * Resolve image to an absolute URL (supports CMS absolute URLs and local paths).
 * @param {string} image
 */
function absoluteImageUrl(image) {
  if (!image) return `${BASE_URL}/og-image.jpg`;
  if (/^https?:\/\//i.test(image)) return image;
  return `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

/**
 * Generate BlogPosting schema for blog detail pages.
 * @param {object} opts
 * @param {string} opts.title - Post headline
 * @param {string} opts.description - Post excerpt/description
 * @param {string} opts.slug - URL slug
 * @param {string} opts.datePublished - ISO date string
 * @param {string} [opts.dateModified] - ISO date string (defaults to datePublished)
 * @param {string} opts.author - Author name
 * @param {string} opts.image - Image path or absolute URL (CMS / local)
 * @param {string} opts.category - Article section/category
 */
export function getArticleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  image,
  category,
  tags = [],
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${slug}#article`,
    headline: title,
    description,
    image: absoluteImageUrl(image),
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: author },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    url: `${BASE_URL}/blog/${slug}`,
    articleSection: category,
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
    inLanguage: "en-IN",
  };
}

/**
 * Generate Blog schema for the blog listing page.
 * @param {Array<{title: string, slug: string, description: string, date: string, image: string}>} posts
 */
export function getBlogSchema(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${BASE_URL}/blog#blog`,
    name: "SpiderEV Blog",
    description:
      "EV charging guides, industry news and business insights for electric vehicle charging in India.",
    url: `${BASE_URL}/blog`,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-IN",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${BASE_URL}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      image: absoluteImageUrl(post.image),
    })),
  };
}

// ─── ItemList Schema (for product listing pages) ─────────────────────────────

/**
 * Generate ItemList schema for product catalog pages.
 * @param {Array<{name: string, url: string, position?: number}>} items
 * @param {string} listName
 */
export function getItemListSchema(items, listName) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${BASE_URL}${item.url}`,
    })),
  };
}

/** Generate a category page whose primary entity is the product ItemList. */
export function getCollectionPageSchema({ name, description, url, items }) {
  const itemList = getItemListSchema(items, name);
  delete itemList["@context"];
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}${url}#collection`,
    name,
    description,
    url: `${BASE_URL}${url}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#brand-spiderev` },
    mainEntity: itemList,
  };
}

/** Generate SpiderVault ProductGroup, Product variants, and installation Service. */
export function getBessProductGroupSchema(products, imageById = {}) {
  const url = `${BASE_URL}/spidervault-bess-battery-energy-storage`;
  const variants = products.map((product) => ({
    "@type": "Product",
    "@id": `${url}#${product.id}`,
    name: product.name,
    sku: `SE-SV-${product.id.replace("spidervault-", "")}`,
    isVariantOf: { "@id": `${url}#productgroup` },
    brand: { "@id": `${BASE_URL}/#brand-spidervault` },
    manufacturer: { "@id": `${BASE_URL}/#organization` },
    category: "Battery Energy Storage Systems",
    description: `${product.name}: ${product.tagline}. ${product.capacity} capacity, designed for ${product.bestFor}.`,
    ...(imageById[product.id] ? { image: absoluteUrl(imageById[product.id]) } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Capacity", value: product.capacity },
      { "@type": "PropertyValue", name: "Rated Power", value: product.ratedPower },
      { "@type": "PropertyValue", name: "Backup Time", value: product.backupTime },
      { "@type": "PropertyValue", name: "Installation", value: product.installStyle },
    ],
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${BASE_URL}/#organization` },
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProductGroup",
        "@id": `${url}#productgroup`,
        name: "SpiderVault Battery Energy Storage Systems",
        brand: { "@id": `${BASE_URL}/#brand-spidervault` },
        manufacturer: { "@id": `${BASE_URL}/#organization` },
        description: "Solar-ready battery energy storage systems for homes, commercial sites, industry, and EV charging stations.",
        productGroupID: "spidervault-bess",
        variesBy: ["https://schema.org/size"],
        hasVariant: variants.map((variant) => ({ "@id": variant["@id"] })),
      },
      ...variants,
      {
        "@type": "Service",
        "@id": `${url}#install-service`,
        name: "SpiderVault BESS Design and Installation",
        serviceType: "Battery Energy Storage System installation",
        provider: { "@id": `${BASE_URL}/#organization` },
        brand: { "@id": `${BASE_URL}/#brand-spidervault` },
        areaServed: [
          { "@type": "State", name: "Telangana" },
          { "@type": "State", name: "Andhra Pradesh" },
        ],
        url,
      },
    ],
  };
}
