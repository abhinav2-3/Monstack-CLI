import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { GeneratorConfig, FeatureMetadata, FeatureDependencies } from '@/types';
import { getAllFiles, copyFile } from '@/filesystem';

export class FeatureManager {
  private readonly featuresBaseDir: string;

  constructor() {
    this.featuresBaseDir = path.resolve(__dirname, '../../features');
  }

  async applyFeatures(projectPath: string, config: GeneratorConfig): Promise<void> {
    if (!config.features || config.features.length === 0) return;

    console.log(chalk.cyan('\n🧩 Applying features...'));

    for (const featureName of config.features) {
      await this.applyFeature(featureName, projectPath, config);
    }
  }

  private async applyFeature(featureName: string, projectPath: string, config: GeneratorConfig): Promise<void> {
    const featureDir = path.join(this.featuresBaseDir, featureName);

    if (!(await fs.pathExists(featureDir))) {
      console.warn(chalk.yellow(`⚠️ Feature ${featureName} not found at ${featureDir}`));
      return;
    }

    console.log(chalk.blue(`  - Applying ${featureName}...`));

    // 1. Copy Files
    const filesDir = path.join(featureDir, 'files');
    if (await fs.pathExists(filesDir)) {
      const files = await getAllFiles(filesDir);
      for (const file of files) {
        const relativePath = path.relative(filesDir, file);
        const targetPath = path.join(projectPath, relativePath);
        await copyFile(file, targetPath);
      }
    }

    // 2. Merge Dependencies
    const depFile = path.join(featureDir, 'dependencies.json');
    if (await fs.pathExists(depFile)) {
      const deps: FeatureDependencies = await fs.readJson(depFile);
      await this.mergeDependencies(projectPath, deps);
    }

    // 3. Run Post-Apply Hooks
    const hookFile = path.join(featureDir, 'index.ts');
    if (await fs.pathExists(hookFile)) {
      try {
        require('ts-node').register({
          transpileOnly: true,
          compilerOptions: {
            module: 'CommonJS',
          },
        });
        const featureModule = require(hookFile);
        if (featureModule.postApply) {
          await featureModule.postApply(projectPath, config);
        }
      } catch (error) {
        console.error(chalk.red(`  - Error running postApply hook for ${featureName}:`), error);
      }
    }
  }

  private async mergeDependencies(projectPath: string, featureDeps: FeatureDependencies): Promise<void> {
    const pkgPath = path.join(projectPath, 'package.json');
    if (!(await fs.pathExists(pkgPath))) return;

    const pkg = await fs.readJson(pkgPath);

    if (featureDeps.dependencies) {
      pkg.dependencies = { ...pkg.dependencies, ...featureDeps.dependencies };
    }

    if (featureDeps.devDependencies) {
      pkg.devDependencies = { ...pkg.devDependencies, ...featureDeps.devDependencies };
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
}
