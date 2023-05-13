import fs from 'fs/promises';
import path from 'path';

async function listFiles(directory: string): Promise<void> {
  try {
    const files = await fs.readdir(directory);
    console.log(`Files in ${directory}:`);
    files.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    console.error(`Error reading directory: ${error.message}`);
  }
}

const docsInboxPath = path.join('./docs-inbox');
listFiles(docsInboxPath);
