const fs = require('node:fs');
const path = require('node:path');
const { Script } = require('node:vm');
const root = path.join(__dirname, '..');
const source = path.join(root, 'src');
for (const file of ['app.js', 'flight.js']) {
  new Script(fs.readFileSync(path.join(source, file), 'utf8'), { filename: file });
}
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'flight.js']) {
  fs.copyFileSync(path.join(source, file), path.join(root, 'dist', file));
}
console.log('Built Gravity Playground → dist/');
