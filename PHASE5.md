# Phase 5 — Dependency Installation & Project Initialization System

## Phase Gist

This phase upgrades the generator from only creating files to fully initializing runnable projects automatically.

The system will now install dependencies, initialize git repositories, create environment files, and complete project setup with minimal manual work.

---

# Phase Overview

Phase 4 introduced the generator engine and project generation system.

Phase 5 introduces:

- dependency installation
- package manager support
- git initialization
- environment file setup
- project bootstrap automation
- post-generation lifecycle handling

At the end of this phase, users should be able to run:

```bash
npx create-monstack-api
```

and receive a fully initialized backend project ready to run.

---

# Current Phase Goal

Build a scalable initialization system capable of:

- installing dependencies automatically
- supporting multiple package managers
- initializing git repositories
- generating environment files
- handling post-generation lifecycle hooks
- preparing projects for immediate development

---

# Important Rules

## Rule 1

Do NOT implement feature injection yet.

---

## Rule 2

Do NOT implement validation feature system yet.

---

## Rule 3

Do NOT hardcode npm-only logic.

---

## Rule 4

Do NOT tightly couple installers with frameworks.

---

## Rule 5

Focus ONLY on initialization lifecycle architecture.

---

## Rule 6

Installer system must remain reusable and extensible.

---

# Expected Final Outcome

At the end of this phase:

- generated projects install dependencies automatically
- package managers work correctly
- git repositories initialize automatically
- environment files generate correctly
- projects become immediately runnable

Feature injection still does NOT exist yet.

---

# Supported Package Managers

The system must support:

- npm
- pnpm
- yarn

Future support should remain possible for:

- bun

---

# Final Core Structure

```txt
packages/
│
├── core/
│   │
│   ├── src/
│   │   │
│   │   ├── installers/
│   │   ├── lifecycle/
│   │   ├── git/
│   │   ├── environment/
│   │   ├── package-managers/
```

---

# Final Initialization Flow

```txt
Generate Project Files
        ↓
Generate Environment Files
        ↓
Install Dependencies
        ↓
Initialize Git Repository
        ↓
Run Post-Generation Hooks
        ↓
Project Ready
```

---

# Task 1 — Create Installer Architecture

## Subtasks

Create:

```txt
installers/
```

---

## Requirements

Installer system must remain package-manager agnostic.

---

# Task 2 — Create Package Manager Resolver

## Subtasks

Detect and resolve selected package manager.

---

## Supported Managers

- npm
- pnpm
- yarn

---

## Requirements

Avoid hardcoded installation logic.

---

# Task 3 — Create NPM Installer

## Subtasks

Build npm installation implementation.

---

## Responsibilities

- install dependencies
- install dev dependencies
- handle install failures
- stream terminal output

---

## Requirements

Installation logs must remain readable.

---

# Task 4 — Create PNPM Installer

## Subtasks

Build pnpm installation implementation.

---

## Requirements

Support lockfile generation and workspace compatibility.

---

# Task 5 — Create Yarn Installer

## Subtasks

Build yarn installation implementation.

---

## Requirements

Support modern yarn versions.

---

# Task 6 — Create Shared Installer Interface

## Subtasks

Define common installer contract.

---

## Requirements

All installers must follow the same lifecycle.

---

## Example

```ts
install(projectPath, dependencies);
```

---

# Task 7 — Create Dependency Collection System

## Subtasks

Collect dependencies from:

- template package.json
- future feature modules
- optional systems

---

## Requirements

Dependency merging must remain scalable.

---

# Task 8 — Create Installation Lifecycle System

## Subtasks

Build installation orchestration flow.

---

## Responsibilities

- resolve installer
- execute install
- handle retries
- log progress

---

# Task 9 — Create Git Initialization System

## Subtasks

Automatically initialize git repository.

---

## Responsibilities

- run git init
- create initial branch
- validate git availability

---

## Requirements

Git failures must not crash generation.

---

# Task 10 — Create Environment File Generator

## Subtasks

Generate:

```txt
.env
.env.example
```

---

## Requirements

Support placeholder injection and safe defaults.

---

# Task 11 — Create Post-Generation Lifecycle Hooks

## Subtasks

Build lifecycle hooks system.

---

## Example Hooks

