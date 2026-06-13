import path from 'path';
import { replaceInFile } from '../../core/src/filesystem';
import { GeneratorConfig } from '../../core/src/types';

export const postApply = async (projectPath: string, config: GeneratorConfig) => {
  const isModular = config.architecture === 'modular';
  const routesPath = isModular 
    ? path.join(projectPath, 'src/routes.ts')
    : path.join(projectPath, 'src/routes/index.ts');

  const importPath = isModular
    ? '@/modules/health/health.routes'
    : '../modules/health/health.routes';

  // Inject import
  await replaceInFile(
    routesPath,
    "import { Router } from 'express';",
    `import { Router } from 'express';\nimport healthRoutes from '${importPath}';`,
  );

  // Inject route
  if (isModular) {
    await replaceInFile(
      routesPath,
      "const router = Router();",
      "const router = Router();\n\nrouter.use('/health', healthRoutes);",
    );
  } else {
    // For traditional, it might be different. Let's check src/routes/index.ts in traditional
    await replaceInFile(
      routesPath,
      "const router = Router();",
      "const router = Router();\n\nrouter.use('/health', healthRoutes);",
    );
  }
};
