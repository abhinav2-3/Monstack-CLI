# MonStack CLI Architecture

## Overview

MonStack CLI is a production-ready scaffolding tool for backend applications. It follows a modular monorepo structure to ensure scalability, maintainability, and clear separation of concerns.

## Package Responsibilities

### `@monstack-cli/cli`

- **Purpose**: User interface and interaction.
- **Responsibilities**:
  - Command-line argument parsing (Commander.js).
  - Interactive prompts (Prompts).
  - Terminal UX (Chalk, Ora, etc.).
  - Orchestrating the core generator.
- **Rules**: Must NEVER contain framework-specific generation logic.

### `@monstack-cli/core`

- **Purpose**: The engine of the generator.
- **Responsibilities**:
  - Validating and processing `GeneratorConfig`.
  - Template resolution logic.
  - Feature application lifecycle management.
  - File system operations (fs-extra).
  - Dependency installation (execa).
  - Variable replacement in templates (EJS).
- **Rules**: Must NEVER hardcode Express-specific logic.

### `@monstack-cli/templates`

- **Purpose**: Storage and organization of base framework templates.
- **Responsibilities**:
  - Providing production-ready boilerplate code.
  - Maintaining structure for different architectures (Traditional, Modular).
  - Maintaining structure for different databases (MongoDB, PostgreSQL).

### `@monstack-cli/features`

- **Purpose**: Modular extensions and optional plugins.
- **Responsibilities**:
  - Docker configuration.
  - Swagger/OpenAPI documentation.
  - Authentication modules.
  - Testing frameworks setup.
  - Redis integration.

## Generation Flow

1.  **User Runs CLI**: Entry point in `@monstack-cli/cli`.
2.  **Collect User Prompts**: CLI asks questions to build the configuration.
3.  **Create Generator Config**: A `GeneratorConfig` object is finalized.
4.  **Resolve Base Template**: Core identifies the correct template path based on framework, architecture, and database.
5.  **Copy Template Files**: Base files are copied to the destination.
6.  **Apply Features**: Selected features are applied iteratively.
7.  **Replace Variables**: EJS is used to inject variables into files.
8.  **Install Dependencies**: Automatic `npm install` (or equivalent).
9.  **Initialize Git**: New repository initialization.
10. **Project Ready**: Success message and next steps.

## Template Resolution Strategy

Templates are organized hierarchically:
`templates/<framework>/<architecture>/<database>/`

Example: `templates/express/modular/postgres/`

## Feature Strategy

Features are modular plugins that can:

- Add new files.
- Modify existing files (e.g., adding a middleware to `app.ts`).
- Add dependencies to `package.json`.
- Inject environment variables.

### Feature Application Lifecycle

1. `preApply`: Validation or preparation.
2. `apply`: File copying and modification.
3. `postApply`: Cleanup or specific configuration.

## Dependency Installation Strategy

- Detect preferred package manager or use user choice.
- Use `execa` to run installation commands in the generated project directory.
- Support for `npm`, `yarn`, and `pnpm`.

## Config Schema

The `GeneratorConfig` type is the single source of truth for the generation process.

```typescript
type GeneratorConfig = {
  projectName: string;
  framework: 'express';
  architecture: 'traditional' | 'modular';
  database: 'mongodb' | 'postgres';
  packageManager: 'npm' | 'pnpm' | 'yarn';
  features: string[];
};
```
