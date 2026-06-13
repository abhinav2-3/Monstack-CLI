import execa from 'execa';
import chalk from 'chalk';

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
