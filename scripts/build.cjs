const fs = require('node:fs');
const path = require('node:path');
const { Script } = require('node:vm');
const { execFileSync } = require('node:child_process');
const root = path.join(__dirname, '..');
const source = path.join(root, 'src');
const { version } = require('../package.json');
let revision = 'unknown';
try {
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  revision = git('rev-parse', '--short', 'HEAD');
  if (git('status', '--porcelain')) revision += ' (modified)';
} catch {
  // Source archives may be built without Git metadata.
}
for (const file of ['app.js', 'flight.js', 'missions.js']) {
  new Script(fs.readFileSync(path.join(source, file), 'utf8'), { filename: file });
}
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'flight.js', 'missions.js']) {
  fs.copyFileSync(path.join(source, file), path.join(root, 'dist', file));
}
const htmlPath = path.join(root, 'dist', 'index.html');
fs.writeFileSync(htmlPath, fs.readFileSync(htmlPath, 'utf8').replace('{{BUILD_VERSION}}', `v${version} · ${revision}`));
console.log('Built Gravity Playground → dist/');
