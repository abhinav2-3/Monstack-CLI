import { GeneratorConfig } from '@/types';
import { FeatureRegistry, getFeatureRegistry } from './registry';

export interface CompatibilityCheckResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class FeatureCompatibilityValidator {
  constructor(private registry: FeatureRegistry) {}

  //Check if a feature is compatible with the given config

  checkFeatureCompatibility(
    featureName: string,
    config: GeneratorConfig,
  ): CompatibilityCheckResult {
    const result: CompatibilityCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
    };

    const feature = this.registry.getFeature(featureName);

    if (!feature) {
      result.valid = false;
      result.errors.push(`Feature "${featureName}" not found in registry`);
      return result;
    }

    const { metadata } = feature;

    // Check framework compatibility
    if (
      metadata.frameworks &&
      !metadata.frameworks.includes(config.framework)
    ) {
      result.valid = false;
      result.errors.push(
        `Feature "${featureName}" does not support framework "${config.framework}". ` +
          `Supported frameworks: ${metadata.frameworks.join(', ')}`,
      );
    }

    // Check architecture compatibility
    if (
      metadata.architectures &&
      !metadata.architectures.includes(config.architecture)
    ) {
      result.valid = false;
      result.errors.push(
        `Feature "${featureName}" does not support architecture "${config.architecture}". ` +
          `Supported architectures: ${metadata.architectures.join(', ')}`,
      );
    }

    // Check database compatibility
    if (metadata.databases && !metadata.databases.includes(config.database)) {
      result.valid = false;
      result.errors.push(
        `Feature "${featureName}" does not support database "${config.database}". ` +
          `Supported databases: ${metadata.databases.join(', ')}`,
      );
    }

    return result;
  }

  /**
   * Check if all requested features are compatible with the given config
   */
  checkAllFeaturesCompatibility(
    featureNames: string[],
    config: GeneratorConfig,
  ): CompatibilityCheckResult {
    const result: CompatibilityCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
    };

    for (const featureName of featureNames) {
      const featureResult = this.checkFeatureCompatibility(featureName, config);

      if (!featureResult.valid) {
        result.valid = false;
        result.errors.push(...featureResult.errors);
      }

      result.warnings.push(...featureResult.warnings);
    }

    return result;
  }

  /**
   * Get all compatible features for a given config
   */
  getCompatibleFeatures(config: GeneratorConfig): string[] {
    return this.registry
      .getCompatibleFeatures(
        config.framework,
        config.architecture,
        config.database,
      )
      .map((f) => f.name);
  }

  /**
   * Check if feature combination is valid (e.g., no conflicts)
   */
  checkFeatureCombination(
    featureNames: string[],
    config: GeneratorConfig,
  ): CompatibilityCheckResult {
    const result: CompatibilityCheckResult = {
      valid: true,
      errors: [],
      warnings: [],
    };

    // First check individual feature compatibility
    const allFeaturesResult = this.checkAllFeaturesCompatibility(
      featureNames,
      config,
    );
    if (!allFeaturesResult.valid) {
      result.valid = false;
      result.errors.push(...allFeaturesResult.errors);
    }

    // Could add feature combination rules here in the future
    // For now, we only validate individual feature compatibility

    return result;
  }

  /**
   * Validate features and throw helpful errors
   */
  validateOrThrow(featureNames: string[], config: GeneratorConfig): void {
    const result = this.checkAllFeaturesCompatibility(featureNames, config);

    if (!result.valid) {
      const errorMessage = `Feature compatibility validation failed:\n${result.errors.map((e) => `  - ${e}`).join('\n')}`;
      throw new Error(errorMessage);
    }

    if (result.warnings.length > 0) {
      console.warn('Feature compatibility warnings:');
      result.warnings.forEach((w) => console.warn(`  - ${w}`));
    }
  }
}

/**
 * Create and return a compatibility validator instance
 */
export async function createCompatibilityValidator(): Promise<FeatureCompatibilityValidator> {
  const registry = await getFeatureRegistry();
  return new FeatureCompatibilityValidator(registry);
}
