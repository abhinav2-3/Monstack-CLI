# Phase 4 — Build The Generator Engine

## Phase Gist

This phase builds the actual generation engine that transforms the collected CLI configuration into a fully generated backend project.

The system will now resolve templates, render files, copy source code, and prepare runnable projects automatically.

---

# Phase Overview

Phase 3 created the interactive CLI and configuration system.

Phase 4 introduces the core generation engine responsible for:

- template resolution
- template rendering
- variable replacement
- project generation
- file copying
- output project creation

This is the heart of the scaffolding system.

---

# Current Phase Goal

Build a scalable and framework-agnostic generator engine capable of:

- resolving templates dynamically
- rendering EJS templates
- generating runnable projects
- copying template files safely
- supporting future frameworks and architectures
- supporting future feature injection

At the end of this phase, the CLI should generate a runnable backend project locally.

---

# Important Rules

## Rule 1

Do NOT implement feature injection yet.

---

## Rule 2

Do NOT implement dependency installation yet.

---

## Rule 3

Do NOT implement git initialization yet.

---

## Rule 4

Do NOT hardcode framework logic.

---

## Rule 5

Focus ONLY on template generation architecture.

---

## Rule 6

Generator engine must remain framework-agnostic.

---

# Expected Final Outcome

At the end of this phase:

- generator engine exists
- templates resolve dynamically
- EJS templates render correctly
- project files generate correctly
- runnable backend projects are created automatically

No dependency installation should happen yet.

---

# Generator Engine Goals

The engine must support:

- dynamic template resolution
- EJS rendering
- scalable generation flow
- future feature composition
- future framework support
- safe file generation

---

# Final Core Structure

```txt
packages/
│
├── core/
│   │
│   ├── src/
│   │   │
│   │   ├── generator/
│   │   ├── template-engine/
│   │   ├── resolvers/
│   │   ├── renderers/
│   │   ├── filesystem/
│   │   ├── validators/
│   │   ├── types/
│   │   ├── constants/
```

---

# Final Generation Flow

```txt
CLI Prompt Config
        ↓
GeneratorConfig
        ↓
Resolve Template Path
        ↓
Read Template Files
        ↓
Render EJS Variables
        ↓
Copy Generated Files
        ↓
Create Final Project
```

---

# Task 1 — Setup Core Package

## Subtasks

Create:

```txt
packages/core/
```

Setup:

- package.json
- tsconfig
- build configuration
- exports

---

## Requirements

Core package must remain independently reusable.

---

# Task 2 — Create Generator Entry Point

## Subtasks

Create:

```txt
generator/
 ├── generateProject.ts
```

---

## Responsibilities

- receive GeneratorConfig
- orchestrate generation flow
- coordinate template engine
- handle generation lifecycle

---

# Task 3 — Create Template Resolver System

## Subtasks

Build dynamic template path resolver.

---

## Requirements

Resolve templates dynamically using:

- framework
- architecture
- database

---

## Example

```txt
templates/
 ├── express/
 │   ├── modular/
 │   │   ├── mongodb/
```

---

## BAD

```ts
if (express && mongodb)
```

---

## GOOD

```ts
resolvePath(config);
```

---

# Task 4 — Create Template Reader

## Subtasks

Build recursive template file reader.

---

## Responsibilities

- scan template directories
- collect file structure
- prepare renderable file list

---

## Requirements

Support nested directories safely.

---

# Task 5 — Create EJS Rendering Engine

## Subtasks

Build template rendering system.

---

## Requirements

Support:

- variable interpolation
- conditional rendering
- future feature rendering

---

## Example

```ejs
<%= PROJECT_NAME %>
```

---

# Task 6 — Create Placeholder Injection System

## Subtasks

Inject GeneratorConfig variables into templates.

---

## Requirements

Support:

- project name
- package manager
- ports
- environment variables

---

# Task 7 — Create File Generation System

## Subtasks

Generate rendered files into target project directory.

---

## Requirements

- preserve folder hierarchy
- create nested directories
- support overwrite safety
- support template file renaming

---

# Task 8 — Handle Template File Naming

## Subtasks

Convert template file names properly.

---

## Example

```txt
package.json.ejs
→
package.json
```

---

## Requirements

Generated projects must not contain `.ejs` files.

---

# Task 9 — Create Output Directory System

## Subtasks

Handle project output directory creation.

---

## Requirements

- validate directory existence
- prevent accidental overwrites
- support clean generation

---

