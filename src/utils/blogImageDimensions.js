const DEFAULT_BLOG_IMAGE_DIMENSIONS = { width: 1672, height: 941 };

const dimensionOverrides = {
  "ev-ready-homes-india-smart-charging-bess-2026.webp": { width: 1600, height: 500 },
  "solar-storage-explained-homeowners.webp": { width: 1080, height: 1080 },
  "best-ev-charging-franchise-opportunities-hyderabad.webp": { width: 1280, height: 719 },
  "ev-ready-homes-india-whole-energy-decision-2026.webp": { width: 801, height: 801 },
  "india-ev-charging-infrastructure-2026.jpg": { width: 800, height: 800 },
  "bess-vs-generator-india-homes-businesses.webp": { width: 800, height: 800 },
  "property-owners-prepare-ev-adoption-india.webp": { width: 800, height: 800 },
  "complete-guide-battery-energy-storage-systems-bess-homes.webp": { width: 1080, height: 1080 },
  "premium-homes-beyond-traditional-backup-systems.webp": { width: 1280, height: 719 },
  "time-based-electricity-pricing-ev-owners-india.webp": { width: 1080, height: 1080 },
  "whole-home-backup-premium-homes-india-2026.webp": { width: 1280, height: 720 },
};

export const getBlogImageDimensions = (imagePath = "") => {
  const fileName = imagePath.split("?")[0].split("/").pop();
  return dimensionOverrides[fileName] ?? DEFAULT_BLOG_IMAGE_DIMENSIONS;
};
