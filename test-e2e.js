// const { generateProject } = require('./packages/core/dist/index.js');
// const path = require('path');
// const fs = require('fs-extra');
// const os = require('os');

// async function testGeneration() {
//   console.log('🧪 Testing Phase 6 & 7 Implementation\n');

//   const testDir = path.join(os.tmpdir(), 'monstack-tests-' + Date.now());
//   await fs.ensureDir(testDir);

//   const testCases = [
//     {
//       name: 'Modular + MongoDB + Validation',
//       config: {
//         projectName: 'test-modular-basic',
//         framework: 'express',
//         architecture: 'modular',
//         database: 'mongodb',
//         packageManager: 'npm',
//         features: ['validation-zod'],
//       },
//     },
//     {
//       name: 'Traditional + MongoDB + Docker',
//       config: {
//         projectName: 'test-traditional-docker',
//         framework: 'express',
//         architecture: 'traditional',
//         database: 'mongodb',
//         packageManager: 'npm',
//         features: ['docker'],
//       },
//     },
//   ];

//   for (const testCase of testCases) {
//     try {
//       console.log(`\n📦 Testing: ${testCase.name}`);
//       process.chdir(testDir);
//       await generateProject(testCase.config);

//       const projectPath = path.join(testDir, testCase.config.projectName);

//       // Verify project structure
//       const hasPackageJson = await fs.pathExists(
//         path.join(projectPath, 'package.json'),
//       );
//       const hasSrc = await fs.pathExists(path.join(projectPath, 'src'));
//       const hasApp = await fs.pathExists(path.join(projectPath, 'src/app.ts'));

//       if (hasPackageJson && hasSrc && hasApp) {
//         console.log(`✅ ${testCase.name} - Project structure valid`);

//         // Check for feature files
//         for (const feature of testCase.config.features) {
//           if (feature === 'validation-zod') {
//             const hasValidationMiddleware = await fs.pathExists(
//               path.join(projectPath, 'src/shared/middlewares/validate.ts'),
//             );
//             console.log(
//               `  ${hasValidationMiddleware ? '✅' : '❌'} Validation middleware injected`,
//             );
//           }
//           if (feature === 'docker') {
//             const hasDockerfile = await fs.pathExists(
//               path.join(projectPath, 'Dockerfile'),
//             );
//             console.log(`  ${hasDockerfile ? '✅' : '❌'} Dockerfile injected`);
//           }
//         }
//       } else {
//         console.log(`❌ ${testCase.name} - Project structure incomplete`);
//       }
//     } catch (error) {
//       console.error(`❌ ${testCase.name} - Error: ${error.message}`);
//     }
//   }

//   console.log('\n✨ Test generation completed!');
//   console.log(`Test artifacts in: ${testDir}`);
// }

// testGeneration().catch(console.error);
