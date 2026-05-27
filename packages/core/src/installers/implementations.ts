import { BaseInstaller } from './base';

export class NpmInstaller extends BaseInstaller {
  getName(): string {
    return 'npm';
  }
  getInstallCommand() {
    return { command: 'npm', args: ['install'] };
  }
}

export class PnpmInstaller extends BaseInstaller {
  getName(): string {
    return 'pnpm';
  }
  getInstallCommand() {
    return { command: 'pnpm', args: ['install'] };
  }
}

export class YarnInstaller extends BaseInstaller {
  getName(): string {
    return 'yarn';
  }
  getInstallCommand() {
    return { command: 'yarn', args: ['install'] };
  }
}
