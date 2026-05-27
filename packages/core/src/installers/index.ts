import { Installer } from './base';
import { NpmInstaller, PnpmInstaller, YarnInstaller } from './implementations';
import { PackageManager } from '@/types';

export const resolveInstaller = (packageManager: PackageManager): Installer => {
  switch (packageManager) {
    case 'npm':
      return new NpmInstaller();
    case 'pnpm':
      return new PnpmInstaller();
    case 'yarn':
      return new YarnInstaller();
    default:
      return new NpmInstaller();
  }
};
