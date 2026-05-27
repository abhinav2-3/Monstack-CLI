# Template Strategy

## Folder Hierarchy

Templates are stored in `@monstack-cli/templates` and follow a strict hierarchical structure to allow for dynamic resolution without complex conditional logic.

```
packages/templates/
├── express/
│   ├── traditional/
│   │   ├── mongodb/
│   │   └── postgres/
│   └── modular/
│       ├── mongodb/
│       └── postgres/
```

## Variable Replacement Strategy

- **Engine**: EJS (Embedded JavaScript) is used for variable injection.
- **Scope**: All text-based files in the template directory are processed by EJS.
- **Delimiters**: Standard `<%= variable %>` tags.

## Placeholder Naming Conventions

All placeholders follow the **UPPERCASE_SNAKE_CASE** convention for consistency and easy identification within templates.

- `PROJECT_NAME`: The name of the generated project (e.g., "my-backend-app").
- `PORT`: The default port for the server (e.g., 3000).
- `PACKAGE_MANAGER`: The package manager to be used (e.g., "npm", "pnpm", "yarn").

## Template Metadata

Each template directory contains a `template.json` file that defines its characteristics.

```json
{
  "framework": "express",
  "architecture": "modular",
  "database": "mongodb",
  "templateVersion": "1.0.0"
}
```

## Template Discovery

The `@monstack-cli/templates` package maintains a `template-manifest.json` at its root. This allows the generator engine to dynamically discover available templates without hardcoded paths or complex conditional logic.

## Rendering Flow

1.  **Selection**: The generator identifies the template path from the manifest.
2.  **Context**: A context object is built using user prompts (e.g., `{ PROJECT_NAME: 'test-app', PORT: 3000, PACKAGE_MANAGER: 'npm' }`).
3.  **Processing**: Each file in the template directory is scanned.
4.  **EJS Rendering**: Files with `.ejs` extensions (or all text files, depending on configuration) are processed by EJS with the provided context.
5.  **Output**: Rendered files are written to the target project directory, with `.ejs` suffixes removed.
