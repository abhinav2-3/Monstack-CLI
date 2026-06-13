import path from 'path';
import { GeneratorConfig } from '../types';
import { exists } from '../filesystem';
import { getTemplatesPath } from '../constants/paths';

export const resolveTemplatePath = async (
  config: GeneratorConfig,
  assetsRoot?: string,
): Promise<string> => {
  const templateBaseDir = assetsRoot
    ? path.join(assetsRoot, 'templates')
    : getTemplatesPath();

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
