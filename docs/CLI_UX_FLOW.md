# CLI UX Flow

## Prompt Sequence

The CLI will use `prompts` to gather information from the user in the following order:

1.  **Project Name**
    - Type: `text`
    - Question: "What is your project name?"
    - Default: "my-monstack-app"

2.  **Framework**
    - Type: `select`
    - Question: "Select a framework"
    - Options: `Express` (Currently only one supported)

3.  **Architecture**
    - Type: `select`
    - Question: "Select an architecture style"
    - Options: `Traditional`, `Modular Monolith`

4.  **Database**
    - Type: `select`
    - Question: "Select a database"
    - Options: `MongoDB`, `PostgreSQL`

5.  **Package Manager**
    - Type: `select`
    - Question: "Select a package manager"
    - Options: `npm`, `yarn`, `pnpm` (Auto-detected if possible)

6.  **Features**
    - Type: `multiselect`
    - Question: "Select optional features"
    - Options: `Docker`, `Swagger`, `Auth`, `Testing`, `Redis`

## Terminal Feedback

- Use `ora` for long-running tasks (copying files, installing dependencies).
- Use `chalk` for color-coded status messages.
- Final output should clearly list the steps to start the application.
