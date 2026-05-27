# Phase 1 — Build The Golden Express Template

## Phase Overview

This phase focuses on building the first production-grade backend template manually.

This template becomes the foundation for the entire scaffolding ecosystem.

The goal is NOT to build the CLI yet.

The goal is to build one high-quality, scalable, production-ready backend architecture that will later be converted into reusable templates.

This template will become:

```txt
Express + TypeScript + Modular Monolith + MongoDB
```

This is the "Golden Template".

All future generators, architectures, and framework support will evolve from this structure.

---

# Current Phase Goal

Build a fully working production-ready backend application manually.

The application must include:

- scalable architecture
- production-grade structure
- security setup
- logger
- env validation
- graceful shutdown
- centralized error handling
- database setup
- DX tooling
- deployment readiness

This phase should produce a backend project that can realistically be used in production.

---

# Architecture Scope

This phase ONLY implements:

- Express
- TypeScript
- Modular Monolith Architecture
- MongoDB

Traditional architecture support will be added in a later phase after the template and generator systems stabilize.

---

# Phase Scope Clarification

This phase builds only the core backend architecture.

Optional systems such as:

- validation
- swagger
- docker
- authentication
- redis
- testing

will be implemented later through the modular feature system.

The base template should remain framework-clean and minimal.

---

# Feature Compatibility Requirement

The architecture built in this phase must support future feature injection without major restructuring.

Future systems like validation, swagger, docker, auth, and testing will later be attached through the feature engine.

---

# Important Rules

## Rule 1

Do NOT build generator logic in this phase.

---

## Rule 2

Do NOT build CLI logic in this phase.

---

## Rule 3

Do NOT build template resolution systems.

---

## Rule 4

Focus ONLY on backend architecture quality.

---

## Rule 5

This project must feel like a real production backend, not a tutorial project.

---

## Rule 6

Keep the base architecture minimal and composable.

Do NOT tightly couple optional features into the base backend structure.

---

# Tech Stack

## Runtime

- Node.js

## Language

- TypeScript

## Framework

- Express.js

## Database

- MongoDB

## ODM

- Mongoose

---

# Core Dependencies

## Server

- express
- dotenv

## Database

- mongoose

## Logging

- pino
- pino-http
- pino-pretty

## Security

- helmet
- cors
- compression
- express-rate-limit

## Utilities

- http-status-codes

---

# Dev Dependencies

- typescript
- tsx
- eslint
- prettier
- husky
- lint-staged
- @types/node
- @types/express

---

# Final Architecture

The backend must follow this structure:

```txt
src/
│
├── modules/
│   ├── health/
│
├── shared/
│   ├── errors/
│   ├── logger/
│   ├── middlewares/
│   ├── utils/
│   ├── types/
│
├── infrastructure/
│   ├── database/
│
├── config/
│
├── app.ts
├── server.ts
```

---

# Required Features

The backend must contain all features below.

---

# Task 1 — Project Initialization

## Subtasks

- Initialize Node.js project
- Setup TypeScript
- Setup tsconfig
- Setup package.json scripts
- Setup tsx runtime
- Setup path aliases
- Setup environment variables
- Setup folder structure

---

## Required Scripts

```json
{
  "dev": "",
  "build": "",
  "start": "",
  "lint": "",
  "format": ""
}
```

---

# Task 2 — Express Application Setup

## Subtasks

Create:

- app.ts
- server.ts

---

## app.ts Responsibilities

- initialize express
- apply middlewares
- setup routes
- apply error middleware

---

## server.ts Responsibilities

- connect database
- create HTTP server
- start server
- handle graceful shutdown

---

# Task 3 — Environment Configuration

## Subtasks

Create:

```txt
config/
 ├── env.ts
```

---

## Requirements

- load .env variables
- validate environment configuration
- fail app startup if invalid
- export typed env object

---

## Required Environment Variables

```env
NODE_ENV=
PORT=
MONGO_URI=
```

---

# Task 4 — Database Layer

## Subtasks

Create:

```txt
infrastructure/database/
 ├── connectDB.ts
```

---

## Requirements

- connect using mongoose
- proper error handling
- reusable connection function
- typed implementation

---

# Task 5 — Logger System

## Subtasks

Create:

```txt
shared/logger/
 ├── logger.ts
```

---

## Requirements

- use pino
- pretty logs in development
- JSON logs in production
- request logging support
- production-ready structure

---

# Task 6 — Security Middleware

## Subtasks

Configure:

- helmet
- cors
- compression
- express-rate-limit

---

## Requirements

- proper middleware ordering
- production-safe defaults
- reusable setup

---

# Task 7 — Error Handling System

## Subtasks

Create:

```txt
shared/errors/
 ├── AppError.ts
```

Create:

```txt
shared/middlewares/
 ├── errorHandler.ts
```

---

## Requirements

- centralized error handling
- operational error support
- unknown error handling
- proper HTTP status handling
- typed implementation

---

# Task 8 — Async Error Wrapper

## Subtasks

Create utility:

