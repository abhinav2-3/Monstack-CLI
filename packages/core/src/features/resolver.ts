import { GeneratorConfig } from '../types';

/**
 * Resolves selected feature names from the generator configuration.
 * Currently, it simply returns the features selected by the user.
 * In the future, this can handle dependencies between features.
 */
export const resolveFeatures = (config: GeneratorConfig): string[] => {
  if (!config.features || config.features.length === 0) {
    return [];
  }

  // Filter out 'none' if present
  const selectedFeatures = config.features.filter(
    (feature) => feature !== 'none',
  );

  return [...new Set(selectedFeatures)];
};
