import fs from 'fs/promises';
import path from 'path';

async function copyPDFs(
  sourceDirectory: string,
  destinationDirectory: string,
): Promise<void> {
  try {
    const items = await fs.readdir(sourceDirectory, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(sourceDirectory, item.name);

      if (item.isDirectory()) {
        await copyPDFs(itemPath, destinationDirectory);
      } else if (item.isFile() && path.extname(item.name) === '.pdf') {
        const destinationPath = path.join(destinationDirectory, item.name);
        await fs.copyFile(itemPath, destinationPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory: ${error.message}`);
  }
}

const docsInboxPath = './docs-inbox';
const docsPath = './docs';
copyPDFs(docsInboxPath, docsPath);
