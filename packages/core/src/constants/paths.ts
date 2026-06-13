import path from 'path';
import fs from 'fs-extra';

/**
 * Resolves the root directory for assets (templates and features).
 * It looks for these directories in various locations to support both
 * development (monorepo) and production (installed package).
 */
export const getAssetsRoot = (): string => {
  // 1. Check if environment variable is set
  if (process.env.MONSTACK_ASSETS_PATH) {
    return process.env.MONSTACK_ASSETS_PATH;
  }

  // 2. Try to find relative to __dirname (handles different build outputs)
  // In dev: packages/core/src/constants -> ../../.. (monorepo root)
  // In dist: packages/core/dist/constants -> ../../.. (packages/core)
  
  const possiblePaths = [
    // Monorepo root (dev)
    path.resolve(__dirname, '../../../../'),
    // Core package root (dist)
    path.resolve(__dirname, '../../../'),
    // Current working directory
    process.cwd(),
  ];

  for (const root of possiblePaths) {
    const templatesExists = fs.pathExistsSync(path.join(root, 'templates'));
    const featuresExists = fs.pathExistsSync(path.join(root, 'features'));
    
    // If we are in the monorepo root, templates/features are under packages/
    const pkgTemplatesExists = fs.pathExistsSync(path.join(root, 'packages/templates'));
    const pkgFeaturesExists = fs.pathExistsSync(path.join(root, 'packages/features'));

    if (templatesExists && featuresExists) {
      return root;
    }
    
    if (pkgTemplatesExists && pkgFeaturesExists) {
      return path.join(root, 'packages');
    }
  }

  // Fallback to monorepo dev structure
  return path.resolve(__dirname, '../../../../packages');
};

export const getTemplatesPath = (): string => {
  return path.join(getAssetsRoot(), 'templates');
};

export const getFeaturesPath = (): string => {
  return path.join(getAssetsRoot(), 'features');
};
