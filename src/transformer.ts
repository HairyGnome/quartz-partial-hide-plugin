import type { QuartzTransformerPlugin, BuildCtx } from "@quartz-community/types";
import type { PartialHideTransformerOptions } from "./types";

const removeRegex = /:::hidden[\s\S]*?:::/g;

/**
 * Transformer plugin that removes hidden sections from source at build time
 */
export const PartialHideTransformer: QuartzTransformerPlugin<
  Partial<PartialHideTransformerOptions>
> = () => {
  return {
    name: "PartialHideTransformer",
    textTransform(_ctx: BuildCtx, src: string) {
      return src.replaceAll(removeRegex, "");
    },
  };
};
