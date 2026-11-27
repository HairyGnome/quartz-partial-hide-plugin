---
name: partial-hide-skill
description: Use when someone wants to omit part of a Quartz page from the generated site at build time using the partial-hide plugin's :::hidden directive.
---

# Hide page sections at build time

Use the partial-hide plugin when a page author wants a section omitted from the generated site, rather than merely concealed with styling or browser-side code.

Wrap the section with `:::hidden` and a closing `:::` on their own lines:

```markdown
This paragraph is included in the site.

:::hidden
This section, including its Markdown, is removed during the build.
:::

This paragraph is included too.
```

The transformer removes the opening marker, everything through the next `:::`, and the closing marker before Markdown rendering. The source Markdown remains unchanged; the section is omitted from the generated page. Multiple separate hidden sections can be used on one page.

## Important limitations

- Close every `:::hidden` block with `:::`. An unclosed marker is not removed as a block.
- Do not nest hidden blocks. The transformer closes a block at the first following `:::`.
- This is build-time omission, not access control. Anyone who can read the source repository can still read the hidden text.
- Enable/register the plugin's transformer in the Quartz site for the directive to take effect.