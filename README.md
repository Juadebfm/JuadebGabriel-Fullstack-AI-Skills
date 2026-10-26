# Beginner Project Builder Skills

Four beginner-friendly AI skills that help you plan, build, secure, and deploy web projects. They are written for people learning HTML, CSS, and JavaScript, and work with MERN and other stacks.

You can use them with Claude Code, Codex, Cursor, GitHub Copilot Chat in VS Code, and Gemini CLI. The skills inspect your project so you do not need to know which skill or technology to choose first.

## The four areas

| Area                              | What it helps with                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Project research and requirements | Turn an idea or brief into a clear plan, research important unknowns, inspect an existing project, and understand Figma screenshots or PDFs. |
| Frontend                          | Plan and build pages and interactions, create a small design system, and check usability, accessibility, and frontend security.              |
| Backend                           | Plan APIs, system design, database structure, authentication, authorization, and backend security.                                           |
| Deployment                        | Choose hosting based on project purpose and budget, prepare the project, deploy with your permission, and check the live app.                |

Install all four skills. Describe what you want in normal language; the AI should inspect the repository and choose the relevant area. For an existing project, run the AI from that project's folder so it can inspect the files. You do not need to use MERN or know the skill names.

## Install

Use the project installer to install all four skills and choose how to use them immediately afterward. Run a project install from the root folder of the project where you want to use the skills.

The installer requires Node.js 18 or later and an internet connection to download the skills CLI and skill files.

### Install in one project

```bash
npx --yes --package=github:Juadebfm/JuadebGabriel-Fullstack-AI-Skills -- juadeb-skills --agent codex
```

Replace `codex` with the agent you use:

| Agent                          | CLI name         |
| ------------------------------ | ---------------- |
| Claude Code                    | `claude-code`    |
| Codex                          | `codex`          |
| Cursor                         | `cursor`         |
| GitHub Copilot Chat in VS Code | `github-copilot` |
| Gemini CLI                     | `gemini-cli`     |

To install for more than one agent, repeat `--agent` with each name. For example:

```bash
npx --yes --package=github:Juadebfm/JuadebGabriel-Fullstack-AI-Skills -- juadeb-skills --agent codex --agent cursor
```

After the skills install, the CLI asks you to choose:

1. **Use the normal AI skills** — describe your project task in your AI app.
2. **Opt into Harness Engineering (advanced users only)** — the CLI prints a ready-to-copy first message for your AI. Paste it into the AI app working in the project. It asks the AI to explain the harness workflow and its authorship before inspecting the project and proposing a tailored plan.

The installer cannot send a message directly into every supported AI app, so the advanced option requires you to paste the printed message into the AI chat. It starts a guided assessment and plan; it does not silently add project scripts or configuration. To choose a mode without the interactive question, pass `--mode normal` or `--mode harness`. Without an interactive terminal, normal mode is selected unless you pass `--mode harness`.

### Install for all your projects

Use `--global` to install the skills for your personal account instead of just the current project:

```bash
npx --yes --package=github:Juadebfm/JuadebGabriel-Fullstack-AI-Skills -- juadeb-skills --global --agent codex
```

