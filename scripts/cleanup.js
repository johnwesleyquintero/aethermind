import { rm } from 'fs/promises';
import { join } from 'path';

const ROOT_DIR = process.cwd();

const PATHS_TO_REMOVE = [
  'electron',
  'docs',
  '.dockerignore',
  'Dockerfile',
  'electron-builder.yml',
  'app/components/@settings/tabs/providers',
  'app/lib/providers',
];

async function cleanup() {
  console.log('🧹 Cleaning up unnecessary files...');
  
  for (const path of PATHS_TO_REMOVE) {
    try {
      await rm(join(ROOT_DIR, path), { recursive: true, force: true });
      console.log(`✅ Removed ${path}`);
    } catch (err) {
      console.error(`❌ Failed to remove ${path}:`, err.message);
    }
  }
}

cleanup().catch(console.error);