```txt
shared/utils/
 ├── asyncHandler.ts
```

---

## Requirements

- wrap async controllers
- remove repetitive try/catch
- proper typing support

---

# Task 9 — Health Module

## Subtasks

Create:

```txt
modules/health/
 ├── health.routes.ts
 ├── health.controller.ts
```

---

## Requirements

Create:

```txt
GET /health
```

Must return:

- server status
- uptime
- timestamp

---

# Task 10 — Global Middleware Setup

## Subtasks

Add support for:

- express.json
- URL encoding
- request logger
- rate limiter

---

## Requirements

Middleware order must be production-safe.

---

# Task 11 — Graceful Shutdown System

## Subtasks

Handle:

- SIGINT
- SIGTERM
- uncaughtException
- unhandledRejection

---

## Requirements

- close HTTP server safely
- close DB connection safely
- proper logging
- clean shutdown

---

# Task 12 — Route System

## Subtasks

Create centralized route loader.

---

## Requirements

Structure must support:

- scalable modules
- API versioning
- future feature growth

---

# Task 13 — Shared Utilities

## Subtasks

Create shared utility structure:

```txt
shared/
 ├── utils/
 ├── types/
```

---

## Requirements

Utilities must be reusable and framework-agnostic where possible.

---

# Task 14 — ESLint & Prettier

## Subtasks

Setup:

- eslint
- prettier
- lint scripts
- formatting rules

---

## Requirements

Codebase must maintain consistent formatting.

---

# Task 15 — Husky & Lint Staged

## Subtasks

Setup:

- husky
- lint-staged

---

## Requirements

Pre-commit checks must run automatically.

---

# Task 16 — API Versioning

## Subtasks

Setup base API path:

```txt
/api/v1
```

---

## Requirements

Versioning structure must be scalable.

---

# Task 17 — HTTP Response Standards

## Subtasks

Create standardized API response structure.

---

## Requirements

Success responses should follow consistent shape.

Example:

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

---

# Task 18 — Path Alias Setup

## Subtasks

Configure aliases:

```txt
@/
```

---

## Requirements

Imports should avoid deep relative paths.

BAD:

```ts
../../../utils
```

GOOD:

```ts
@/shared/utils
```

---

# Task 19 — Production Readiness Validation

## Subtasks

Verify:

- app starts correctly
- DB connects correctly
- invalid env fails startup
- logger works
- error middleware works
- graceful shutdown works

---

# Task 20 — Documentation

## Subtasks

Document:

- architecture
- startup flow
- middleware flow
- folder responsibilities
- environment setup

---

# Expected Final Output

At the end of this phase:

- a fully working backend exists
- project is production-ready
- server can start locally
- MongoDB connects correctly
- health route works
- logging works
- error handling works
- graceful shutdown works
- codebase is scalable
- architecture is reusable
- architecture is feature-compatible

---

# Phase 1 Completion Checklist

Phase 1 is complete ONLY IF all conditions below are satisfied.

---

# Server Setup

- [ ] Express app created
- [ ] HTTP server created
- [ ] app.ts exists
- [ ] server.ts exists
- [ ] API versioning exists

---

# Environment System

- [ ] .env support exists
- [ ] environment validation exists
- [ ] invalid env blocks startup
- [ ] typed env export exists

---

# Database

- [ ] MongoDB connection works
- [ ] reusable DB connector exists
- [ ] DB errors handled correctly

---

# Logger

- [ ] pino configured
- [ ] request logging works
- [ ] pretty logs in development
- [ ] JSON logs in production

---

# Security

- [ ] helmet configured
- [ ] cors configured
- [ ] compression configured
- [ ] rate limiting configured

---

# Error Handling

- [ ] AppError class exists
- [ ] global error middleware exists
- [ ] asyncHandler exists
- [ ] unknown errors handled safely

---

# Graceful Shutdown

- [ ] SIGINT handled
- [ ] SIGTERM handled
- [ ] unhandledRejection handled
- [ ] uncaughtException handled

---

# DX

- [ ] TypeScript configured
- [ ] ESLint configured
- [ ] Prettier configured
- [ ] Husky configured
- [ ] lint-staged configured

---

# Architecture

- [ ] modular monolith structure exists
- [ ] shared layer exists
- [ ] infrastructure layer exists
- [ ] scalable routing exists
- [ ] feature-compatible structure exists

---

# Validation

- [ ] Server starts successfully
- [ ] Health route responds correctly
- [ ] Invalid env blocks startup
- [ ] Error middleware works correctly
- [ ] Logs appear correctly
- [ ] DB connection succeeds
- [ ] Graceful shutdown works correctly

---

# Final Validation Criteria

Phase 1 is successful ONLY IF:

- backend is production-ready
- backend is scalable
- architecture is reusable
- architecture supports future feature injection
- all core systems work
- no CLI code exists yet
- no generator logic exists yet
- no template engine exists yet
- no validation system exists yet
- no swagger system exists yet
- no docker system exists yet
- this project could realistically be deployed to production
- this project can later be reused as the base template for scaffolding
