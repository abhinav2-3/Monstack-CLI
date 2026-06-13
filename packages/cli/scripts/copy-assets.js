import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyAssets() {
  const rootDir = path.resolve(__dirname, '../../../');
  const distDir = path.resolve(__dirname, '../dist');

  const assets = ['templates', 'features'];

  for (const asset of assets) {
    const src = path.join(rootDir, 'packages', asset);
    const dest = path.join(distDir, asset);

    if (await fs.pathExists(src)) {
      console.log(`Copying ${asset} from ${src} to ${dest}...`);
      await fs.copy(src, dest);
    } else {
      console.warn(`Warning: Asset source not found: ${src}`);
    }
  }
  
  console.log('Assets copied successfully!');
}

copyAssets().catch(err => {
  console.error('Error copying assets:', err);
  process.exit(1);
});
