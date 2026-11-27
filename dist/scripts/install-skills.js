import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pluginDir = path.resolve(__dirname, "..");

const quartzRoot = process.cwd();

const skillName = "partial-hide-plugin";

const source = path.join(pluginDir, "skills", skillName);
const destination = path.join(quartzRoot, ".github", "skills", skillName);

try {
  await fs.access(path.join(source, "SKILL.md"));

  await fs.mkdir(path.dirname(destination), { recursive: true });

  await fs.cp(source, destination, {
    recursive: true,
    force: true,
  });

  console.log(`Installed Copilot skill: ${skillName}`);
} catch (error) {
  console.error("Failed to install Copilot skill:", error);
  process.exitCode = 1;
}