Remove `--global` to install into the current project. Other options are passed to the official [`skills` CLI](https://github.com/vercel-labs/skills), including `--yes` if you want to skip its install confirmations. The normal-versus-harness choice is separate unless you pass `--mode`.

### Install from a local checkout

You can try local changes before they are available on GitHub. From the project where you want to try the skills, run the command below with the path to your local copy:

```bash
npm install --prefix /path/to/JuadebGabriel-Fullstack-AI-Skills
node /path/to/JuadebGabriel-Fullstack-AI-Skills/bin/juadeb-skills.mjs --source /path/to/JuadebGabriel-Fullstack-AI-Skills --agent codex
```

If you install directly with `npx skills add`, the standard installer installs the skill files but does not ask the normal-versus-harness question. Use `juadeb-skills` when you want that choice as part of installation.

### Check or update an installation

```bash
npx skills list
npx skills update
```

The CLI chooses the correct skill folder for the selected agent. See its [current supported-agent list](https://github.com/vercel-labs/skills/blob/main/docs/agents.md) and [command guide](https://github.com/vercel-labs/skills/blob/main/docs/commands.md) for changes to agent names or installation options.

## How to use the skills

After installing, ask for help in normal language. The examples below are starting points: replace the text in square brackets with your own details, or just describe your idea. You can attach a brief, screenshot, or PDF when it helps.

### 1. Research and requirements

Use this area to explore an idea, understand an existing codebase, or turn a rough prompt into a buildable plan.

**Starting a project**

> I want to build a [type of app] for [who will use it]. The problem is [problem]. Help me define a small first version. Research only questions that could change the plan, ask me short questions with options when useful, and recommend a simple build order. Wait for my approval before building.

**Understanding an existing project**

> Inspect this project and tell me briefly whether it is frontend-only, backend-only, or fullstack, what seems to be working already, and what this request would affect. I want to add [feature]. Ask only the questions that could change the plan.

**Sharing a Figma design or screenshot**

> I attached a screenshot/PDF of my design. Describe the visible screens, content, and controls. Tell me what you cannot know from the image, then ask any short questions needed to plan the implementation. Keep the design's intent when we build it.

**Improving a risky or unclear request**

> I want to [rough request]. Check whether this could cause a security, usability, or project problem. Explain the concern simply and suggest a safer version that still meets my goal. Ask me before changing the goal.

### 2. Frontend and design system

Use this area for pages, components, responsive layouts, visual design, and user experience. The AI should inspect your current interface first, then consult the built-in [product design catalog](skills/frontend/references/design-catalog.md) and [real-page reference library](skills/frontend/references/page-references.md) for relevant ideas. It should ask a few focused questions about the audience, main action, and design direction, then build from the agreed direction without making you wait for a separate mockup. These references guide original work; they are not templates to copy.

**Build a page or feature**

> Build a [page/feature] for [user and purpose] in this project. Inspect the existing UI first. If the design direction is unclear, show me two or three distinct options and recommend one. Create a small design system that fits this product, then build the interface directly. Keep it responsive, accessible, and visually specific to this product rather than generic.

**Create or continue a design system**

> Help me set a design direction for [product/audience]. Ask me a few short questions with clear choices if needed. Recommend colors, typography, spacing, layout, and reusable components that fit the product. Keep the system small enough for me to maintain, and follow it when building [screens].

**Improve an existing interface**

> Review [page/flow] for confusing steps, accessibility problems, mobile layout issues, and visual consistency. Explain the most important problems briefly, recommend improvements, then update the code after I approve the plan.

### 3. Backend, system design, database, and security

Use this area for APIs, data, authentication, permissions, and server behavior. You do not have to choose a database or identifier in advance; explain what the app needs and ask the AI to recommend a suitable approach with a short reason and useful alternatives.

**Plan system and database design**

> I need [feature] to store and use [kinds of information]. Inspect the current project and recommend a simple system design and database structure based on the relationships, queries, and rules this feature needs. Explain the main tradeoffs in plain language. Ask only questions that would change the design, then wait for my approval before building.

**Build a secure feature**

> Add [feature] to this project. Inspect the existing API and data model first. Plan the routes or operations, data changes, validation, and who is allowed to do what. Build it with security included as you go, check the important cases, and explain what you actually verified.

**Review authentication or permissions while building**

> Build [signup/login/password reset/role-based access] for this app. First inspect the existing authentication setup and explain a short plan. Protect every relevant server action and record; do not rely on hidden or hard-to-guess IDs for permission checks. Build and check the feature in small steps, and ask before any unrelated or live change.

### 4. Deployment and after-launch checks

Use this area to prepare or deploy a project. The AI should inspect the actual stack and current provider information. For a personal project, it should ask what the project is for first, then ask whether hosting must stay free or can have a monthly budget. It should recommend a setup and mention alternatives only when useful.

**Choose hosting**

> Help me deploy this project. Inspect its framework, database, and build and start commands. First ask what the project is for if you cannot tell; then ask whether hosting must stay free or if I have a monthly budget. Recommend a suitable setup and check current provider pricing and limits.

**Get guidance or ask the AI to do a step**

> Guide me through deploying this project one step at a time. At each important step, let me choose whether you should explain it or do it for me. Before doing a step, explain what it changes and ask my permission. Do not publish or change production without my approval immediately before the action.

**Ask for a post-deployment review**

> The [feature] is deployed. Explain the scope of a security and bug check for it, then ask my permission before testing the live app. Tell me which checks are safe to run and which could change data, create accounts, or cost money.

## What to expect from the AI

- It should inspect project files and instructions before recommending changes to an existing project.
- It should classify the project from evidence as frontend-only, backend-only, fullstack, or unclear, and say when it is unsure.
- It should ask enough short questions to understand the request, but skip questions already answered by your prompt or project files. You can answer in your own words or choose from options.
- It should explain technical choices simply, recommend one approach, and mention alternatives when they help you decide.
- It should build features to meet the agreed requirements and include security and quality checks while building, not rely on a later review to fix avoidable problems.
- For a new project or substantial feature, expect a short plan and a chance to approve or adjust it before building.
- A separate live security or bug review after deployment requires your permission before the AI probes the live app.
- It should say what it checked and what it could not check. Do not treat source review as proof that a live deployment is secure.

If the right skill does not seem to activate, ask directly: “Use the [frontend/backend/deployment/project research] skill for this request.” Skill discovery and activation can vary by AI app.

## License and inspiration

This project is licensed under the [MIT License](LICENSE). The skills are original work informed by workflows and design patterns from other skill projects; their text, code, and datasets are not bundled here.
