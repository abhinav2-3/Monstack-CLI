# Phase 3 — Build The CLI Foundation

## Phase Gist

This phase builds the interactive CLI foundation that users will execute through the terminal.
The CLI will collect project configuration from user prompts and prepare validated generator configuration objects for future template generation.

This phase focuses ONLY on CLI interaction and configuration collection.

---

# Phase Overview

Phase 2 created a reusable template system.

Phase 3 introduces the actual CLI interface that users interact with.

This phase builds:

- CLI commands
- terminal prompts
- interactive flows
- config collection
- config validation
- command execution entrypoints

This phase does NOT generate projects yet.

This phase ONLY collects and validates user configuration.

---

# Current Phase Goal

Build a scalable and production-ready CLI foundation capable of:

- handling terminal commands
- collecting user inputs
- validating configuration
- preparing generator-ready config objects
- supporting future frameworks and features

The CLI must feel clean, fast, modern, and scalable.

---

# Important Rules

## Rule 1

Do NOT generate projects yet.

---

## Rule 2

Do NOT copy template files yet.

---

## Rule 3

Do NOT install dependencies yet.

---

## Rule 4

Do NOT render EJS templates yet.

---

## Rule 5

Focus ONLY on CLI interaction architecture.

---

## Rule 6

CLI logic must remain framework-agnostic.

---

# Expected Final Outcome

At the end of this phase:

- interactive CLI exists
- prompts work correctly
- configuration validation works
- command execution works
- final generator config object is produced

No project generation should happen yet.

---

# CLI Goals

The CLI must support:

- interactive prompts
- scalable command architecture
- config validation
- future framework support
- future feature support
- clean terminal UX

---

# Tech Stack

## CLI Framework

- Commander.js

## Prompt System

- Prompts

## Terminal Styling

- Chalk

## Loading States

- Ora

## Runtime

- Node.js

## Language

- TypeScript

---

# Final CLI Structure

```txt
packages/
│
├── cli/
│   │
│   ├── src/
│   │   │
│   │   ├── commands/
│   │   ├── prompts/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── constants/
│   │   ├── cli.ts
```

---

# Task 1 — Setup CLI Package

## Subtasks

Create:

```txt
packages/cli/
```

Setup:

- package.json
- tsconfig
- build scripts
- executable bin configuration

---

## Requirements

CLI package must be independently runnable.

---

# Task 2 — Configure CLI Entry Point

## Subtasks

Create:

```txt
src/cli.ts
```

---

## Responsibilities

- initialize CLI
- register commands
- setup terminal UX
- handle root execution

---

# Task 3 — Setup Commander.js

## Subtasks

Configure:

- CLI program
- command registration
- command descriptions
- version support

---

## Requirements

CLI must support scalable command registration.

---

# Task 4 — Create Initial Create Command

## Subtasks

Create command:

```bash
create
```

---

## Requirements

This command must:

- launch prompts
- collect configuration
- validate configuration
- output final config object

No generation should occur yet.

---

# Task 5 — Build Prompt System

## Subtasks

Create prompt modules for:

- project name
- framework
- architecture
- database
- package manager
- optional features

---

## Requirements

Prompt system must remain modular and reusable.

---

# Task 6 — Create Prompt Flow

## Subtasks

Implement interactive flow:

```txt
Project Name
    ↓
Framework
    ↓
Architecture
    ↓
Database
    ↓
Package Manager
    ↓
Features
```

---

## Requirements

Flow must support future extensibility.

---

# Task 7 — Add Validation Prompt Logic

## Subtasks

Add support for optional validation selection.

---

## Example Flow

```txt
Enable Validation?
    ↓
Select Validation Library
```

---

## Requirements

Validation selection must remain feature-driven.

---

# Task 8 — Create Config Validation Layer

## Subtasks

Create validation system for collected CLI config.

---

## Requirements

Validate:

- empty project names
- unsupported options
- invalid combinations
- duplicate features

---

# Task 9 — Create GeneratorConfig Builder

## Subtasks

Transform prompt responses into:

```ts
GeneratorConfig;
```

---

## Requirements

GeneratorConfig must become the single source of truth.

---

# Example

