# PHASE 9 — Feature Registry System

## Objective

Introduce a composable Feature Registry System that allows Monstack CLI to add optional capabilities such as Swagger, Docker, Authentication, Logger, and future features without polluting the generator engine with conditionals.

The goal of this phase is to transform features into independent modules that can be plugged into any framework, architecture, or database combination.

---

# Problem

Current generation flow may eventually become:

```ts
if (config.swagger) {
  // generate swagger files
}

if (config.docker) {
  // generate docker files
}

if (config.auth) {
  // generate auth files
}
```

As features increase, the generator becomes difficult to maintain.

This phase solves that problem.

---

# Design Principle

Generator Core should never know feature details.

Generator should only know:

```txt
Apply selected features
```

Feature implementation should live inside feature modules.

---

# Target Architecture

```txt
packages/
│
├── core/
│
├── templates/
│
├── features/
│   │
│   ├── swagger/
│   │
│   ├── docker/
│   │
│   ├── logger/
│   │
│   ├── auth/
│   │
│   └── health/
```

---

# Feature Module Structure

Every feature should be self-contained.

Example:

```txt
features/
└── swagger/
    │
    ├── files/
    │
    ├── dependencies.ts
    │
    ├── hooks.ts
    │
    └── index.ts
```

---

# Feature Interface

Create a common contract.

```ts
export interface Feature {
  name: string;

  apply(config: GeneratorConfig): Promise<void>;
}
```

All features must implement this interface.

---

# Feature Registry

Create:

```txt
packages/core/src/features/
```

Example:

```ts
export const featureRegistry = {
  swagger,
  docker,
  logger,
  auth,
};
```

---

# Generator Flow Update

Current:

```txt
Resolve Template
Copy Files
Install Dependencies
```

New:

```txt
Resolve Template
Copy Base Template
Apply Features
Install Dependencies
```

---

# Feature Application Flow

Example:

```ts
for (const feature of selectedFeatures) {
  await applyFeature(feature);
}
```

Generator should not know what Swagger or Docker is.

It only knows:

```txt
Apply registered feature
```

---

# Feature Resolver

Create:

```txt
packages/core/src/features/resolver.ts
```

Example:

```ts
const selectedFeatures = [];

if (config.swagger) {
  selectedFeatures.push('swagger');
}

if (config.docker) {
  selectedFeatures.push('docker');
}
```

Then:

```ts
featureRegistry[featureName];
```

---

# Swagger Feature

Move all Swagger generation logic into:

```txt
features/swagger/
```

Responsibilities:

```txt
OpenAPI setup
Swagger route
Swagger dependencies
Swagger configuration
```

Files:

```txt
swagger.ts
swagger.config.ts
```

Dependencies:

```bash
swagger-ui-express
swagger-jsdoc
```

---

# Docker Feature

Move Docker generation into:

```txt
features/docker/
```

Responsibilities:

```txt
Dockerfile
docker-compose.yml
.dockerignore
```

Dependencies:

```txt
None
```

---

# Logger Feature

Create dedicated logger feature.

```txt
features/logger/
```

Responsibilities:

```txt
Pino setup
Request logging
Pretty logs
Production transport
```

Dependencies:

```bash
pino
pino-http
pino-pretty
```

Generated:

```txt
src/shared/logger/
```

---

# Health Feature

Create reusable health feature.

```txt
features/health/
```

Responsibilities:

```txt
GET /health
Database status
Uptime
```

Generated:

```txt
src/modules/health/
```

or

```txt
src/routes/health.ts
```

depending on architecture.

---

# Authentication Feature

Phase 9 only prepares the system.

Implementation can be added later.

Feature placeholder:

```txt
features/auth/
```

No generation required yet.

---

# Feature Assets

Each feature should support:

```txt
Files
Dependencies
Dev Dependencies
Post Generation Hooks
```

Example:

```ts
export const swaggerFeature = {
  files: [...],

  dependencies: [...],

  devDependencies: [...],

  hooks: [...]
};
```

---

# Dependency Aggregation

Current installer:

```ts
installDependencies();
```

New flow:

Collect dependencies from:

```txt
Base Template
+
Selected Features
```

Example:

```ts
const dependencies = [...baseDependencies, ...featureDependencies];
```

Remove duplicates automatically.

---

# File Injection Strategy

Features should not modify template files manually.

Instead provide assets.

Example:

```txt
features/swagger/files/
```

Generator copies them automatically.

---

# Feature Hooks

Support lifecycle hooks.

Example:

```ts
beforeGenerate();
afterGenerate();
beforeInstall();
afterInstall();
```

Use cases:

```txt
Create config
Patch files
Run generators
Print instructions
```

---

# Future Features Enabled By This System

Once registry exists, adding features becomes easy.

Examples:

```txt
JWT Authentication
Redis
BullMQ
WebSockets
GraphQL
OpenTelemetry
RBAC
Mail Service
AWS S3
Cloudinary
Kafka
RabbitMQ
```

Each becomes:

```txt
features/
└── feature-name/
```

without touching generator core.

---

# CLI Updates

Prompt system should continue generating:

```ts
{
  swagger: true,
  docker: true
}
```

Generator converts these into:

```ts
['swagger', 'docker'];
```

before execution.

---

# Acceptance Criteria

## Generator

✓ No feature-specific conditionals inside generator core

✓ Features resolved through registry

✓ Features applied dynamically

---

## Swagger

✓ Generated through feature module

✓ Dependencies installed

✓ Routes registered

---

## Docker

✓ Generated through feature module

✓ Dockerfile created

✓ Compose file created

---

## Dependency Management

✓ Dependencies merged

✓ Duplicates removed

✓ Install process unchanged

---

## Architecture

✓ Framework agnostic

✓ Database agnostic

✓ Extensible

✓ Composable

✓ Easy future feature additions

---

# Deliverables

```txt
packages/features/

├── swagger/
├── docker/
├── logger/
├── health/
├── auth/
```

```txt
packages/core/src/features/

├── registry.ts
├── resolver.ts
├── apply-features.ts
```

Feature Registry becomes the foundation for every future optional capability in Monstack CLI.
