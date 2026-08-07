#!/usr/bin/env node
'use strict';

// Static server for local website development.
//
// It exists because the live site relies on `book/.htaccess`, which rewrites
// any sub-path to the page — `/book/acme` serves `book/index.html` and the page
// reads the slug from the URL. A plain static server does not read `.htaccess`,
// goes looking for a file called `acme`, and returns 404. Testing the booking
// flow then means either editing URLs or configuring a server, both of which
// are easy to get wrong in a way that looks like an application bug.
//
// This mirrors the rewrite instead, so a local URL is the same URL as
// production. No dependencies — `node serve.js` from /website.
//
//   node serve.js            → http://127.0.0.1:8080
//   node serve.js 3001       → a different port

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

const send = (res, status, body, type) => {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store', // always serve the file just edited
  });
  res.end(body);
};

const serveFile = (res, file) => {
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 500, 'Failed to read file');
    send(res, 200, data, TYPES[path.extname(file).toLowerCase()]);
  });
};

const isFile = (p) => {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
};

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    // Reject anything that climbs out of the site root.
    const rel = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    const target = path.join(ROOT, rel);
    if (!target.startsWith(ROOT)) return send(res, 403, 'Forbidden');

    // A real file wins, exactly as the .htaccess conditions specify.
    if (isFile(target)) return serveFile(res, target);
    if (isFile(path.join(target, 'index.html'))) {
      return serveFile(res, path.join(target, 'index.html'));
    }

    // Otherwise fall back to the nearest ancestor that has BOTH an index.html
    // and an .htaccess — which is the rewrite, and only where live actually
    // performs one. `/book/acme` has no file, so `book/index.html` answers and
    // the page reads "acme" from the path, exactly as in production.
    //
    // Gating on .htaccess matters: falling back everywhere would serve the
    // homepage for any typo and return 200, hiding broken links that live
    // would answer with a 404.
    let dir = path.dirname(target);
    while (dir.startsWith(ROOT)) {
      if (isFile(path.join(dir, '.htaccess')) && isFile(path.join(dir, 'index.html'))) {
        return serveFile(res, path.join(dir, 'index.html'));
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    send(res, 404, 'Not found');
  })
  .listen(PORT, () => {
    console.log(`\n  At9 website → http://127.0.0.1:${PORT}`);
    console.log(`  Booking page → http://127.0.0.1:${PORT}/book/<your-slug>`);
    console.log('\n  Sub-paths under /book fall back to book/index.html, the same');
    console.log('  as book/.htaccess does live.\n');
  });
