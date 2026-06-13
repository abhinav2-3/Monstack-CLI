import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';
import chalk from 'chalk';
import { runProjectPrompts } from '@/prompts/project';
import { CliConfig } from '@/types';
import { generateProject } from '@monstack-cli/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createCommand = async (name?: string) => {
  try {
    const responses = await runProjectPrompts(name);

    // If name was provided via CLI arg, it might not be in responses if prompt was skipped
    const projectName = name || responses.projectName;

    const spinner = ora('Processing your configuration...').start();

    const config: CliConfig = {
      projectName,
      framework: responses.framework as any,
      architecture: responses.architecture as any,
      database: responses.database as any,
      packageManager: responses.packageManager as any,
      features: responses.features,
    };

    spinner.succeed(chalk.green('Configuration collected and validated!'));

    // Calculate assets root (templates and features)
    // In dev: packages/cli/src/commands -> ../../../
    // In dist: packages/cli/dist -> ../
    const assetsRoot = path.resolve(__dirname, '../../');

    // Trigger Generation
    await generateProject(config, { assetsRoot });

    console.log(chalk.cyan('\nNext steps:'));
    console.log(chalk.white(`  cd ${config.projectName}`));
    console.log(chalk.white(`  ${config.packageManager} install`));
    console.log(chalk.white(`  ${config.packageManager} run dev`));
    console.log('\n');
  } catch (error: any) {
    console.error(chalk.red('\nAn error occurred during project setup:'));
    console.error(chalk.red(error.message || error));
    process.exit(1);
  }
};
