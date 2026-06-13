import path from 'path';
import { replaceInFile } from '../../core/src/filesystem';

export const postApply = async (projectPath: string) => {
  const appPath = path.join(projectPath, 'src/app.ts');

  // Inject imports
  await replaceInFile(
    appPath,
    "import routes from '@/routes';",
    "import pinoHttp from 'pino-http';\nimport { logger } from '@/shared/logger/logger';\nimport routes from '@/routes';",
  );

  // Inject middleware
  await replaceInFile(
    appPath,
    "app.use(express.urlencoded({ extended: true }));",
    "app.use(express.urlencoded({ extended: true }));\napp.use(pinoHttp({ logger }));",
  );
};
