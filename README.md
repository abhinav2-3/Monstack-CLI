# my-npm-package

Monorepo npm package with CLI, core, templates, and features.

## Structure

```
packages/
├── cli/        → CLI binary (@my-package/cli)
├── core/       → Shared types, config, utils (@my-package/core)
├── templates/  → Template engine + registry (@my-package/templates)
└── features/   → Feature registry + base class (@my-package/features)
```

## Setup

```bash
npm install
npm run build
```

## CLI Usage

```bash
npx my-package init --name my-project
npx my-package generate <template> --name output
```

## Adding a Feature

1. Create `packages/features/src/my-feature.ts` extending `BaseFeature`
2. Export from `packages/features/src/index.ts`
3. Register via `registerFeature(new MyFeature(...))`

## Adding a Template

1. Create template object with `Template` type
2. Register via `registerTemplate(myTemplate)`

## Adding a CLI Command

1. Create `packages/cli/src/commands/my-command.ts`
2. Add to `registerCommands()` in `packages/cli/src/commands/index.ts`
