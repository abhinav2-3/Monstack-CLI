import fs from 'fs-extra';
import path from 'path';

export const copyFile = async (src: string, dest: string): Promise<void> => {
  await fs.ensureDir(path.dirname(dest));
  await fs.copy(src, dest);
};

export const writeRenderedFile = async (dest: string, content: string): Promise<void> => {
  await fs.ensureDir(path.dirname(dest));
  await fs.writeFile(dest, content, 'utf-8');
};

export const getAllFiles = async (dirPath: string): Promise<string[]> => {
  const files: string[] = [];
  const items = await fs.readdir(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      files.push(...(await getAllFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
};

export const exists = async (path: string): Promise<boolean> => {
  return fs.pathExists(path);
};

export const replaceInFile = async (
  filePath: string,
  searchValue: string | RegExp,
  replaceValue: string
): Promise<void> => {
  const content = await fs.readFile(filePath, 'utf-8');
  const updatedContent = content.replace(searchValue, replaceValue);
  await fs.writeFile(filePath, updatedContent, 'utf-8');
};
