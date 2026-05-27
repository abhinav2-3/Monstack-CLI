# Phase 2 — Convert The Golden Template Into A Reusable Template System

## Phase Overview

Phase 1 created a manually built production-grade backend application.

Phase 2 transforms that backend into a reusable and scalable template system.

This phase introduces:

- reusable templates
- template architecture
- variable placeholders
- EJS rendering support
- template organization strategy
- framework template boundaries

This phase does NOT build the CLI yet.

This phase only prepares the backend architecture for future automated generation.

---

# Current Phase Goal

Convert the manually built backend from Phase 1 into a reusable template system that can later be consumed by the generator engine.

The result of this phase should be:

- reusable templates
- clean template structure
- variable replacement support
- template rendering support
- feature-compatible template architecture

---

# Important Rules

## Rule 1

Do NOT build CLI prompts yet.

---

## Rule 2

Do NOT build generator execution logic yet.

---

## Rule 3

Do NOT install dependencies automatically yet.

---

## Rule 4

Do NOT build feature injection logic yet.

---

## Rule 5

Focus ONLY on reusable template architecture.

---

## Rule 6

Avoid hardcoded framework logic.

Templates must remain composable and reusable.

---

# Phase Scope

This phase ONLY covers:

```txt
Express + Modular Monolith + MongoDB
```

Traditional architecture support will be added in a later phase.

PostgreSQL support will also be added later.

---

# Expected Final Outcome

At the end of this phase:

- reusable template system exists
- templates are properly organized
- variable placeholders exist
- EJS rendering support exists
- template structure is scalable
- templates are generator-ready

No interactive CLI should exist yet.

---

# Final Template Structure

The repository must contain:

```txt
packages/
│
├── templates/
│   │
│   ├── express/
│   │   │
│   │   ├── modular/
│   │   │   │
│   │   │   ├── mongodb/
│   │   │   │   │
│   │   │   │   ├── src/
│   │   │   │   ├── package.json.ejs
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── .env.example.ejs
```

---

# Template System Goals

The template system must support:

- reusable source projects
- dynamic variable injection
- future feature composition
- future framework support
- future architecture support

---

# Required Template Capabilities

Templates must support:

- variable placeholders
- EJS rendering
- reusable configuration
- scalable folder organization

---

# Task 1 — Create Template Package Structure

## Subtasks

Create:

```txt
packages/templates/
```

Create framework structure:

```txt
templates/
 ├── express/
```

Create architecture structure:

```txt
express/
 ├── modular/
```

Create database structure:

```txt
modular/
 ├── mongodb/
```

---

## Expected Output

Proper hierarchical template organization exists.

---

# Task 2 — Move Golden Backend Into Template Structure

## Subtasks

Move the Phase 1 backend into:

```txt
templates/express/modular/mongodb/
```

---

## Requirements

The moved backend must remain runnable and production-ready.

---

# Task 3 — Convert Static Files Into Template Files

## Subtasks

Convert configurable files into EJS templates.

Examples:

```txt
package.json.ejs
.env.example.ejs
README.md.ejs
```

---

## Requirements

Templates must support variable injection.

---

# Task 4 — Define Template Variables

## Subtasks

Define supported template variables.

Examples:

```txt
PROJECT_NAME
PORT
PACKAGE_MANAGER
```

---

## Requirements

All placeholders must follow consistent naming conventions.

---

# Placeholder Naming Rules

## Rule 1

Use uppercase snake case.

GOOD:

```txt
PROJECT_NAME
```

BAD:

```txt
projectName
```

---

## Rule 2

Placeholders must remain framework-agnostic when possible.

---

# Task 5 — Setup EJS Rendering Strategy

## Subtasks

Define how templates will be rendered.

---

## Requirements

Support:

- variable interpolation
- conditional rendering
- future feature composition

---

## Example

```ejs
<%= PROJECT_NAME %>
```

---

# Task 6 — Create Template Metadata Structure

## Subtasks

Define metadata structure for templates.

---

## Requirements

Each template should define:

- framework
- architecture
- database
- supported features

---

## Example Structure

```json
{
  "framework": "express",
  "architecture": "modular",
  "database": "mongodb"
}
```

---

# Task 7 — Create Template Manifest Strategy

## Subtasks

Define how templates are discovered and resolved.

---

## Requirements

Template resolution must remain dynamic and scalable.

---

## BAD

```ts
if (express && mongodb)
```

---

## GOOD

```txt
resolve template path dynamically
```

---

# Task 8 — Create Shared Template Conventions

## Subtasks

Define:

- folder naming conventions
- file naming conventions
- placeholder conventions
- metadata conventions

---

## Requirements

All future templates must follow the same conventions.

---

# Task 9 — Validate Template Portability

## Subtasks

Verify templates can:

- be copied independently
- remain runnable
- remain isolated
- support future rendering

---

## Requirements

Templates must not depend on local development paths.

---

# Task 10 — Define Future Feature Compatibility

## Subtasks

Design template compatibility for future:

- validation features
- docker
- swagger
- auth
- testing

---

## Requirements

The template architecture must support feature injection without requiring template duplication.

---

# Task 11 — Create Template Documentation

## Subtasks

Document:

- template hierarchy
- rendering flow
- placeholder rules
- metadata rules
- scalability strategy

---

## Requirements

Documentation must clearly define how future templates should be created.

---

# Task 12 — Validate Template Reusability

## Subtasks

Verify:

- templates remain production-ready
- placeholders work correctly
- EJS rendering works correctly
- structure is scalable

---

# Expected Final Output

At the end of this phase:

- reusable templates exist
- templates are modular
- templates support variable injection
- templates support EJS rendering
- templates are future-proof
- templates are feature-compatible
- templates are generator-ready

---

# Phase 2 Completion Checklist

Phase 2 is complete ONLY IF all conditions below are satisfied.

---

# Template Structure

- [ ] templates package exists
- [ ] express template exists
- [ ] modular architecture template exists
- [ ] mongodb template exists

---

# Template Conversion

- [ ] Phase 1 backend moved into template structure
- [ ] templates remain runnable
- [ ] static files converted into templates
- [ ] EJS files exist where required

---

# Placeholder System

- [ ] placeholder strategy defined
- [ ] placeholder naming conventions defined
- [ ] placeholders support variable injection

---

# Rendering System

- [ ] EJS rendering strategy documented
- [ ] templates support interpolation
- [ ] templates support conditional rendering

---

# Template Metadata

- [ ] metadata structure exists
- [ ] framework metadata exists
- [ ] architecture metadata exists
- [ ] database metadata exists

---

# Scalability

- [ ] template hierarchy is scalable
- [ ] template system supports future frameworks
- [ ] template system supports future architectures
- [ ] template system supports future databases

---

# Feature Compatibility

- [ ] templates support future feature injection
- [ ] no feature duplication strategy exists
- [ ] templates remain composable

---

# Validation

- [ ] templates can be copied independently
- [ ] templates remain production-ready
- [ ] placeholders render correctly
- [ ] templates remain isolated and reusable

---

# Final Validation Criteria

Phase 2 is successful ONLY IF:

- reusable template architecture exists
- templates are scalable
- templates are composable
- templates are generator-ready
- templates support future feature injection
- templates remain production-ready
- no CLI implementation exists yet
- no generator engine exists yet
- no dependency installer exists yet
- no feature injection system exists yet
- no interactive prompt system exists yet
- the system is ready for generator engine development in the next phase
