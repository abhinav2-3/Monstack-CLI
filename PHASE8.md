# PHASE 8 — PostgreSQL Support

## Objective

Add first-class PostgreSQL support to Monstack CLI while keeping the generator engine framework-agnostic and template-driven.

This phase should allow users to generate production-ready PostgreSQL applications using Prisma ORM.

---

# Expected User Experience

```bash
npx create-monstack-api
```

Interactive setup:

```bash
? Project Name → my-api
? Framework → Express
? Architecture → Traditional / Modular Monolith
? Database → PostgreSQL
? ORM → Prisma
? Enable Docker → Yes
? Enable Swagger → Yes
```

Generated project should be fully runnable after:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

---

# Goals

## Add PostgreSQL Support

Supported combination:

```txt
Database: PostgreSQL
ORM: Prisma
```

---

## Maintain Architecture Principles

The generator engine must not contain PostgreSQL-specific logic.

Database implementation must live inside templates and feature modules.

Generator responsibilities remain:

```txt
- Resolve template
- Copy files
- Replace variables
- Apply features
- Install dependencies
```

---

# Template Structure

Current:

```txt
templates/
└── express/
```

Add:

```txt
templates/
└── express/
    ├── traditional/
    │   ├── mongodb/
    │   └── postgres/
    │
    └── modular/
        ├── mongodb/
        └── postgres/
```

---

# Template Resolution

Current resolver should already support dynamic lookup:

```ts
const templatePath = path.join(framework, architecture, database);
```

Expected result:

```txt
express/traditional/postgres
express/modular/postgres
```

No conditional branching should be introduced.

Avoid:

```ts
if (database === "postgres") {
 ...
}
```

---

# PostgreSQL Template Requirements

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/app_db

PORT=5000
NODE_ENV=development
```

---

## Prisma Setup

Directory:

```txt
prisma/
└── schema.prisma
```

Example schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

# Database Layer

Create:

```txt
src/
└── config/
    └── prisma.ts
```

Example:

```ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
```

---

# Graceful Shutdown Support

Existing shutdown handlers should close Prisma connections.

Example:

```ts
await prisma.$disconnect();
```

Should integrate with:

```txt
SIGINT
SIGTERM
uncaughtException
unhandledRejection
```

---

# Dependency Installation

Generated PostgreSQL project should include:

## Runtime

```bash
@prisma/client
```

## Development

```bash
prisma
```

---

# Package Scripts

Generated package.json:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup",
    "start": "node dist/server.js",

    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

---

# Docker Support

When Docker feature is enabled:

Add PostgreSQL service.

Example:

```yaml
services:
  postgres:
    image: postgres:17

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app_db

    ports:
      - '5432:5432'

    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

---

# Health Check Integration

Health endpoint should verify:

```txt
Application Status
Database Status
```

Example:

```json
{
  "status": "ok",
  "database": "connected"
}
```

Implementation may use:

```ts
await prisma.$queryRaw`SELECT 1`;
```

---

# Traditional Architecture Template

Structure:

```txt
src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── config/
│   └── prisma.ts
├── app.ts
└── server.ts

prisma/
└── schema.prisma
```

---

# Modular Monolith Template

Structure:

```txt
src/
├── modules/
│   ├── user/
│   └── auth/
│
├── infrastructure/
│   └── database/
│       └── prisma.ts
│
├── shared/
├── config/
└── server.ts

prisma/
└── schema.prisma
```

---

# Prisma Repository Pattern

Avoid direct Prisma usage inside controllers.

Preferred flow:

```txt
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
```

Example:

```txt
modules/
└── user/
    ├── user.controller.ts
    ├── user.service.ts
    ├── user.repository.ts
```

---

# Feature Compatibility

The following features must work without modification:

```txt
✓ Swagger
✓ Docker
✓ Logger
✓ Error Handling
✓ Security Middleware
✓ Health Checks
✓ Env Validation
✓ Graceful Shutdown
```

Feature system should remain:

```txt
applyFeatures(config);
```

No PostgreSQL-specific feature coupling.

---

# Generator Validation

Prompt validation:

```txt
PostgreSQL → Prisma only
MongoDB → Mongoose only
```

Allowed combinations:

```txt
MongoDB + Mongoose
PostgreSQL + Prisma
```

Disallow invalid combinations.

Example:

```txt
PostgreSQL + Mongoose ❌
MongoDB + Prisma ❌
```

---

# Acceptance Criteria

## Generator

- PostgreSQL templates resolve correctly.
- No PostgreSQL logic added to generator core.
- Existing MongoDB generation remains unchanged.

## Generated Project

- Installs successfully.
- Prisma client generates successfully.
- Migration runs successfully.
- Application starts successfully.
- Health endpoint returns database status.
- Graceful shutdown disconnects Prisma.

## Architecture

- Template-driven.
- Feature-driven.
- Framework-agnostic.
- No database conditionals inside generator engine.

---

# Deliverables

## Templates

```txt
express/traditional/postgres
express/modular/postgres
```

## Prisma

```txt
prisma/schema.prisma
src/config/prisma.ts
```

## Docker

```txt
docker-compose.yml
```

with PostgreSQL service support.

## Generator Updates

```txt
Prompt validation
Dependency mapping
Database template resolution
```

## Documentation

Add PostgreSQL setup guide covering:

```txt
- Install PostgreSQL
- Configure DATABASE_URL
- Run Prisma Generate
- Run Prisma Migration
- Start Application
```
