import execa from 'execa';
import chalk from 'chalk';

export interface Installer {
  install(projectPath: string): Promise<void>;
  getName(): string;
}

export abstract class BaseInstaller implements Installer {
  abstract getName(): string;
  abstract getInstallCommand(): { command: string; args: string[] };

  async install(projectPath: string): Promise<void> {
    const { command, args } = this.getInstallCommand();

    console.log(
      chalk.cyan(`\n📦 Installing dependencies using ${this.getName()}...`),
    );

    try {
      await execa(command, args, {
        cwd: projectPath,
        stdio: 'inherit',
      });
    } catch (error) {
      throw new Error(
        `Failed to install dependencies using ${this.getName()}: ${error}`,
      );
    }
  }
}
