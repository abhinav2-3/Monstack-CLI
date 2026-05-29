// import path from 'path';
// import fs from 'fs-extra';

// // Test 1: Test Feature Registry
// async function testFeatureRegistry() {
//   console.log('\n=== Testing Feature Registry ===');
//   try {
//     const { getFeatureRegistry } = await import('./packages/core/dist/index');
//     const registry = await getFeatureRegistry();

//     // Test feature discovery
//     const allFeatures = registry.getAllFeatures();
//     console.log(`[OK] Discovered ${allFeatures.length} features`);

//     // Test individual feature retrieval
//     const validationZod = registry.getFeature('validation-zod');
//     console.log(
//       `[${validationZod ? 'OK' : 'FAIL'}] validation-zod feature found`,
//     );

//     const swagger = registry.getFeature('swagger');
//     console.log(`[${swagger ? 'OK' : 'FAIL'}] swagger feature found`);

//     const docker = registry.getFeature('docker');
//     console.log(`[${docker ? 'OK' : 'FAIL'}] docker feature found`);

//     // Test feature filtering by architecture
//     const traditionalFeatures =
//       registry.getFeaturesByArchitecture('traditional');
//     console.log(
//       `[OK] Found ${traditionalFeatures.length} features supporting traditional architecture`,
//     );

//     const modularFeatures = registry.getFeaturesByArchitecture('modular');
//     console.log(
//       `[OK] Found ${modularFeatures.length} features supporting modular architecture`,
//     );

//     // Test compatibility check
//     const compatible = registry.getCompatibleFeatures(
//       'express',
//       'traditional',
//       'mongodb',
//     );
//     console.log(
//       `[OK] Found ${compatible.length} features compatible with express/traditional/mongodb`,
//     );

//     // Test validation
//     const validation = registry.validateFeatures(
//       ['validation-zod', 'swagger', 'docker'],
//       'express',
//       'traditional',
//       'mongodb',
//     );
//     console.log(
//       `[${validation.valid ? 'OK' : 'FAIL'}] Feature validation for traditional architecture: ${validation.valid}`,
//     );
//     if (!validation.valid) {
//       validation.errors.forEach((err) => console.log(`  Error: ${err}`));
//     }
//   } catch (error) {
//     console.error('[FAIL] Feature Registry test failed:', error);
//   }
// }

// // Test 2: Test Compatibility Validator
// async function testCompatibilityValidator() {
//   console.log('\n=== Testing Compatibility Validator ===');
//   try {
//     const { createCompatibilityValidator } =
//       await import('./packages/core/dist/index');
//     const validator = await createCompatibilityValidator();

//     // Test traditional architecture compatibility
//     const traditionalConfig = {
//       projectName: 'test-traditional',
//       framework: 'express' as const,
//       architecture: 'traditional' as const,
//       database: 'mongodb' as const,
//       packageManager: 'npm' as const,
//       features: ['validation-zod', 'swagger'],
//     };

//     const result = validator.checkAllFeaturesCompatibility(
//       ['validation-zod', 'swagger'],
//       traditionalConfig,
//     );
//     console.log(
//       `[${result.valid ? 'OK' : 'FAIL'}] validation-zod and swagger compatible with traditional architecture`,
//     );
//     if (!result.valid) {
//       result.errors.forEach((err) => console.log(`  Error: ${err}`));
//     }

//     // Test modular architecture compatibility
//     const modularConfig = {
//       ...traditionalConfig,
//       architecture: 'modular' as const,
//     };

//     const modularResult = validator.checkAllFeaturesCompatibility(
//       ['validation-zod', 'swagger', 'docker'],
//       modularConfig,
//     );
//     console.log(
//       `[${modularResult.valid ? 'OK' : 'FAIL'}] All features compatible with modular architecture`,
//     );

//     // Test compatible features retrieval
//     const compatibleFeatures =
//       validator.getCompatibleFeatures(traditionalConfig);
//     console.log(
//       `[OK] Found ${compatibleFeatures.length} compatible features for traditional architecture`,
//     );
//   } catch (error) {
//     console.error('[FAIL] Compatibility Validator test failed:', error);
//   }
// }

// // Test 3: Test Traditional Template Generation
// async function testTraditionalTemplateGeneration() {
//   console.log('\n=== Testing Traditional Template Generation ===');
//   try {
//     const { generateProject } = await import('./packages/core/dist/index');

//     const testConfig = {
//       projectName: 'phase6-test-traditional',
//       framework: 'express' as const,
//       architecture: 'traditional' as const,
//       database: 'mongodb' as const,
//       packageManager: 'npm' as const,
//       features: ['docker', 'validation-zod'],
//     };

//     const targetDir = path.join(process.cwd(), testConfig.projectName);
//     if (await fs.pathExists(targetDir)) {
//       await fs.remove(targetDir);
//     }

