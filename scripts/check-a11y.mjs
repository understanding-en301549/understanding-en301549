import fs from "node:fs/promises";
import path from "node:path";
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";
import {
  fileToUrl,
  listHtmlFiles,
  startStaticServer,
} from "./static-server.mjs";

const WCAG_22_AA_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

// A violation's target is an array holding one selector per frame, and a
// selector can itself be an array of selectors that walk down through shadow
// roots. Frame boundaries print as ">>" and shadow root boundaries as ">>>".
function formatTarget(selector, delimiter = " >> ") {
  if (!Array.isArray(selector)) {
    return selector;
  }
  return selector.map((part) => formatTarget(part, " >>> ")).join(delimiter);
}

const siteDir = path.resolve("_site");

try {
  await fs.access(siteDir);
} catch {
  console.error("No _site directory found. Run `npm run build` first.");
  process.exit(1);
}

const htmlFiles = await listHtmlFiles(siteDir);
if (htmlFiles.length === 0) {
  console.error("No HTML files found in _site. Run `npm run build` first.");
  process.exit(1);
}

const server = await startStaticServer(siteDir);
const browser = await chromium.launch();
let failed = false;

try {
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const file of htmlFiles) {
    const url = fileToUrl(siteDir, file, server.url);
    await page.goto(url, { waitUntil: "load" });
    const results = await new AxeBuilder({ page })
      .withTags(WCAG_22_AA_TAGS)
      .analyze();

    if (results.violations.length > 0) {
      failed = true;
      console.error(`axe-core (WCAG 2.2 AA) violations on ${url}`);
      for (const violation of results.violations) {
        console.error(
          `  ${violation.id} (${violation.impact}): ${violation.help}`,
        );
        for (const node of violation.nodes) {
          console.error(`    ${formatTarget(node.target)}`);
        }
      }
    } else {
      console.log(`axe-core ok: ${url}`);
    }
  }
} finally {
  await browser.close();
  await server.close();
}

process.exit(failed ? 1 : 0);