# Task 10 — Create Generator Validation Layer

## Subtasks

Validate generation prerequisites.

---

## Requirements

Verify:

- template exists
- output directory valid
- GeneratorConfig valid
- unsupported combinations blocked

---

# Task 11 — Create Generation Logging System

## Subtasks

Add generation lifecycle logs.

---

## Requirements

Display:

- template resolution
- rendering progress
- file generation progress
- generation completion

---

# Task 12 — Create Error Handling System

## Subtasks

Handle:

- missing templates
- rendering failures
- filesystem failures
- invalid configurations

---

## Requirements

Generation failures must be readable and recoverable.

---

# Task 13 — Create Filesystem Utilities

## Subtasks

Build reusable filesystem helpers.

---

## Responsibilities

- file copying
- recursive scanning
- directory creation
- safe writes

---

## Requirements

Utilities must remain reusable across future phases.

---

# Task 14 — Create Template Metadata Reader

## Subtasks

Read template metadata definitions.

---

## Requirements

Support:

- framework metadata
- architecture metadata
- database metadata

---

# Task 15 — Create Render Pipeline

## Subtasks

Build internal rendering lifecycle.

---

## Example Flow

```txt
Read Template
    ↓
Parse Metadata
    ↓
Render Variables
    ↓
Generate Output
```

---

## Requirements

Pipeline must remain extensible.

---

# Task 16 — Create Future Feature Injection Compatibility

## Subtasks

Prepare generation engine for future:

- validation
- docker
- swagger
- auth
- testing

---

## Requirements

Generator architecture must support composable feature injection later.

---

# Task 17 — Create Template Isolation Rules

## Subtasks

Ensure templates remain isolated from generator logic.

---

## Requirements

Templates must behave as independent source projects.

---

# Task 18 — Connect CLI To Generator Engine

## Subtasks

Connect Phase 3 CLI with Phase 4 generator.

---

## Responsibilities

Pass:

```ts
GeneratorConfig;
```

into generation engine.

---

## Requirements

CLI must now generate projects successfully.

---

# Task 19 — Create Generation Documentation

## Subtasks

Document:

- generation lifecycle
- template resolution flow
- rendering flow
- output generation flow
- scalability strategy

---

# Task 20 — Validate Generated Projects

## Subtasks

Verify generated project:

- starts successfully
- contains rendered variables
- preserves architecture
- remains production-ready

---

## Requirements

Generated project must work without manual fixes.

---

# Expected Final Output

At the end of this phase:

- generator engine exists
- templates resolve dynamically
- EJS rendering works
- files generate correctly
- CLI creates runnable projects
- project structure remains production-ready
- generation architecture remains scalable

---

# Phase 4 Completion Checklist

Phase 4 is complete ONLY IF all conditions below are satisfied.

---

# Core Engine

- [ ] core package exists
- [ ] generator engine exists
- [ ] template resolver exists
- [ ] rendering engine exists

---

# Template Resolution

- [ ] templates resolve dynamically
- [ ] framework resolution works
- [ ] architecture resolution works
- [ ] database resolution works

---

# Rendering System

- [ ] EJS rendering works
- [ ] placeholders inject correctly
- [ ] conditional rendering works
- [ ] `.ejs` files convert correctly

---

# File Generation

- [ ] files generate correctly
- [ ] folder hierarchy preserved
- [ ] nested directories generate correctly
- [ ] output directories handled safely

---

# Validation

- [ ] invalid templates blocked
- [ ] invalid config blocked
- [ ] overwrite protection works
- [ ] rendering errors handled correctly

---

# CLI Integration

- [ ] CLI connected to generator
- [ ] GeneratorConfig passed correctly
- [ ] project generation triggered successfully

---

# Scalability

- [ ] engine remains framework-agnostic
- [ ] templates remain isolated
- [ ] future framework support possible
- [ ] future feature injection possible

---

# Generated Project Validation

- [ ] generated backend starts correctly
- [ ] rendered variables appear correctly
- [ ] generated project remains production-ready
- [ ] no manual fixes required after generation

---

# Final Validation Criteria

Phase 4 is successful ONLY IF:

- generator engine exists
- CLI generates runnable backend projects
- template rendering works correctly
- generation flow is scalable
- generator remains framework-agnostic
- templates remain reusable
- generated projects remain production-ready
- no dependency installation exists yet
- no feature injection exists yet
- no git initialization exists yet
- system is fully prepared for installer and feature// system implementation in later phases
