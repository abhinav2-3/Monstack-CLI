import path from 'path';
import { replaceInFile } from '@monstack-cli/core/src/filesystem';

export const postApply = async (projectPath: string) => {
  const appPath = path.join(projectPath, 'src/app.ts');
  
  // Inject imports
  await replaceInFile(
    appPath,
    "import routes from '@/routes';",
    "import routes from '@/routes';\nimport swaggerUi from 'swagger-ui-express';\nimport { swaggerSpec } from '@/config/swagger';"
  );

  // Inject middleware
  await replaceInFile(
    appPath,
    "app.use('/api/v1', routes);",
    "app.use('/api/v1', routes);\napp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));"
  );
};
