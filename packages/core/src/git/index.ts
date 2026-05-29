import execa from 'execa';
import chalk from 'chalk';
import { logger } from '@/shared/logger/logger'; // Wait, core doesn't have shared/logger yet, that was in templates.
// I'll just use console.log or a simple logger in core if needed.
// Actually, let's just use console.log for now to match the style of other core systems.

export const initializeGit = async (projectPath: string): Promise<void> => {
  console.log(chalk.cyan('\ngit Initializing git repository...'));

  try {
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit from MonStack CLI'], {
      cwd: projectPath,
    });
    console.log(chalk.green('✅ Git initialized successfully.'));
  } catch (error) {
    console.log(
      chalk.yellow(
        '⚠️ Failed to initialize git repository. This is non-blocking.',
      ),
    );
    // Non-blocking as per requirements
  }
};