//     await generateProject(testConfig);

//     // Verify traditional structure was created
//     const hasRoutes = await fs.pathExists(path.join(targetDir, 'src/routes'));
//     const hasControllers = await fs.pathExists(
//       path.join(targetDir, 'src/controllers'),
//     );
//     const hasServices = await fs.pathExists(
//       path.join(targetDir, 'src/services'),
//     );
//     const hasModels = await fs.pathExists(path.join(targetDir, 'src/models'));
//     const hasMiddlewares = await fs.pathExists(
//       path.join(targetDir, 'src/middlewares'),
//     );

//     console.log(`[${hasRoutes ? 'OK' : 'FAIL'}] routes/ directory exists`);
//     console.log(
//       `[${hasControllers ? 'OK' : 'FAIL'}] controllers/ directory exists`,
//     );
//     console.log(`[${hasServices ? 'OK' : 'FAIL'}] services/ directory exists`);
//     console.log(`[${hasModels ? 'OK' : 'FAIL'}] models/ directory exists`);
//     console.log(
//       `[${hasMiddlewares ? 'OK' : 'FAIL'}] middlewares/ directory exists`,
//     );

//     // Verify health endpoint
//     const healthController = await fs.pathExists(
//       path.join(targetDir, 'src/controllers/health.controller.ts'),
//     );
//     const healthRoutes = await fs.pathExists(
//       path.join(targetDir, 'src/routes/health.routes.ts'),
//     );
//     const healthService = await fs.pathExists(
//       path.join(targetDir, 'src/services/health.service.ts'),
//     );

//     console.log(
//       `[${healthController ? 'OK' : 'FAIL'}] health controller exists`,
//     );
//     console.log(`[${healthRoutes ? 'OK' : 'FAIL'}] health routes exist`);
//     console.log(`[${healthService ? 'OK' : 'FAIL'}] health service exists`);

//     // Verify feature files were applied
//     const validateMiddleware = await fs.pathExists(
//       path.join(targetDir, 'src/shared/middlewares/validate.ts'),
//     );
//     const dockerfile = await fs.pathExists(path.join(targetDir, 'Dockerfile'));

//     console.log(
//       `[${validateMiddleware ? 'OK' : 'FAIL'}] validation-zod feature applied`,
//     );
//     console.log(`[${dockerfile ? 'OK' : 'FAIL'}] docker feature applied`);

//     // Verify template.json content
//     const templateJson = await fs.readJson(
//       path.join(targetDir, 'template.json'),
//     );
//     console.log(
//       `[${templateJson.architecture === 'traditional' ? 'OK' : 'FAIL'}] template.json shows traditional architecture`,
//     );
//   } catch (error) {
//     console.error('[FAIL] Traditional Template Generation test failed:', error);
//   }
// }

// // Test 4: Test Modular Template Generation (Backward Compatibility)
// async function testModularTemplateGeneration() {
//   console.log(
//     '\n=== Testing Modular Template Generation (Backward Compatibility) ===',
//   );
//   try {
//     const { generateProject } = await import('./packages/core/dist/index');

//     const testConfig = {
//       projectName: 'phase6-test-modular',
//       framework: 'express' as const,
//       architecture: 'modular' as const,
//       database: 'mongodb' as const,
//       packageManager: 'npm' as const,
//       features: ['validation-zod'],
//     };

//     const targetDir = path.join(process.cwd(), testConfig.projectName);
//     if (await fs.pathExists(targetDir)) {
//       await fs.remove(targetDir);
//     }

//     await generateProject(testConfig);

//     // Verify modular structure was created
//     const hasModules = await fs.pathExists(path.join(targetDir, 'src/modules'));
//     const hasInfrastructure = await fs.pathExists(
//       path.join(targetDir, 'src/infrastructure'),
//     );

//     console.log(`[${hasModules ? 'OK' : 'FAIL'}] modules/ directory exists`);
//     console.log(
//       `[${hasInfrastructure ? 'OK' : 'FAIL'}] infrastructure/ directory exists`,
//     );

//     // Verify template.json content
//     const templateJson = await fs.readJson(
//       path.join(targetDir, 'template.json'),
//     );
//     console.log(
//       `[${templateJson.architecture === 'modular' ? 'OK' : 'FAIL'}] template.json shows modular architecture`,
//     );
//   } catch (error) {
//     console.error('[FAIL] Modular Template Generation test failed:', error);
//   }
// }

// // Run all tests
// async function runAllTests() {
//   console.log('=== Phase 6 & 7 Feature System Tests ===');
//   await testFeatureRegistry();
//   await testCompatibilityValidator();
//   await testTraditionalTemplateGeneration();
//   await testModularTemplateGeneration();
//   console.log('\n=== Tests Complete ===');
// }

// runAllTests().catch((err) => console.error('Test suite failed:', err));
