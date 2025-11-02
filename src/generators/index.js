const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Template paths
const templatesDir = path.join(__dirname, "templates");

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFile(filePath, content) {
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  console.log(chalk.gray(`  ✓ Created ${filePath}`));
}

async function generateNodeJs() {
  const templates = {
    "package.json": fs.readFileSync(
      path.join(templatesDir, "nodejs", "package.json"),
      "utf8"
    ),
    "index.js": fs.readFileSync(
      path.join(templatesDir, "nodejs", "index.js"),
      "utf8"
    ),
    "routes/users.js": fs.readFileSync(
      path.join(templatesDir, "nodejs", "route", "routes-users.js"),
      "utf8"
    ),
    "controllers/userController.js": fs.readFileSync(
      path.join(
        templatesDir,
        "nodejs",
        "handler",
        "controller-userController.js"
      ),
      "utf8"
    ),
    "models/User.js": fs.readFileSync(
      path.join(templatesDir, "nodejs", "model", "models-User.js"),
      "utf8"
    ),
    "helper/connection.js": fs.readFileSync(
      path.join(templatesDir, "nodejs", "helper", "connection.js"),
      "utf8"
    ),
    "middleware/auth.js": fs.readFileSync(
      path.join(templatesDir, "nodejs", "helper", "middleware-auth.js"),
      "utf8"
    ),
    ".env.example": fs.readFileSync(
      path.join(templatesDir, "nodejs", ".env.example"),
      "utf8"
    ),
    "README.md": fs.readFileSync(
      path.join(templatesDir, "nodejs", "README.md"),
      "utf8"
    ),
  };

  for (const [filePath, content] of Object.entries(templates)) {
    writeFile(filePath, content);
  }
}

async function generateNestJs() {
  const templates = {
    "package.json": fs.readFileSync(
      path.join(templatesDir, "nestjs", "package.json"),
      "utf8"
    ),
    "tsconfig.json": fs.readFileSync(
      path.join(templatesDir, "nestjs", "tsconfig.json"),
      "utf8"
    ),
    "nest-cli.json": fs.readFileSync(
      path.join(templatesDir, "nestjs", "nest-cli.json"),
      "utf8"
    ),
    "src/main.ts": fs.readFileSync(
      path.join(templatesDir, "nestjs", "main.ts"),
      "utf8"
    ),
    "src/app.module.ts": fs.readFileSync(
      path.join(templatesDir, "nestjs", "app.module.ts"),
      "utf8"
    ),
    "src/users/users.controller.ts": fs.readFileSync(
      path.join(
        templatesDir,
        "nestjs",
        "user",
        "controller",
        "users-controller.ts"
      ),
      "utf8"
    ),
    "src/users/users.service.ts": fs.readFileSync(
      path.join(templatesDir, "nestjs", "user", "service", "users-service.ts"),
      "utf8"
    ),
    "src/users/users.module.ts": fs.readFileSync(
      path.join(templatesDir, "nestjs", "user", "users-module.ts"),
      "utf8"
    ),
    "src/users/dto/create-user.dto.ts": fs.readFileSync(
      path.join(
        templatesDir,
        "nestjs",
        "user",
        "dto",
        "dto-create-user.dto.ts"
      ),
      "utf8"
    ),
    "src/users/dto/update-user.dto.ts": fs.readFileSync(
      path.join(
        templatesDir,
        "nestjs",
        "user",
        "dto",
        "dto-update-user.dto.ts"
      ),
      "utf8"
    ),
    "src/users/entities/user.entity.ts": fs.readFileSync(
      path.join(
        templatesDir,
        "nestjs",
        "user",
        "entity",
        "entities-user.entity.ts"
      ),
      "utf8"
    ),
    ".env.example": fs.readFileSync(
      path.join(templatesDir, "nestjs", ".env.example"),
      "utf8"
    ),
    "README.md": fs.readFileSync(
      path.join(templatesDir, "nestjs", "README.md"),
      "utf8"
    ),
  };

  for (const [filePath, content] of Object.entries(templates)) {
    writeFile(filePath, content);
  }
}

async function generatePython() {
  const templates = {
    "package.json": fs.readFileSync(
      path.join(templatesDir, "python", "package.json"),
      "utf8"
    ),
    "app/__init__.py": "",
    "app/main.py": fs.readFileSync(
      path.join(templatesDir, "python", "main.py"),
      "utf8"
    ),
    "app/models/__init__.py": "",
    "app/schemas/__init__.py": "",
    "app/routers/__init__.py": fs.readFileSync(
      path.join(templatesDir, "python", "__init__.py"),
      "utf8"
    ),
    "app/models/user.py": fs.readFileSync(
      path.join(templatesDir, "python", "model", "models-user.py"),
      "utf8"
    ),
    "app/schemas/user.py": fs.readFileSync(
      path.join(templatesDir, "python", "schema", "schemas-user.py"),
      "utf8"
    ),
    "app/routers/users.py": fs.readFileSync(
      path.join(templatesDir, "python", "router", "routers-users.py"),
      "utf8"
    ),
    "requirements.txt": fs.readFileSync(
      path.join(templatesDir, "python", "requirements.txt"),
      "utf8"
    ),
    ".env.example": fs.readFileSync(
      path.join(templatesDir, "python", ".env.example"),
      "utf8"
    ),
    "README.md": fs.readFileSync(
      path.join(templatesDir, "python", "README.md"),
      "utf8"
    ),
  };

  for (const [filePath, content] of Object.entries(templates)) {
    writeFile(filePath, content);
  }
}

module.exports = {
  generateNodeJs,
  generateNestJs,
  generatePython,
};
