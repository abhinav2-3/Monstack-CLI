# Feature System

## Folder Structure

Features are located in `@monstack-cli/features`. Each feature is a self-contained module.

```
packages/features/
├── docker/
├── swagger/
├── auth/
├── testing/
└── redis/
```

## Feature Registration

Each feature must export a class or object implementing the `Feature` interface.

```typescript
export interface Feature {
  name: string;
  description: string;
  apply: (config: GeneratorConfig, projectPath: string) => Promise<void>;
}
```

## Feature Application Lifecycle

1.  **Resolution**: Core identifies which features were selected in `GeneratorConfig`.
2.  **Validation**: Core checks for feature conflicts or missing prerequisites.
3.  **Application**: Core calls the `apply` method for each selected feature sequentially.
4.  **Transformation**: Features can use utility methods provided by Core to:
    - `copyFiles(source, dest)`
    - `updatePackageJson(changes)`
    - `injectIntoFile(filePath, placeholder, content)`

## Dependency Injection Strategy

Features should not have direct dependencies on each other. If a feature depends on another, it should be validated during the **Validation** phase of the lifecycle.