```txt
beforeInstall
afterInstall
beforeGitInit
afterGeneration
```

---

## Requirements

Lifecycle system must support future feature modules.

---

# Task 12 — Create Installation Logging System

## Subtasks

Display:

- dependency install progress
- git initialization status
- generation completion
- failure reasons

---

## Requirements

Logs must remain readable and developer-friendly.

---

# Task 13 — Create Failure Recovery System

## Subtasks

Handle:

- failed installations
- interrupted installs
- missing package managers
- git initialization failures

---

## Requirements

Generator must fail gracefully.

---

# Task 14 — Create Package Manager Validation

## Subtasks

Verify selected package manager exists locally.

---

## Requirements

Provide meaningful errors if missing.

---

# Task 15 — Create Installer Utilities

## Subtasks

Build reusable utilities for:

- command execution
- shell process handling
- output streaming
- retry handling

---

## Requirements

Utilities must remain reusable across future systems.

---

# Task 16 — Create Future Feature Compatibility

## Subtasks

Prepare installer system for future feature modules.

---

## Future Features

- validation-zod
- swagger
- docker
- auth
- testing

---

## Requirements

Feature modules must later inject dependencies cleanly.

---

# Task 17 — Create Initialization Metadata Flow

## Subtasks

Prepare generation metadata for installers.

---

## Requirements

Installers must receive:

- project path
- package manager
- dependency lists
- environment config

---

# Task 18 — Connect Generator Engine To Installers

## Subtasks

Connect Phase 4 generator engine with initialization lifecycle.

---

## Responsibilities

After project generation:

- install dependencies
- initialize git
- finalize setup

---

# Task 19 — Create Initialization Documentation

## Subtasks

Document:

- installation lifecycle
- installer architecture
- git initialization flow
- environment generation flow
- package manager strategy

---

# Task 20 — Validate Full Project Bootstrap

## Subtasks

Verify generated project:

- installs correctly
- starts correctly
- generates environment files
- initializes git correctly
- runs without manual setup

---

## Requirements

Generated project must feel production-ready immediately after generation.

---

# Expected Final Output

At the end of this phase:

- dependency installation works
- package managers work correctly
- git initialization works
- environment generation works
- projects bootstrap automatically
- generated projects become immediately runnable

Feature injection still does NOT exist yet.

---

# Phase 5 Completion Checklist

Phase 5 is complete ONLY IF all conditions below are satisfied.

---

# Installer System

- [ ] installer architecture exists
- [ ] shared installer interface exists
- [ ] installation lifecycle exists

---

# Package Managers

- [ ] npm installer works
- [ ] pnpm installer works
- [ ] yarn installer works
- [ ] package manager validation works

---

# Dependency Installation

- [ ] dependencies install correctly
- [ ] dev dependencies install correctly
- [ ] installation logs stream correctly
- [ ] install failures handled safely

---

# Git Initialization

- [ ] git init works
- [ ] git failures handled safely
- [ ] repositories initialize correctly

---

# Environment System

- [ ] .env generated correctly
- [ ] .env.example generated correctly
- [ ] placeholders render correctly

---

# Lifecycle Hooks

- [ ] lifecycle system exists
- [ ] install hooks exist
- [ ] generation hooks exist
- [ ] future feature hooks supported

---

# Generator Integration

- [ ] generator connected to installers
- [ ] projects bootstrap automatically
- [ ] initialization flow works correctly

---

# Scalability

- [ ] installer system remains reusable
- [ ] package managers remain modular
- [ ] future feature dependency injection possible
- [ ] initialization lifecycle remains extensible

---

# Validation

- [ ] generated projects install successfully
- [ ] generated projects start successfully
- [ ] git repositories initialize correctly
- [ ] environment files generate correctly
- [ ] no manual setup required after generation

---

# Final Validation Criteria

Phase 5 is successful ONLY IF:

- generated projects bootstrap automatically
- dependency installation works correctly
- package manager support works correctly
- git initialization works correctly
- environment generation works correctly
- initialization lifecycle is scalable
- installer architecture remains extensible
- no feature injection exists yet
- no validation feature system exists yet
- no swagger feature system exists yet
- no docker feature system exists yet
- generated projects are immediately runnable after generation
- system is fully prepared for modular feature system implementation in the next phase
