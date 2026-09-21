import fs from "node:fs/promises";
import path from "node:path";
import { LinkChecker, LinkState } from "linkinator";
import {
  fileToUrl,
  listHtmlFiles,
  startStaticServer,
} from "./static-server.mjs";

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

// github.com rate limits and throttles unauthenticated crawls, which makes it
// an unreliable signal in CI. Every other external host is checked.
const SKIPPED_HOSTS = new Set(["github.com"]);

const server = await startStaticServer(siteDir);
const paths = htmlFiles.map((file) => fileToUrl(siteDir, file, server.url));

try {
  const checker = new LinkChecker();
  const result = await checker.check({
    path: paths,
    recurse: false,
    checkFragments: true,
    retryErrors: true,
    retryErrorsCount: 3,
    linksToSkip: async (link) => {
      try {
        return SKIPPED_HOSTS.has(new URL(link).hostname);
      } catch {
        return false;
      }
    },
  });

  const broken = result.links.filter((link) => link.state === LinkState.BROKEN);
  for (const link of result.links) {
    console.log(`${link.state} ${link.status ?? "-"} ${link.url}`);
  }

  if (broken.length > 0) {
    console.error(`Broken links: ${broken.length}`);
    for (const link of broken) {
      console.error(
        `  ${link.status ?? "-"} ${link.url} (from ${link.parent ?? "start"})`,
      );
    }
    process.exitCode = 1;
  }
} finally {
  await server.close();
}
