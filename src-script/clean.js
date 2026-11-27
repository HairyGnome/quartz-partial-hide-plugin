import fs from "fs-extra";

function main() {
  fs.rmSync("dist", { recursive: true, force: true });
  console.log("Cleaned up dist folder");
}

main();
