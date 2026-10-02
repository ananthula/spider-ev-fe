const DEFAULT_BLOG_IMAGE_DIMENSIONS = { width: 1672, height: 941 };

const dimensionOverrides = {
  "best-ev-charging-franchise-opportunities-hyderabad.webp": { width: 1280, height: 719 },
  "india-ev-charging-infrastructure-2026.jpg": { width: 800, height: 800 },
};

export const getBlogImageDimensions = (imagePath = "") => {
  const fileName = imagePath.split("?")[0].split("/").pop();
  return dimensionOverrides[fileName] ?? DEFAULT_BLOG_IMAGE_DIMENSIONS;
};
