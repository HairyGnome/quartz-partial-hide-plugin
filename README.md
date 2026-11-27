# Partial Hide Plugin

This plugin allows creators to hide section of their pages, while still making other sections available. The plugin removes hidden sections in build time, which means adding or removing hidden directives will not take effect on your website until you rebuild and redeploy it. This however also gives no way for users to read hidden sections from your site's source code.

**Note:** People who have access to your git repository can still read hidden sections from the source on GitHub.

## Requirements

- Node (tested of Node26)
- Npm

## Installation

1. Add the plugin to your `quartz.config.yaml`:

```yaml
plugins:
  - source:
      repo: "https://github.com/HairyGnome/quartz-partial-hide-plugin.git"
      ref: "v1.0.0"
    enabled: true
```

Add `-ai` to the end of the ref if you also want to install the agent-skill for the plugin. **Note:** Currently the agent skill installation only supports GitHub Copilot.

2. Run `npx quartz plugin resolve`

3. If you donwloaded the agent skill, you can install it by running the `node .quartz/plugins/partial-hide-plugin/scripts/install-skill.js` command. This script will install the agent skill in your workspace.

## Usage

To hide a section on you page simply use the `:::hidden` directive. For example:

```text
# This is a header

This line is visible.

:::hidden
This line is not visible.
This line is also not visible.
:::

This line is visible again.
```

**Note:** For a directive to hide the section of you page, it must be closed properly with `:::`.
