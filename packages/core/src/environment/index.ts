import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export const setupEnvironmentFiles = async (projectPath: string): Promise<void> => {
  const examplePath = path.join(projectPath, '.env.example');
  const envPath = path.join(projectPath, '.env');

  if (await fs.pathExists(examplePath)) {
    console.log(chalk.cyan('📝 Creating .env file...'));
    await fs.copy(examplePath, envPath);
    console.log(chalk.green('✅ .env file created.'));
  }
};