```ts
{
  projectName: "my-app",
  framework: "express",
  architecture: "modular",
  database: "mongodb",
  packageManager: "npm",
  features: ["validation-zod"]
}
```

---

# Task 10 — Create Constants System

## Subtasks

Create centralized constants for:

- frameworks
- architectures
- databases
- package managers
- features

---

## Requirements

Avoid hardcoded prompt values.

---

# Task 11 — Create Terminal UX System

## Subtasks

Setup:

- colors
- loading spinners
- success messages
- error messages

---

## Requirements

CLI output must feel modern and clean.

---

# Task 12 — Create Error Handling System

## Subtasks

Handle:

- invalid inputs
- interrupted prompts
- unsupported selections
- runtime CLI failures

---

## Requirements

CLI must fail gracefully.

---

# Task 13 — Create Prompt Abstraction Layer

## Subtasks

Separate prompt logic from command logic.

---

## Requirements

Prompt modules must remain reusable.

---

# Task 14 — Create Feature Selection Flow

## Subtasks

Add support for optional features.

---

## Example Features

- validation-zod
- swagger
- docker
- auth

---

## Requirements

Features must remain scalable and composable.

---

# Task 15 — Create CLI Types

## Subtasks

Create shared CLI types for:

- prompts
- responses
- command context
- feature metadata

---

## Requirements

CLI codebase must remain strongly typed.

---

# Task 16 — Create Future Framework Compatibility Rules

## Subtasks

Design CLI flow to support future frameworks:

- Express
- NestJS
- Fastify
- Hono

---

## Requirements

CLI must avoid framework-specific assumptions.

---

# Task 17 — Create Command Scalability Strategy

## Subtasks

Design scalable command architecture.

---

## Future Commands

```bash
create
add-feature
doctor
upgrade
```

---

## Requirements

CLI architecture must support future command expansion.

---

# Task 18 — Create CLI Documentation

## Subtasks

Document:

- command flow
- prompt flow
- config creation flow
- validation strategy
- future scalability strategy

---

# Task 19 — Validate CLI Flow

## Subtasks

Verify:

- prompts work correctly
- command executes correctly
- config validation works
- final GeneratorConfig builds correctly

---

## Requirements

CLI flow must feel production-ready.

---

# Expected Final Output

At the end of this phase:

- interactive CLI exists
- prompts work correctly
- configuration validation works
- GeneratorConfig is produced correctly
- CLI architecture is scalable
- feature selection works
- terminal UX works

No project generation should occur yet.

---

# Phase 3 Completion Checklist

Phase 3 is complete ONLY IF all conditions below are satisfied.

---

# CLI Setup

- [ ] cli package exists
- [ ] executable CLI entrypoint exists
- [ ] Commander.js configured
- [ ] create command exists

---

# Prompt System

- [ ] project name prompt works
- [ ] framework prompt works
- [ ] architecture prompt works
- [ ] database prompt works
- [ ] package manager prompt works
- [ ] feature prompt works

---

# Config System

- [ ] GeneratorConfig builder exists
- [ ] config validation exists
- [ ] invalid inputs handled correctly
- [ ] final config object generated successfully

---

# Feature Flow

- [ ] optional feature selection works
- [ ] validation feature selection works
- [ ] feature system remains scalable

---

# Terminal UX

- [ ] colors configured
- [ ] loading states configured
- [ ] error messages configured
- [ ] success messages configured

---

# Scalability

- [ ] command system is scalable
- [ ] prompt system is modular
- [ ] CLI remains framework-agnostic
- [ ] future framework support possible

---

# Validation

- [ ] CLI runs successfully
- [ ] prompts execute correctly
- [ ] invalid input handled correctly
- [ ] GeneratorConfig generated correctly
- [ ] terminal UX feels production-ready

---

# Final Validation Criteria

Phase 3 is successful ONLY IF:

- interactive CLI exists
- configuration collection works
- GeneratorConfig generation works
- CLI architecture is scalable
- CLI supports future frameworks
- CLI supports future features
- no project generation exists yet
- no template copying exists yet
- no EJS rendering exists yet
- no dependency installation exists yet
- no feature injection exists yet
- the system is fully prepared for generator engine implementation in the next phase
