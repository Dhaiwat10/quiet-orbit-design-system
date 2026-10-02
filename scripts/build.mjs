import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
export function renderTokens(data) {
  const declarations = Object.entries(data.tokens).flatMap(([group, values]) =>
    Object.entries(values).map(([name, value]) => `    --qo-${group}-${name}: ${value};`));
  return `/* Generated from tokens/tokens.json. Run npm run build after edits. */\n@layer quiet-orbit {\n  .qo {\n${declarations.join('\n')}\n  }\n}\n`;
}

export function renderMotionTokens(data) {
  return `// Generated from tokens/tokens.json.\nexport const motion = ${JSON.stringify(data.tokens.motion, null, 2)};\nexport const spring = ${JSON.stringify(data.spring, null, 2)};\n`;
}

export async function build() {
  const data = JSON.parse(await readFile(join(root, 'tokens/tokens.json'), 'utf8'));
  await writeFile(join(root, 'css/tokens.css'), renderTokens(data));
  await writeFile(join(root, 'js/motion-tokens.js'), renderMotionTokens(data));
  const bundle = join(root, 'skills/quiet-orbit');
  await mkdir(join(bundle, 'references'), { recursive: true });
  for (const name of ['design-system.md', 'motion.md', 'adapting.md']) {
    await cp(join(root, 'docs', name), join(bundle, 'references', name));
  }
  for (const name of ['css', 'js', 'tokens', 'fonts']) {
    await cp(join(root, name), join(bundle, 'assets/quiet-orbit', name), { recursive: true });
  }
  console.log('Generated CSS tokens and refreshed the portable Quiet Orbit skill.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
