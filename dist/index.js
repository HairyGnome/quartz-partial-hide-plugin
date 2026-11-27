import { createRequire } from 'module';

createRequire(import.meta.url);

// src/transformer.ts
var PartialHideTransformer = () => {
  return {
    name: "PartialHideTransformer",
    textTransform(_ctx, src) {
      const directiveStack = [];
      const lines = src.split("\n");
      const retainedLines = [];
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith(":::hidden")) {
          directiveStack.push("hidden");
        } else if (trimmedLine.match(/^:::[\w-]+$/)) {
          const directive = trimmedLine.slice(3);
          directiveStack.push(directive);
        }
        if (!directiveStack.includes("hidden")) {
          retainedLines.push(line);
        }
        if (trimmedLine === ":::") {
          directiveStack.pop();
        }
      }
      return retainedLines.join("\n");
    }
  };
};

export { PartialHideTransformer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map