import fs from "fs-extra";

const argTypes = {
  "--distribute-skill": {
    name: "distSkill",
    required: false,
    type: "boolean",
  },
};

const defaultArgs = {
  distSkill: false,
};

const pluginName = "partial-hide-plugin";
const sourcePath = `resources/skills/${pluginName}/SKILL.md`;

const skillDistPath = `dist/skills/${pluginName}/SKILL.md`;

const pargeArgs = (args) => {
  const parsedArgs = { ...defaultArgs };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg in argTypes) {
      if (argTypes[arg].type === "boolean") {
        parsedArgs[argTypes[arg].name] = true;
      } else {
        const argName = argTypes[arg].name;
        if (args[i + 1] === undefined) throw new Error(`Missing value for argument ${arg}`);
        parsedArgs[argName] = args[i + 1];
      }
    }
  }
  return parsedArgs;
};

function cleanUpDist(args) {
  const folders = fs
    .readdirSync("dist")
    .filter((file) => fs.statSync(`dist/${file}`).isDirectory());
  for (const folder of folders) {
    if (fs.readdirSync(`dist/${folder}`).length === 0) {
      fs.removeSync(`dist/${folder}`);
    }
  }
  console.log("Removed empty folders from dist");
}

function moveDistFiles(args) {
  fs.mkdirSync(`dist/${pluginName}`, { recursive: true });
  const fixedDistPath = `dist/${pluginName}`;
  for (const file of fs.readdirSync("dist")) {
    if (file !== pluginName) fs.renameSync(`dist/${file}`, `${fixedDistPath}/${file}`);
  }
  console.log(`Moved dist files to ${fixedDistPath}`);
}

function distributeSkill(args) {
  if (!args.distSkill) return;
  fs.mkdirSync(`dist/skills/${pluginName}`, { recursive: true });
  fs.copyFileSync(sourcePath, skillDistPath);
  console.log(`Copied SKILL.md to ${skillDistPath}`);
}

function main() {
  const args = pargeArgs(process.argv.slice(2));
  cleanUpDist(args);
  moveDistFiles(args);
  distributeSkill(args);
}

main();
