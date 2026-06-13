import path from 'path';
import chalk from 'chalk';
import fs from 'fs-extra';
import { GeneratorConfig } from '../types';
import { resolveTemplatePath } from '../resolvers/templateResolver';
import { getAllFiles, writeRenderedFile, copyFile } from '../filesystem';
import {
  renderTemplate,
  isTemplateFile,
  getTargetFileName,
} from '../template-engine';
import { resolveInstaller } from '../installers';
import { initializeGit } from '../git';
import { setupEnvironmentFiles } from '../environment';
import { applyFeatures } from '../features/apply-features';

export interface GeneratorOptions {
  assetsRoot?: string;
}

export const generateProject = async (
  config: GeneratorConfig,
  options: GeneratorOptions = {},
): Promise<void> => {
  const targetDir = path.join(process.cwd(), config.projectName);

  if (await fs.pathExists(targetDir)) {
    throw new Error(`Target directory ${config.projectName} already exists.`);
  }

  console.log(chalk.cyan(`\n🏗️ Generating project: ${config.projectName}...`));

  const templatePath = await resolveTemplatePath(config, options.assetsRoot);
  const files = await getAllFiles(templatePath);

  // Prepare rendering data (UPPERCASE_SNAKE_CASE as per Phase 2)
  const renderData = {
    PROJECT_NAME: config.projectName,
    PORT: 3000, // Default port for now
    PACKAGE_MANAGER: config.packageManager,
    NODE_ENV: 'development',
    DATABASE: config.database,
    ORM: config.orm,
  };

  // 1. Generate Files
  for (const file of files) {
    const relativePath = path.relative(templatePath, file);

    if (
      relativePath.includes('node_modules') ||
      relativePath.includes('dist')
    ) {
      continue;
    }

    const targetFilePath = path.join(
      targetDir,
      getTargetFileName(relativePath),
    );

    if (isTemplateFile(file)) {
      const renderedContent = await renderTemplate(file, renderData);
      await writeRenderedFile(targetFilePath, renderedContent);
    } else {
      await copyFile(file, targetFilePath);
    }
  }

  // 2. Setup Environment Files (.env)
  await setupEnvironmentFiles(targetDir);

  // 3. Apply Modular Features
  await applyFeatures(targetDir, config, {
    renderData,
    assetsRoot: options.assetsRoot,
  });

  // 4. Install Dependencies
  const installer = resolveInstaller(config.packageManager);
  await installer.install(targetDir);

  // 5. Initialize Git
  await initializeGit(targetDir);

  console.log(
    chalk.green(
      `\n✅ Project ${config.projectName} generated successfully at ${targetDir}`,
    ),
  );
};
