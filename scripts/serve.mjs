import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { root } from './build.mjs';

const port = Number(process.env.PORT || 4174);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.ttf': 'font/ttf', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    const url = new URL(req.url, 'http://localhost');
    const path = decodeURIComponent(url.pathname === '/' ? '/examples/index.html' : url.pathname);
    if (path.split('/').some(segment => segment.startsWith('.'))) { res.writeHead(403); res.end(); return; }
    let file = resolve(root, '.' + path);
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Quiet Orbit specimen: http://localhost:${port}`));
