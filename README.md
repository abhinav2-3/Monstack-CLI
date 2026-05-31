<div align="center">

<img src="https://img.shields.io/badge/MonStack_CLI-v0.1.0-6366f1?style=for-the-badge" alt="version" />
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="node" />
<img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
<img src="https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge" alt="license" />

# MonStack CLI

**Production-ready backend scaffolding in one command.**  
Choose your framework, architecture, database, and features — MonStack generates a fully wired, deployment-ready project instantly.

[Getting Started](#getting-started) · [Supported Stack](#supported-stack) · [Architecture](#architecture) · [Adding a Framework](#adding-a-new-framework) · [Contributing](#contributing)

</div>

---

## What is MonStack CLI?

MonStack CLI is a modular scaffolding engine for backend applications. Instead of copy-pasting boilerplate or maintaining internal starter repos, you run one command and get a production-grade project structure wired with your chosen stack — including auth, Docker, Swagger, Redis, and testing — ready to ship.

```bash
npx monstack-cli init
```

---

## Getting Started

### Requirements

- Node.js 18+
- npm / pnpm / yarn

### Install

```bash
# Run directly (recommended)
npx monstack-cli init

# Or install globally
npm install -g monstack-cli
monstack init
```

### Usage

```bash
monstack init
```

The CLI will interactively prompt you to configure your project:

```
? Project name:           my-api
? Framework:              Express.js
? Architecture:           Modular
? Database:               PostgreSQL
? Package manager:        pnpm
? Features:               Docker, Swagger, Auth, Redis, Testing
```

Your project is generated, dependencies installed, and git initialized — all automatically.

---

## Supported Stack

### Frameworks

| Framework  | Status     |
| ---------- | ---------- |
| Express.js | ✅ Stable  |
| Fastify    | 🔜 Planned |
| Hono       | 🔜 Planned |
| NestJS     | 🔜 Planned |

### Architectures

| Architecture  | Description                                          |
| ------------- | ---------------------------------------------------- |
| `traditional` | Single `app.ts` entry, flat routes folder            |
| `modular`     | Feature-based folder structure with isolated modules |

### Databases

| Database   | ORM / Driver | Status     |
| ---------- | ------------ | ---------- |
| MongoDB    | Mongoose     | ✅ Stable  |
| PostgreSQL | Prisma       | ✅ Stable  |
| MySQL      | Prisma       | 🔜 Planned |
| SQLite     | Prisma       | 🔜 Planned |

### Optional Features

| Feature   | What it adds                                        |
| --------- | --------------------------------------------------- |
| `docker`  | `Dockerfile`, `docker-compose.yml`, `.dockerignore` |
| `swagger` | OpenAPI spec, Swagger UI at `/api/docs`             |
| `auth`    | JWT auth middleware, login/register routes, bcrypt  |
| `redis`   | Redis client setup, session/cache utility wrappers  |
| `testing` | Jest + Supertest config, example test per route     |

---

## Generated Project Structure

**Modular + PostgreSQL + all features:**

```
my-api/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.middleware.ts
│   │   └── user/
│   │       ├── user.routes.ts
│   │       ├── user.controller.ts
│   │       └── user.service.ts
│   ├── config/
│   │   ├── db.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── utils/
│   │   └── logger.ts
│   └── app.ts
├── prisma/
│   └── schema.prisma
├── tests/
│   └── auth.test.ts
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Architecture

MonStack is a **modular monorepo**. Each package has one responsibility and strict boundaries.

```
monstack-cli/
├── packages/
│   ├── cli/          # User interaction layer
│   ├── core/         # Generation engine
│   ├── templates/    # Framework boilerplate
│   └── features/     # Optional feature plugins
```

### Package Responsibilities

**`@monstack-cli/cli`** — User interface only.
Handles argument parsing (Commander.js), interactive prompts (Prompts), and terminal UX (Chalk, Ora). Calls into `@monstack-cli/core` with a finalized `GeneratorConfig`. Never contains framework-specific logic.

**`@monstack-cli/core`** — The generation engine.
Validates `GeneratorConfig`, resolves the correct template path, copies files, runs EJS variable injection, applies features in lifecycle order, installs dependencies via `execa`, and initializes git. Never hardcodes framework-specific logic.

**`@monstack-cli/templates`** — Boilerplate storage.
Organized hierarchically by framework → architecture → database. Each template is a complete, working project. Adding a new framework means adding a new folder here.

**`@monstack-cli/features`** — Optional plugin system.
Each feature is a self-contained module with a defined lifecycle. Features can add files, modify existing files, inject dependencies into `package.json`, and add environment variables.

### Generation Flow

```
User runs CLI
     │
     ▼
Collect prompts → GeneratorConfig
     │
     ▼
Resolve template path
templates/<framework>/<architecture>/<database>/
     │
     ▼
Copy base template files to destination
     │
     ▼
Apply selected features (preApply → apply → postApply)
     │
     ▼
EJS variable injection
     │
     ▼
npm / pnpm / yarn install
     │
     ▼
git init
     │
     ▼
✅ Project ready
```

### Template Resolution

Templates follow a strict path convention:

```
templates/
└── express/
    ├── traditional/
    │   ├── mongodb/
    │   └── postgres/
    └── modular/
        ├── mongodb/
        └── postgres/
```

When Fastify or Hono support is added, a new top-level folder is added — nothing else changes.

### Feature Lifecycle

Each feature implements three hooks:

```typescript
interface Feature {
  preApply(config: GeneratorConfig, destPath: string): Promise<void>;
  apply(config: GeneratorConfig, destPath: string): Promise<void>;
  postApply(config: GeneratorConfig, destPath: string): Promise<void>;
}
```

| Hook        | Purpose                                            |
| ----------- | -------------------------------------------------- |
| `preApply`  | Validation, path checks, preparation               |
| `apply`     | File copying, package.json mutation, env injection |
| `postApply` | Cleanup, format, feature-specific config           |

---

## Config Schema

`GeneratorConfig` is the single source of truth passed from CLI to core to features:

```typescript
type GeneratorConfig = {
  projectName: string;
  framework: 'express'; // expand as frameworks are added
  architecture: 'traditional' | 'modular';
  database: 'mongodb' | 'postgres';
  packageManager: 'npm' | 'pnpm' | 'yarn';
  features: ('docker' | 'swagger' | 'auth' | 'redis' | 'testing')[];
};
```

---

## Adding a New Framework

MonStack is designed so adding framework support never touches existing code.

**Step 1 — Add templates**

```
packages/templates/src/
└── <framework>/
    ├── traditional/
    │   ├── mongodb/
    │   └── postgres/
    └── modular/
        ├── mongodb/
        └── postgres/
```

Each folder must contain a complete, working project using EJS variables for `projectName`, `database`, and `packageManager`.

**Step 2 — Extend the config type**

```typescript
// packages/core/src/types.ts
type GeneratorConfig = {
  framework: 'express' | 'fastify' | 'hono'; // add here
  ...
};
```

**Step 3 — Add CLI prompt option**

```typescript
// packages/cli/src/prompts.ts
{
  type: 'select',
  name: 'framework',
  message: 'Framework:',
  choices: [
    { title: 'Express.js', value: 'express' },
    { title: 'Fastify',    value: 'fastify' }, // add here
    { title: 'Hono',       value: 'hono' },
  ]
}
```

**Step 4 — Update this README** — add a row to the Frameworks table.

No changes to `@monstack-cli/core` or `@monstack-cli/features` required.

---

## Adding a New Feature

**Step 1 — Create the feature module**

```
packages/features/src/
└── <feature-name>/
    ├── index.ts          # implements Feature interface
    ├── files/            # static files to copy
    └── templates/        # EJS templates if needed
```

**Step 2 — Implement the Feature interface**

```typescript
import { Feature, GeneratorConfig } from '@monstack-cli/core';

export const myFeature: Feature = {
  async preApply(config, dest) {
    // validate or prepare
  },
  async apply(config, dest) {
    // copy files, mutate package.json, inject env vars
  },
  async postApply(config, dest) {
    // cleanup or finalize
  },
};
```

**Step 3 — Register the feature**

```typescript
// packages/features/src/index.ts
export { myFeature } from './my-feature';
```

**Step 4 — Add CLI prompt option and update the features table in this README.**

---

## Contributing

Contributions are welcome — especially new framework templates and features.

1. Fork the repo
2. Create a branch: `git checkout -b feat/fastify-template`
3. Follow the guides above for adding frameworks or features
4. Open a PR with a description of what was added and why

Please keep PRs focused — one framework or one feature per PR.

---

## Roadmap

- [ ] Fastify template support
- [ ] Hono template support
- [ ] MySQL / SQLite database support
- [ ] NestJS template support
- [ ] `monstack add <feature>` command for existing projects
- [ ] Config file support (`monstack.config.ts`)
- [ ] GitHub Actions CI template as a feature

---

## License

MIT © [Abhinav Maurya](https://github.com/abhinav2-3/)
