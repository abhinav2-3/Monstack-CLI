import prompts from 'prompts';
import chalk from 'chalk';
import {
  FRAMEWORKS,
  ARCHITECTURES,
  DATABASES,
  PACKAGE_MANAGERS,
  FEATURES,
} from '@/constants/options';
import { validateProjectName } from '@/validators/project';
import { PromptResult } from '@/types';

export const runProjectPrompts = async (): Promise<PromptResult> => {
  console.log(
    chalk.cyan("\n🚀 Welcome to MonStack CLI! Let's set up your project.\n"),
  );

  const questions: prompts.PromptObject[] = [
    {
      type: 'text',
      name: 'projectName',
      message: 'What is your project name?',
      initial: 'my-monstack-app',
      validate: validateProjectName,
    },
    {
      type: 'select',
      name: 'framework',
      message: 'Select a framework',
      choices: FRAMEWORKS as any,
      initial: 0,
    },
    {
      type: 'select',
      name: 'architecture',
      message: 'Select an architecture style',
      choices: ARCHITECTURES as any,
      initial: 1, // Modular Monolith as default
    },
    {
      type: 'select',
      name: 'database',
      message: 'Select a database',
      choices: DATABASES as any,
      initial: 0,
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager',
      choices: PACKAGE_MANAGERS as any,
      initial: 0,
    },
    {
      type: 'multiselect',
      name: 'features',
      message: 'Select optional features',
      choices: FEATURES as any,
      hint: '- Space to select. Return to submit',
    },
  ];

  const onCancel = () => {
    console.log(chalk.red('\n✖ Setup cancelled.'));
    process.exit(0);
  };

  const response = await prompts(questions, { onCancel });

  return response as PromptResult;
};
