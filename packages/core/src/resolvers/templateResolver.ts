import path from 'path';
import { GeneratorConfig } from '@/types';
import { exists } from '@/filesystem';

export const resolveTemplatePath = async (
  config: GeneratorConfig,
): Promise<string> => {
  // In development, we look for templates in the workspace
  // In production, this might be different
  const templateBaseDir = path.resolve(__dirname, '../../templates');

  const templatePath = path.join(
    templateBaseDir,
    config.framework,
    config.architecture,
    config.database,
  );

  if (!(await exists(templatePath))) {
    throw new Error(`Template not found at: ${templatePath}`);
  }

  return templatePath;
};
