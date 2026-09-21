import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const MIME = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

export async function listHtmlFiles(rootDir) {
  const files = [];

  async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.name.endsWith(".html")) {
        files.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  files.sort();
  return files;
}

export function fileToUrl(rootDir, filePath, origin) {
  let relative = path.relative(rootDir, filePath).split(path.sep).join("/");
  if (relative === "index.html") {
    relative = "";
  } else if (relative.endsWith("/index.html")) {
    relative = relative.slice(0, -"index.html".length);
  }
  return `${origin}/${relative}`;
}

export function startStaticServer(rootDir, port = 0) {
  const root = path.resolve(rootDir);

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) {
      pathname += "index.html";
    }

    const filePath = path.normalize(path.join(root, pathname));
    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      res.writeHead(403);
      res.end();
      return;
    }

    try {
      let resolved = filePath;
      const stat = await fs.stat(resolved).catch(() => null);
      if (stat?.isDirectory()) {
        resolved = path.join(resolved, "index.html");
      }
      const data = await fs.readFile(resolved);
      const type = MIME[path.extname(resolved)] ?? "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        url: `http://127.0.0.1:${address.port}`,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((error) => {
              if (error) {
                closeReject(error);
              } else {
                closeResolve();
              }
            });
          }),
      });
    });
  });
}
