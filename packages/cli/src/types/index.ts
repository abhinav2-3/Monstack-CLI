import { GeneratorConfig } from '@monstack-cli/core/src/types';

export type CliConfig = GeneratorConfig;

export interface PromptResult {
  projectName: string;
  framework: string;
  architecture: string;
  database: string;
  packageManager: string;
  features: string[];
}
