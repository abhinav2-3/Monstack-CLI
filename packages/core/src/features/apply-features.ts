import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { GeneratorConfig, FeatureDependencies } from '../types';
import { getAllFiles, copyFile } from '../filesystem';
import {
  renderTemplate,
  isTemplateFile,
  getTargetFileName,
} from '../template-engine';
import { resolveFeatures } from './resolver';
import { getFeatureRegistry } from './registry';
import { createRequire } from 'module';

// Use a custom require to safely load hooks in both CJS and ESM environments.
const customRequire =
  typeof require !== 'undefined'
    ? require
    : createRequire(eval('import.meta.url'));

/**
 * Applies all selected features to the generated project.
 */
export const applyFeatures = async (
  projectPath: string,
  config: GeneratorConfig,
  options: {
    renderData?: Record<string, any>;
    assetsRoot?: string;
  } = {},
): Promise<void> => {
  const selectedFeatures = resolveFeatures(config);

  if (selectedFeatures.length === 0) return;

  const registry = await getFeatureRegistry();
  const validation = registry.validateFeatures(
    selectedFeatures,
    config.framework,
    config.architecture,
    config.database,
  );

  if (!validation.valid) {
    console.error(chalk.red('\n❌ Feature validation failed:'));
    validation.errors.forEach((err) => console.error(chalk.red(`  - ${err}`)));
    throw new Error('Feature validation failed');
  }

  console.log(chalk.cyan('\n🧩 Applying features...'));

  for (const featureName of selectedFeatures) {
    const feature = registry.getFeature(featureName)!;
    await applySingleFeature(
      featureName,
      feature.path,
      projectPath,
      config,
      options.renderData,
    );
  }
};

/**
 * Applies a single feature to the project.
 */
const applySingleFeature = async (
  featureName: string,
  featureDir: string,
  projectPath: string,
  config: GeneratorConfig,
  renderData?: Record<string, any>,
): Promise<void> => {
  console.log(chalk.blue(`  - Applying ${featureName}...`));

  // 1. Copy Files with EJS rendering support
  const filesDir = path.join(featureDir, 'files');
  if (await fs.pathExists(filesDir)) {
    const files = await getAllFiles(filesDir);
    for (const file of files) {
      const relativePath = path.relative(filesDir, file);
      const targetPath = path.join(
        projectPath,
        isTemplateFile(relativePath)
          ? getTargetFileName(relativePath)
          : relativePath,
      );

      // If it's an EJS template, render it
      if (isTemplateFile(file)) {
        const templateData = renderData || {};
        const renderedContent = await renderTemplate(file, templateData);
        await fs.ensureDir(path.dirname(targetPath));
        await fs.writeFile(targetPath, renderedContent, 'utf-8');
      } else {
        await copyFile(file, targetPath);
      }
    }
  }

  // 2. Merge Dependencies
  const depFile = path.join(featureDir, 'dependencies.json');
  if (await fs.pathExists(depFile)) {
    const deps: FeatureDependencies = await fs.readJson(depFile);
    await mergeDependencies(projectPath, deps);
  }

  // 3. Run Post-Apply Hooks
  // Note: Using a safer way to load hooks for production might be needed later
  const hookFile = path.join(featureDir, 'index.ts');
  const hookFileJs = path.join(featureDir, 'index.js');

  let hookModule: any = null;

  if (await fs.pathExists(hookFile)) {
    try {
      // In development, use ts-node
      customRequire('ts-node').register({
        transpileOnly: true,
        compilerOptions: {
          module: 'CommonJS',
        },
      });
      hookModule = customRequire(hookFile);
    } catch (error) {
      // Fallback or ignore if ts-node fails
    }
  } else if (await fs.pathExists(hookFileJs)) {
    hookModule = customRequire(hookFileJs);
  }

  if (hookModule && hookModule.postApply) {
    try {
      await hookModule.postApply(projectPath, config);
    } catch (error) {
      console.error(
        chalk.red(`  - Error running postApply hook for ${featureName}:`),
        error,
      );
    }
  }
};

/**
 * Merges feature dependencies into the project's package.json
 */
const mergeDependencies = async (
  projectPath: string,
  featureDeps: FeatureDependencies,
): Promise<void> => {
  const pkgPath = path.join(projectPath, 'package.json');
  if (!(await fs.pathExists(pkgPath))) return;

  const pkg = await fs.readJson(pkgPath);

  if (featureDeps.dependencies) {
    pkg.dependencies = {
      ...(pkg.dependencies || {}),
      ...featureDeps.dependencies,
    };
  }

  if (featureDeps.devDependencies) {
    pkg.devDependencies = {
      ...(pkg.devDependencies || {}),
      ...featureDeps.devDependencies,
    };
  }

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
};
