import fs from "node:fs";
import path from "node:path";

const sourceRoot = path.resolve("src");
const requiredAttributes = ["width", "height", "loading", "decoding"];
const sourceExtensions = new Set([".jsx", ".tsx"]);

const sourceFiles = [];
const visit = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(entryPath);
    else if (sourceExtensions.has(path.extname(entry.name))) sourceFiles.push(entryPath);
  }
};

visit(sourceRoot);

const failures = [];
let imageCount = 0;

for (const filePath of sourceFiles) {
  const source = fs.readFileSync(filePath, "utf8");
  const imagePattern = /<img\b[\s\S]*?\/>/g;
  for (const match of source.matchAll(imagePattern)) {
    imageCount += 1;
    const missing = requiredAttributes.filter(
      (attribute) => !new RegExp(`\\b${attribute}\\s*=`).test(match[0]),
    );
    if (missing.length === 0) continue;

    const line = source.slice(0, match.index).split("\n").length;
    failures.push(`${path.relative(process.cwd(), filePath)}:${line} missing ${missing.join(", ")}`);
  }
}

if (failures.length > 0) {
  console.error(`Image attribute audit failed (${failures.length} image${failures.length === 1 ? "" : "s"}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Image attribute audit passed: ${imageCount} images declare intrinsic dimensions, loading, and decoding.`);
