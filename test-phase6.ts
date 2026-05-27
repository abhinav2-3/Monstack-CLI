import { generateProject } from './packages/core/dist/index';
import path from 'path';
import fs from 'fs-extra';

const testConfig: any = {
  projectName: 'phase6-test-features-full',
  framework: 'express',
  architecture: 'modular',
  database: 'mongodb',
  packageManager: 'npm',
  features: ['docker', 'validation-zod', 'swagger']
};

async function test() {
  try {
    const targetDir = path.join(process.cwd(), testConfig.projectName);
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }
    
    await generateProject(testConfig);
    
    console.log('\n--- Feature Validation ---');
    
    // Check Docker files
    const dockerfile = await fs.pathExists(path.join(targetDir, 'Dockerfile'));
    console.log(`[${dockerfile ? 'OK' : 'FAIL'}] Dockerfile exists`);
    
    // Check Validation Zod files
    const validateMiddleware = await fs.pathExists(path.join(targetDir, 'src/shared/middlewares/validate.ts'));
    console.log(`[${validateMiddleware ? 'OK' : 'FAIL'}] validation middleware exists`);
    
    // Check Swagger files
    const swaggerConfig = await fs.pathExists(path.join(targetDir, 'src/config/swagger.ts'));
    console.log(`[${swaggerConfig ? 'OK' : 'FAIL'}] swagger config exists`);
    
    // Check Code Injection in app.ts
    const appContent = await fs.readFile(path.join(targetDir, 'src/app.ts'), 'utf-8');
    const hasSwaggerImport = appContent.includes("import swaggerUi from 'swagger-ui-express';");
    const hasSwaggerMiddleware = appContent.includes("app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));");
    console.log(`[${hasSwaggerImport ? 'OK' : 'FAIL'}] swagger imports injected into app.ts`);
    console.log(`[${hasSwaggerMiddleware ? 'OK' : 'FAIL'}] swagger middleware injected into app.ts`);
    
    // Check Dependencies in package.json
    const pkg = await fs.readJson(path.join(targetDir, 'package.json'));
    const zodExists = pkg.dependencies && pkg.dependencies.zod;
    const swaggerExists = pkg.dependencies && pkg.dependencies['swagger-ui-express'];
    console.log(`[${zodExists ? 'OK' : 'FAIL'}] zod dependency injected`);
    console.log(`[${swaggerExists ? 'OK' : 'FAIL'}] swagger dependency injected`);

  } catch (err) {
    console.error('Test failed:', err);
  }
}

test();
