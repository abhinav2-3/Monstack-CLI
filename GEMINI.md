# Phase 0 — Architecture Planning & Initial System Design

## Project Overview

We are building a production-ready CLI scaffolding tool for backend applications.

The CLI should generate scalable and production-grade backend boilerplates with support for:

- Express.js
- TypeScript
- Multiple architecture styles
- Multiple databases
- Production-grade project setup
- Feature-based extensibility

The CLI should eventually support multiple frameworks like:

- Express
- NestJS
- Fastify
- Hono

But currently, only Express support is required.

The generated projects must be scalable, modular, secure, and deployment-ready.

---

# Current Phase Goal

This phase is ONLY for planning and architecture setup.

No actual generator logic or Express server implementation should be built in this phase.

The goal is to finalize:

- project architecture
- folder structure
- generation flow
- system boundaries
- config structure
- template strategy
- feature strategy
- package structure

This phase acts as the foundation for all upcoming phases.

---

# Expected Final Outcome Of Phase 0

At the end of this phase, the repository should contain:

- monorepo structure
- package structure
- architecture documentation
- finalized generation flow
- finalized config schema
- finalized folder strategy
- finalized template strategy
- finalized feature strategy

No runnable generator is required yet.

---

# Tech Stack Decisions

## Runtime

- Node.js

## Language

- TypeScript

## Monorepo

- Turborepo

## CLI Framework

- Commander.js

## Prompt Library

- Prompts

## Build Tool

- tsup

## File Utilities

- fs-extra

## Command Execution

- execa

## Template Engine

- EJS

---

# Supported Features (Current Scope)

## Frameworks

- Express

## Architecture Styles

- Traditional
- Modular Monolith

## Databases

- MongoDB
- PostgreSQL

---

# Monorepo Structure

The repository must follow this structure:

```txt
packages/
│
├── cli/
├── core/
├── templates/
├── features/
```

---

# Package Responsibilities

## packages/cli

Responsible for:

- CLI commands
- prompts
- terminal UX
- user interaction

---

## packages/core

Responsible for:

- generator engine
- template resolution
- feature application
- dependency installation
- file generation logic

---

## packages/templates

Responsible for:

- framework templates
- architecture templates
- database templates

---

## packages/features

Responsible for:

- optional features
- docker
- swagger
- auth
- testing
- redis
- future plugins

---

# Final Template Structure

```txt
templates/
│
├── express/
│   │
│   ├── traditional/
│   │   ├── mongodb/
│   │   ├── postgres/
│   │
│   ├── modular/
│       ├── mongodb/
│       ├── postgres/
```

---

# Final Feature Structure

```txt
features/
│
├── docker/
├── swagger/
├── auth/
├── testing/
```

---

# Final Generation Flow

The system must follow this flow:

```txt
User Runs CLI
    ↓
Collect User Prompts
    ↓
Create Generator Config
    ↓
Resolve Base Template
    ↓
Copy Template Files
    ↓
Apply Features
    ↓
Replace Variables
    ↓
Install Dependencies
    ↓
Initialize Git
    ↓
Project Ready
```

---

# Generator Config Schema

The entire system must depend on one central config object.

```ts
type GeneratorConfig = {
  projectName: string;
  framework: 'express';
  architecture: 'traditional' | 'modular';
  database: 'mongodb' | 'postgres';
  packageManager: 'npm' | 'pnpm' | 'yarn';
  features: string[];
};
```

---

# Architecture Rules

## Rule 1

CLI package must NEVER contain framework-specific generation logic.

---

## Rule 2

Generator engine must NEVER hardcode Express-specific logic.

---

## Rule 3

Templates must contain actual production-ready source code.

---

## Rule 4

Features must be modular and composable.

---

## Rule 5

Avoid giant conditional generation logic.

BAD:

```ts
if (express && mongo && auth)
```

GOOD:

```txt
resolve template dynamically
apply modular features
```

---

# Required Deliverables

## Task 1 — Initialize Monorepo

### Subtasks

- Initialize root package.json
- Setup Turborepo
- Create packages directory
- Create all required package folders
- Setup workspace configuration

### Expected Output

```txt
packages/
 ├── cli/
 ├── core/
 ├── templates/
 ├── features/
```

---

## Task 2 — Setup Root Tooling

### Subtasks

- Setup TypeScript
- Setup shared tsconfig
- Setup ESLint
- Setup Prettier
- Setup .gitignore
- Setup editor config
- Setup npm scripts

### Expected Output

Working root tooling configuration.

---

## Task 3 — Define System Architecture

### Subtasks

Create documentation for:

- package responsibilities
- generation flow
- template resolution strategy
- feature strategy
- dependency installation strategy

### Expected Output

Architecture documentation exists in repository.

---

## Task 4 — Define Generator Config Schema

### Subtasks

- Create shared GeneratorConfig type
- Define enums/types
- Define supported frameworks
- Define supported architectures
- Define supported databases

### Expected Output

Central config schema exists and is documented.

---

## Task 5 — Define Template Strategy

### Subtasks

- Define template folder hierarchy
- Define variable replacement strategy
- Define EJS templating strategy
- Define placeholder naming conventions

### Expected Output

Template strategy documented.

---

## Task 6 — Define Feature System

### Subtasks

- Define feature folder structure
- Define feature registration strategy
- Define feature application lifecycle
- Define dependency injection strategy

### Expected Output

Feature architecture documented.

---

## Task 7 — Define CLI UX Flow

### Subtasks

Define prompts for:

- project name
- framework
- architecture
- database
- package manager
- optional features

### Expected Output

CLI interaction flow documented.

---

# Phase 0 Completion Checklist

Phase 0 is complete ONLY IF all conditions below are satisfied.

---

## Repository Structure

- [ ] Monorepo initialized
- [ ] packages directory exists
- [ ] cli package exists
- [ ] core package exists
- [ ] templates package exists
- [ ] features package exists

---

## Tooling

- [ ] TypeScript configured
- [ ] Turborepo configured
- [ ] ESLint configured
- [ ] Prettier configured
- [ ] Workspace configuration working

---

## Architecture

- [ ] Generation flow documented
- [ ] Package responsibilities documented
- [ ] Template strategy documented
- [ ] Feature strategy documented
- [ ] Config schema finalized

---

## Config System

- [ ] GeneratorConfig type defined
- [ ] Supported framework types defined
- [ ] Supported architecture types defined
- [ ] Supported database types defined

---

## Design Validation

- [ ] No framework logic inside CLI package
- [ ] No hardcoded generation conditions
- [ ] Templates planned as reusable source projects
- [ ] Features planned as modular plugins

---

# Final Validation Criteria

Phase 0 is successful ONLY IF:

- system architecture is finalized
- folder structure is finalized
- generation flow is finalized
- scaling strategy is finalized
- extensibility strategy is finalized
- future framework support is possible without architecture rewrite
- no actual generator implementation exists yet
- no actual Express template implementation exists yet
- no production server code exists yet

This phase is planning-only.
