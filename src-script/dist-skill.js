import fs from "fs-extra";

const pluginName = "partial-hide-plugin";
const sourcePath = `resources/skills/${pluginName}/SKILL.md`;

const distPath = `dist/skills/${pluginName}/SKILL.md`;

function main() {
  fs.copyFileSync(sourcePath, distPath);
}

main();
