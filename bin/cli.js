#!/usr/bin/env node

const { prompt } = require("enquirer");
const chalk = require("chalk");
const {
  generateNodeJs,
  generateNestJs,
  generatePython,
} = require("../src/generators");

async function main() {
  console.log(chalk.greenBright.bold("\n✨ Welcome to Auth Pulse SDK! ✨\n"));
  console.log(
    chalk.gray(
      "Auth Pulse helps you set up user authentication CRUD operations for your preferred backend framework.\n"
    )
  );

  // Welcome message with continue choice
  const { shouldContinue } = await prompt({
    type: "confirm",
    name: "shouldContinue",
    message: "Would you like to continue?",
    initial: true,
  });

  if (!shouldContinue) {
    console.log(
      chalk.red("\n👋 Thanks for checking out Auth Pulse! See you next time.\n")
    );
    process.exit(0);
  }

  // Framework selection
  const frameworkChoices = [
    { name: "Node.js (Express)", value: "nodejs" },
    { name: "NestJS", value: "nestjs" },
    { name: "Python (FastAPI)", value: "python" },
  ];

  const { framework } = await prompt({
    type: "select",
    name: "framework",
    message: "Select your preferred backend framework:",
    choices: frameworkChoices,
    limit: 3,
  });

  // Normalize framework value (enquirer might return name or value)
  const normalizedFramework =
    frameworkChoices.find(
      (choice) => choice.name === framework || choice.value === framework
    )?.value || framework;

  const frameworkDisplayName =
    frameworkChoices.find((choice) => choice.value === normalizedFramework)
      ?.name || normalizedFramework;

  console.log(
    chalk.cyan(`\n🔧 Setting up your ${frameworkDisplayName} project...\n`)
  );

  try {
    const generators = [
      { value: "nodejs", generator: generateNodeJs, name: "Node.js" },
      { value: "nestjs", generator: generateNestJs, name: "NestJS" },
      { value: "python", generator: generatePython, name: "Python" },
    ];

    const selectedGenerator = generators.find(
      (gen) => gen.value === normalizedFramework
    );

    if (!selectedGenerator) {
      throw new Error(`Unknown framework: ${normalizedFramework}`);
    }

    // Loading indicator
    const spinnerChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let spinnerIndex = 0;
    const spinnerInterval = setInterval(() => {
      process.stdout.write(
        `\r${chalk.cyan(spinnerChars[spinnerIndex])} Generating files...`
      );
      spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
    }, 100);

    try {
      await selectedGenerator.generator();
    } finally {
      clearInterval(spinnerInterval);
      process.stdout.write("\r" + " ".repeat(30) + "\r"); // Clear spinner line
    }

    console.log(chalk.green.bold("\n✅ Completed 💯\n"));
    console.log(
      chalk.gray("Your user authentication CRUD operations have been set up!\n")
    );

    // Installation instructions
    const currentDir = process.cwd();

    if (normalizedFramework === "python") {
      console.log(chalk.yellow.bold("📦 Next steps:\n"));
      console.log(chalk.white("1. Create a virtual environment:"));
      console.log(chalk.cyan("   python -m venv venv\n"));
      console.log(chalk.white("2. Activate the virtual environment:"));
      console.log(
        chalk.cyan(
          "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate\n"
        )
      );
      console.log(chalk.white("3. Install dependencies:"));
      console.log(chalk.cyan("   pip install -r requirements.txt\n"));
    } else {
      console.log(chalk.yellow.bold("📦 Next steps:\n"));
      console.log(
        chalk.white(
          "1. Install dependencies using your preferred package manager:"
        )
      );
      console.log(chalk.cyan("   npm install"));
      console.log(chalk.cyan("   # or"));
      console.log(chalk.cyan("   yarn install"));
      console.log(chalk.cyan("   # or"));
      console.log(chalk.cyan("   pnpm install\n"));
    }

    console.log(chalk.white("📝 Don't forget to:"));
    console.log(
      chalk.cyan(`   - Copy .env.example to .env and update the values`)
    );
    console.log(chalk.cyan(`   - Update your database connection string`));
    console.log(chalk.cyan(`   - Set a secure JWT_SECRET\n`));
    console.log(
      chalk.gray(`Files have been generated in: ${chalk.white(currentDir)}\n`)
    );
  } catch (error) {
    console.error(chalk.red("\n❌ Error setting up project:"), error.message);
    process.exit(1);
  }
}

main().catch(console.error);
