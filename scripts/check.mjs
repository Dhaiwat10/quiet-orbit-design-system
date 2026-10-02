import assert from 'node:assert/strict';
import { readFile, readdir, stat, access } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { root, renderTokens, renderMotionTokens } from './build.mjs';

const text = path => readFile(join(root, path), 'utf8');
const data = JSON.parse(await text('tokens/tokens.json'));
assert.equal(await text('css/tokens.css'), renderTokens(data), 'Generated CSS is stale. Run npm run build.');
assert.equal(await text('js/motion-tokens.js'), renderMotionTokens(data), 'Generated motion tokens are stale.');

function luminance(hex) {
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return channels.reduce((sum, x, i) => sum + x * [.2126, .7152, .0722][i], 0);
}
for (const surface of ['bg', 'card']) {
  for (const foreground of ['text', 'muted', 'accent']) {
    const values = [luminance(data.tokens.color[surface]), luminance(data.tokens.color[foreground])].sort((a, b) => b - a);
    const contrast = (values[0] + .05) / (values[1] + .05);
    assert.ok(contrast >= 4.5, `${foreground} on ${surface} has insufficient small-text contrast: ${contrast}`);
  }
}

async function files(folder) {
  const result = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) result.push(...await files(path));
    else if (entry.isFile()) result.push(path);
  }
  return result;
}
for (const group of ['css', 'js', 'tokens', 'fonts']) {
  for (const source of await files(join(root, group))) {
    const relative = source.slice(root.length);
    const copy = join(root, 'skills/quiet-orbit/assets/quiet-orbit', relative);
    assert.deepEqual(await readFile(copy), await readFile(source), `Skill asset differs: ${relative}`);
  }
}
for (const name of ['design-system.md', 'motion.md', 'adapting.md']) {
  assert.equal(await text(`docs/${name}`), await text(`skills/quiet-orbit/references/${name}`), `Skill reference differs: ${name}`);
}
for (const file of await files(join(root, 'css'))) {
  for (const match of (await readFile(file, 'utf8')).matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
    await access(resolve(dirname(file), match[1]));
  }
}
const library = await text('css/quiet-orbit.css');
const known = new Set(Object.entries(data.tokens).flatMap(([group, values]) => Object.keys(values).map(name => `--qo-${group}-${name}`)));
known.add('--qo-edge');
for (const [, name] of library.matchAll(/var\((--qo-[a-z0-9-]+)/g)) assert.ok(known.has(name), `Unknown token: ${name}`);
for (const file of ['js/motion.js', 'examples/specimen.js', 'scripts/serve.mjs']) execFileSync(process.execPath, ['--check', join(root, file)]);
const skill = await text('skills/quiet-orbit/SKILL.md');
for (const [, href] of skill.matchAll(/\]\(([^)#]+)\)/g)) await access(join(root, 'skills/quiet-orbit', href));
assert.equal((await stat(join(root, 'fonts/instrument-sans.ttf'))).size > 10000, true);
console.log('PASS: generated tokens, CSS asset URLs, skill parity, token references, JS syntax, and text contrast.');
