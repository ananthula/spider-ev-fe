/**
 * Generate deterministic 1200x630 Open Graph cards from the approved
 * Spider Energy background and the product imagery already in this repo.
 *
 * Requires ffmpeg with the drawtext filter.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = join(ROOT, "public", "og", "products");
const BACKGROUND = join(ROOT, "public", "og", "spider-energy-card-background.png");
const SWIFT_CACHE = "/private/tmp/spider-ev-swift-module-cache";

const products = [
  { id: "spider-mini", line: "SPIDEREV  /  AC EV CHARGER", name: "Spider Mini", spec: "3.3 kW", detail: "Compact home charging", image: "src/assets/home/AcCharger.webp" },
  { id: "spider-lite", line: "SPIDEREV  /  AC EV CHARGER", name: "Spider Lite", spec: "3.3 kW", detail: "Smart home charging", image: "src/assets/home/AcCharger.webp" },
  { id: "spider-smart", line: "SPIDEREV  /  AC EV CHARGER", name: "Spider Smart", spec: "7.4 kW", detail: "Type 2 smart charging", image: "src/assets/home/AcCharger.webp" },
  { id: "spider-blaze", line: "SPIDEREV  /  AC EV CHARGER", name: "Spider Blaze", spec: "22 kW", detail: "Commercial charging", image: "src/assets/home/AcCharger.webp" },
  { id: "spider-strike", line: "SPIDEREV  /  AC EV CHARGER", name: "Spider Strike", spec: "40 kW", detail: "High-power fleet charging", image: "src/assets/home/AcCharger.webp" },
  { id: "spider-dash", line: "SPIDEREV  /  AC EV CHARGER", name: "Spider Dash", spec: "80 kW", detail: "Dual-gun commercial charging", image: "src/assets/home/AcCharger.webp" },
  { id: "spider-base", line: "SPIDEREV  /  DC EV CHARGER", name: "Spider Base", spec: "3-12 kW", detail: "Modular light-EV charging", image: "src/assets/home/DcCharger.webp" },
  { id: "spider-fast", line: "SPIDEREV  /  DC FAST CHARGER", name: "Spider Fast", spec: "30 kW", detail: "Public rapid charging", image: "src/assets/home/DcCharger.webp" },
  { id: "spider-spark", line: "SPIDEREV  /  DC FAST CHARGER", name: "Spider Spark", spec: "60 kW", detail: "Dual-connector charging", image: "src/assets/chargers/spark.webp" },
  { id: "spider-falcon", line: "SPIDEREV  /  DC FAST CHARGER", name: "Spider Falcon", spec: "60 kW", detail: "CCS2 public charging", image: "src/assets/home/DcCharger.webp" },
  { id: "spider-ultra", line: "SPIDEREV  /  DC FAST CHARGER", name: "Spider Ultra", spec: "120 kW", detail: "High-speed fleet charging", image: "src/assets/chargers/ultra.webp" },
  { id: "spider-surge", line: "SPIDEREV  /  DC FAST CHARGER", name: "Spider Surge", spec: "180 kW", detail: "Rapid highway charging", image: "src/assets/chargers/surge.webp" },
  { id: "spider-hulk", line: "SPIDEREV  /  DC FAST CHARGER", name: "Spider Hulk", spec: "240 kW", detail: "Ultra-rapid heavy-duty charging", image: "src/assets/home/DcCharger.webp" },
];

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(SWIFT_CACHE, { recursive: true });
execFileSync("xcrun", [
  "swift",
  join(ROOT, "scripts", "render-og-cards.swift"),
  ROOT,
  BACKGROUND,
  OUTPUT_DIR,
  JSON.stringify(products),
], {
  stdio: "inherit",
  env: {
    ...process.env,
    DEVELOPER_DIR: "/Applications/Xcode.app/Contents/Developer",
    CLANG_MODULE_CACHE_PATH: SWIFT_CACHE,
  },
});
