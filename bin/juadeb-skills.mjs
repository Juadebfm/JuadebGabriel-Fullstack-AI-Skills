#!/usr/bin/env node

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import spawn from "cross-spawn";

const defaultSource = "Juadebfm/JuadebGabriel-Fullstack-AI-Skills";
const harnessPrompt = `I chose the advanced Harness Engineering option for this project.

In no more than three short sentences, explain:
- This mode checks what the project already has and suggests a simple way to plan, build, and check the work. Ask before adding files, tools, or project settings.
- It combines four skill guides (project planning, frontend, backend, and deployment) with shared instructions for inspecting the project, handing work between areas, and checking important steps. It is not a separate program or hidden tool.
- The skill set was created by Julius Adebowale Gabriel and is credited in the repository's MIT license.

Then inspect the current project and its instructions. First decide whether this is a new project or an existing app. If it is new or has no app code yet, say so plainly and help the user start with their idea. Do not call the project type "unclear" or ask whether the app code is somewhere else unless there is evidence that it exists elsewhere. If the user has not shared an idea, ask what they want to build before asking technical setup questions.

Once the idea shows that both frontend and backend are needed, ask how to organize them only if the user has not already decided:
1. One repository, one shared branch, separate frontend and backend folders (a monorepo).
2. One repository with separate long-lived frontend and backend branches.
3. Separate frontend and backend repositories.
4. Not sure; recommend a setup after learning what the project needs.

Keep the first reply under 120 words, use plain language, and avoid unexplained terms such as "harness" or "feedback loop." Recommend based on the user's needs, mention tradeoffs simply, and reuse any preference already stated. For an existing app, briefly describe its structure and checks that are actually available. Suggest one small next step. Ask before project changes or consequential actions.`;

function printHelp() {
  stdout.write(`Juadeb AI Skills installer

Usage:
  juadeb-skills [skills CLI options]

Examples:
  juadeb-skills --agent codex
  juadeb-skills --agent codex --agent cursor --global
  juadeb-skills --agent codex --mode harness

Installer options:
  --mode normal|harness   Choose the onboarding option without prompting
  --source <repo-or-path> Install from a different GitHub repository or local checkout
  --help                  Show this help

All other options are passed to the official skills CLI. If --mode is omitted,
the installer asks whether to use the normal skills or advanced Harness Engineering.
`);
}

function parseArgs(args) {
  let mode;
  let source = defaultSource;
  const skillsArgs = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "--help" || arg === "-h") {
      return { help: true };
    }

    if (arg === "--mode") {
      if (!args[i + 1] || args[i + 1].startsWith("--")) {
        throw new Error("Provide normal or harness after --mode.");
      }
      mode = args[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith("--mode=")) {
      mode = arg.slice("--mode=".length);
      continue;
    }

    if (arg === "--source") {
      if (!args[i + 1] || args[i + 1].startsWith("--")) {
        throw new Error("Provide a repository or path after --source.");
      }
      source = args[i + 1];
      i += 1;
      continue;
    }
    if (arg.startsWith("--source=")) {
      source = arg.slice("--source=".length);
      continue;
    }

    if (arg === "--") {
      skillsArgs.push(...args.slice(i + 1));
      break;
    }

    skillsArgs.push(arg);
  }

  if (mode !== undefined && !["normal", "harness"].includes(mode)) {
    throw new Error("Choose --mode normal or --mode harness.");
  }
  if (!source.trim()) {
    throw new Error("Provide a repository or path after --source.");
  }

  return { help: false, mode, source, skillsArgs };
}

function installSkills(source, skillsArgs) {
  return new Promise((resolve, reject) => {
    const npx = process.platform === "win32" ? "npx.cmd" : "npx";
    const child = spawn(
      npx,
      ["--yes", "--package=skills@latest", "--", "skills", "add", source, "--skill", "*", ...skillsArgs],
      { stdio: "inherit" },
    );

    child.once("error", reject);
    child.once("close", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(signal ? `Installation stopped (${signal}).` : `The skills CLI exited with code ${code ?? 1}.`));
    });
  });
}

async function askMode() {
  if (!stdin.isTTY || !stdout.isTTY) {
    stdout.write(`\nSkills installed. No interactive terminal was available, so normal skills use is selected by default.\nTo start advanced Harness Engineering onboarding later, rerun this installer with --mode harness.\n`);
    return "normal";
  }

  const rl = createInterface({ input: stdin, output: stdout });
  try {
    stdout.write(`\nInstallation is complete. How would you like to use the skills?\n\n`);
    stdout.write(`1. Use the normal AI skills\n`);
    stdout.write(`   Describe what you want to build; the AI will use the relevant skill.\n\n`);
    stdout.write(`2. Opt into Harness Engineering (advanced users only)\n`);
    stdout.write(`   Get a guided, project-specific plan for improving the AI's context, tools, checks, and feedback loop.\n\n`);

    while (true) {
      const answer = (await rl.question("Choose 1 or 2: ")).trim().toLowerCase();
      if (["1", "normal"].includes(answer)) return "normal";
      if (["2", "harness", "advanced"].includes(answer)) return "harness";
      stdout.write("Enter 1 for normal skills or 2 for advanced Harness Engineering.\n");
    }
  } finally {
    rl.close();
  }
}

function printSelection(mode) {
  if (mode === "normal") {
    stdout.write(`\nNormal skills selected. Open your AI app and describe the project task you want help with.\n`);
    return;
  }

  stdout.write(`\nHarness Engineering selected (advanced). Copy this as your first message to the AI working in the project:\n\n`);
  stdout.write("----- BEGIN HARNESS ONBOARDING PROMPT -----\n");
  stdout.write(`${harnessPrompt}\n`);
  stdout.write("----- END HARNESS ONBOARDING PROMPT -----\n");
  stdout.write(`\nThe installer cannot send a message directly into every supported AI app, so paste the prompt above into that project's AI chat to begin.\n`);
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    stdout.write(`${error.message}\n\n`);
    printHelp();
    process.exitCode = 2;
    return;
  }

  if (options.help) {
    printHelp();
    return;
  }

  try {
    await installSkills(options.source, options.skillsArgs);
  } catch (error) {
    stdout.write(`\n${error.message}\n`);
    process.exitCode = 1;
    return;
  }

  try {
    const mode = options.mode ?? (await askMode());
    printSelection(mode);
  } catch (error) {
    if (error.name === "AbortError") {
      stdout.write(`\nSkills are installed. You can choose a mode later by rerunning this installer with --mode normal or --mode harness.\n`);
      process.exitCode = 130;
      return;
    }
    throw error;
  }
}

await main();
