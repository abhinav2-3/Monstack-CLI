export type Framework = 'express';

export type Architecture = 'traditional' | 'modular';

export type Database = 'mongodb' | 'postgres';

export type ORM = 'mongoose' | 'prisma';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export interface GeneratorConfig {
  projectName: string;
  framework: Framework;
  architecture: Architecture;
  database: Database;
  orm: ORM;
  packageManager: PackageManager;
  features: string[];
}

export interface FeatureMetadata {
  name: string;
  description: string;
  frameworks?: Framework[];
  architectures?: Architecture[];
  databases?: Database[];
}

export interface FeatureDependencies {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface Feature {
  metadata: FeatureMetadata;
  dependencies: FeatureDependencies;
  apply?: (projectPath: string, config: GeneratorConfig) => Promise<void>;
}
