import ejs from 'ejs';
import fs from 'fs-extra';

export const renderTemplate = async (
  filePath: string,
  data: Record<string, any>,
): Promise<string> => {
  const templateContent = await fs.readFile(filePath, 'utf-8');
  return ejs.render(templateContent, data);
};

export const isTemplateFile = (filePath: string): boolean => {
  return filePath.endsWith('.ejs');
};

export const getTargetFileName = (filePath: string): string => {
  if (isTemplateFile(filePath)) {
    return filePath.replace(/\.ejs$/, '');
  }
  return filePath;
};
