import path from 'path';
import fs from 'fs-extra';
import { FeatureMetadata } from '../types';
import { getFeaturesPath } from '../constants/paths';

export interface RegisteredFeature {
  name: string;
  metadata: FeatureMetadata;
  path: string;
}

export class FeatureRegistry {
  private features: Map<string, RegisteredFeature> = new Map();
  private readonly featuresBaseDir: string;

  constructor() {
    this.featuresBaseDir = getFeaturesPath();
  }

  /**
   * Load and register all available features from the features directory
   */
  async discoverFeatures(): Promise<void> {
    const featuresDir = this.featuresBaseDir;

    if (!(await fs.pathExists(featuresDir))) {
      console.warn(`Features directory not found at ${featuresDir}`);
      return;
    }

    const entries = await fs.readdir(featuresDir);

    for (const entry of entries) {
      const featurePath = path.join(featuresDir, entry);
      const stat = await fs.stat(featurePath);

      if (!stat.isDirectory() || entry === 'src') continue;

      await this.registerFeature(entry, featurePath);
    }
  }

  /**
   * Register a single feature by loading its metadata
   */
  private async registerFeature(
    name: string,
    featurePath: string,
  ): Promise<void> {
    const metadataPath = path.join(featurePath, 'metadata.json');

    if (!(await fs.pathExists(metadataPath))) {
      console.warn(`Metadata not found for feature: ${name}`);
      return;
    }

    try {
      const metadata: FeatureMetadata = await fs.readJson(metadataPath);
      this.features.set(name, {
        name,
        metadata,
        path: featurePath,
      });
    } catch (error) {
      console.error(`Failed to load metadata for feature ${name}:`, error);
    }
  }

  /**
   * Get a registered feature by name
   */
  getFeature(name: string): RegisteredFeature | undefined {
    return this.features.get(name);
  }

  /**
   * Get metadata for a feature
   */
  getFeatureMetadata(name: string): FeatureMetadata | undefined {
    return this.features.get(name)?.metadata;
  }

  /**
   * Get path to a feature directory
   */
  getFeaturePath(name: string): string | undefined {
    return this.features.get(name)?.path;
  }

  /**
   * Get all registered features
   */
  getAllFeatures(): RegisteredFeature[] {
    return Array.from(this.features.values());
  }

  /**
   * Check if a feature is registered
   */
  hasFeature(name: string): boolean {
    return this.features.has(name);
  }

  /**
   * Get features that support a specific framework
   */
  getFeaturesByFramework(framework: string): RegisteredFeature[] {
    return Array.from(this.features.values()).filter(
      (f) =>
        !f.metadata.frameworks ||
        f.metadata.frameworks.includes(framework as any),
    );
  }

  /**
   * Get features that support a specific architecture
   */
  getFeaturesByArchitecture(architecture: string): RegisteredFeature[] {
    return Array.from(this.features.values()).filter(
      (f) =>
        !f.metadata.architectures ||
        f.metadata.architectures.includes(architecture as any),
    );
  }

  /**
   * Get features that support a specific database
   */
  getFeaturesByDatabase(database: string): RegisteredFeature[] {
    return Array.from(this.features.values()).filter(
      (f) =>
        !f.metadata.databases || f.metadata.databases.includes(database as any),
    );
  }

  /**
   * Get all features compatible with given config
   */
  getCompatibleFeatures(
    framework: string,
    architecture: string,
    database: string,
  ): RegisteredFeature[] {
    return Array.from(this.features.values()).filter(
      (f) =>
        (!f.metadata.frameworks ||
          f.metadata.frameworks.includes(framework as any)) &&
        (!f.metadata.architectures ||
          f.metadata.architectures.includes(architecture as any)) &&
        (!f.metadata.databases ||
          f.metadata.databases.includes(database as any)),
    );
  }

  /**
   * Validate that requested features are available and compatible
   */
  validateFeatures(
    featureNames: string[],
    framework: string,
    architecture: string,
    database: string,
  ): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    for (const featureName of featureNames) {
      const feature = this.getFeature(featureName);

      if (!feature) {
        errors.push(`Feature "${featureName}" not found in registry`);
        continue;
      }

      const { metadata } = feature;

      if (
        metadata.frameworks &&
        !metadata.frameworks.includes(framework as any)
      ) {
        errors.push(
          `Feature "${featureName}" does not support framework "${framework}"`,
        );
      }

      if (
        metadata.architectures &&
        !metadata.architectures.includes(architecture as any)
      ) {
        errors.push(
          `Feature "${featureName}" does not support architecture "${architecture}"`,
        );
      }

      if (metadata.databases && !metadata.databases.includes(database as any)) {
        errors.push(
          `Feature "${featureName}" does not support database "${database}"`,
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Create and return a singleton instance of the feature registry
 */
let registryInstance: FeatureRegistry | null = null;

export async function getFeatureRegistry(): Promise<FeatureRegistry> {
  if (!registryInstance) {
    registryInstance = new FeatureRegistry();
    await registryInstance.discoverFeatures();
  }
  return registryInstance;
}
