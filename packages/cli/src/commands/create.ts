import ora from 'ora';
import chalk from 'chalk';
import { runProjectPrompts } from '@/prompts/project';
import { CliConfig } from '@/types';
import { generateProject } from '@monstack-cli/core';

export const createCommand = async (name?: string) => {
  try {
    const responses = await runProjectPrompts();

    // If name was provided via CLI arg, override prompt value
    if (name) {
      responses.projectName = name;
    }

    const spinner = ora('Processing your configuration...').start();

    const config: CliConfig = {
      projectName: responses.projectName,
      framework: responses.framework as any,
      architecture: responses.architecture as any,
      database: responses.database as any,
      packageManager: responses.packageManager as any,
      features: responses.features
    };

    spinner.succeed(chalk.green('Configuration collected and validated!'));

    // Trigger Generation
    await generateProject(config);

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
