import type { QuartzTransformerPlugin, BuildCtx } from "@quartz-community/types";
import type { PartialHideTransformerOptions } from "./types";

/**
 * Transformer plugin that removes hidden sections from source at build time
 */
export const PartialHideTransformer: QuartzTransformerPlugin<
  Partial<PartialHideTransformerOptions>
> = () => {
  return {
    name: "PartialHideTransformer",
    textTransform(_ctx: BuildCtx, src: string) {
      const directiveStack: string[] = [];
      const lines = src.split("\n");
      const retainedLines: string[] = [];

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
    },
  };
};
