/**
 * Copies root env files into backend so API routes can access DATABASE_URL and keys.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const backendDir = path.join(rootDir, 'backend');

for (const file of ['.env.local', '.env']) {
  const source = path.join(rootDir, file);
  const target = path.join(backendDir, file);

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
    console.log(`Synced ${file} -> backend/${file}`);
  }
}
