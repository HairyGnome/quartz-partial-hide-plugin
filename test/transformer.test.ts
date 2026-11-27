import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import type { Element, ElementContent, Root } from "hast";
import { PartialHideTransformer } from "../src/transformer";
import { createCtx } from "./helpers";

describe("PartialHideTransformer", () => {
  it("removes hidden sections from source", async () => {
    const source = `
# Heading

Some text

:::hidden
## Heading2

hidden text
\`\`\`ts
const x = 1;
\`\`\`

:::

More text
`;
    const ctx = createCtx();
    const transformer = PartialHideTransformer(ctx);

    const file = transformer?.textTransform?.(ctx, source) ?? source;

    expect(transformer).toBeDefined();
    expect(transformer?.name).toBe("PartialHideTransformer");
    expect(String(file)).not.toContain("## Heading2");
    expect(String(file)).not.toContain("hidden text");
    expect(String(file)).not.toContain("const x = 1;");
    expect(String(file)).toContain("# Heading");
    expect(String(file)).toContain("Some text");
    expect(String(file)).toContain("More text");
  });

  it("removes multiple hidden sections from source", async () => {
    const source = `
# Heading

Some text

:::hidden
## Heading2

hidden text
\`\`\`ts
const x = 1;
\`\`\`

:::

More text

:::hidden
## Heading3

more hidden text
\`\`\`ts
const y = 2;
\`\`\`

:::

Even more text
`;
    const ctx = createCtx();
    const transformer = PartialHideTransformer(ctx);

    const file = transformer?.textTransform?.(ctx, source) ?? source;

    expect(String(file)).not.toContain("## Heading2");
    expect(String(file)).not.toContain("hidden text");
    expect(String(file)).not.toContain("const x = 1;");
    expect(String(file)).not.toContain("## Heading3");
    expect(String(file)).not.toContain("more hidden text");
    expect(String(file)).not.toContain("const y = 2;");
    expect(String(file)).toContain("# Heading");
    expect(String(file)).toContain("Some text");
    expect(String(file)).toContain("More text");
    expect(String(file)).toContain("Even more text");
  });

  it("removes nested directives correctly", async () => {
    const source = `
# Heading

:::hidden
Some text 

\`\`\`ts
const x = 1;
\`\`\`

:::directive

this is a nested directive

:::

invisible text

:::

visible text

:::some-other-directive

also visible text

:::

`;

    const ctx = createCtx();
    const transformer = PartialHideTransformer(ctx);

    const file = transformer?.textTransform?.(ctx, source) ?? source;

    expect(String(file)).not.toContain("Some text");
    expect(String(file)).not.toContain("const x = 1;");
    expect(String(file)).not.toContain(":::directive");
    expect(String(file)).not.toContain(`:::hidden
Some text 

\`\`\`ts
const x = 1;
\`\`\`

:::directive

this is a nested directive

:::

invisible text

:::`);
    expect(String(file)).not.toContain("this is a nested directive");
    expect(String(file)).not.toContain("invisible text");
    expect(String(file)).toContain("# Heading");
    expect(String(file)).toContain("visible text");
    expect(String(file)).toContain("also visible text");
    expect(String(file)).toContain(":::some-other-directive");
  });
});
