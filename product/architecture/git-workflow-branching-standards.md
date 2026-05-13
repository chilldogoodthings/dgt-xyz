# Git Workflow & Branching Standards V3

**Line Spacing: 1.15**

## 1. Scoped Branch Naming Convention

To support our monorepo architecture, all branches must follow the **Scoped Approach**. This ensures clarity regarding whether a change is isolated to a specific project or affects the repository as a whole.

**Format:** `<type>(<scope>): <description>`

| Scope        | Application                                                         | Example Branch Name                     |
| :----------- | :------------------------------------------------------------------ | :-------------------------------------- |
| **repo**     | Changes affecting multiple projects/packages simultaneously.        | `feat(repo): integrate-global-auth`     |
| **root**     | Top-level configurations, monorepo setup, and workspace-only files. | `chore(root): update-workspace-configs` |
| **frontend** | Next.js application code and UI components.                         | `feat(frontend): add-hero-section`      |
| **studio**   | Sanity CMS schemas, structure, and configuration.                   | `chore(studio): add-author-schema`      |

## 2. General Git Flow Workflow

Our workflow prioritizes a stable `main` branch and a rigorous integration process through `develop`.

- **Origin:** `develop` is branched from `main`.
- **Development:** Scoped branches (`feat/`, `chore/`, `init/`) are created from `develop`.
- **Verification:** All changes are tested and verified locally within their specific scope before merging.
- **Integration:** Work branches are merged back into `develop` once verified.
- **Release:** Once `develop` reaches a milestone (e.g., MVP), a release is finalized.
- **Production:** `develop` is merged into `main` to trigger production deployment.

## 3. Commit Syntax Summary

Commit messages must reflect the scoped nature of the change:

- `feat(repo): sync environment variables across studio and frontend`
- `chore(root): initialize monorepo workspace and gitignore`
- `feat(frontend): setup next.js baseline`
- `chore(studio): initialize sanity schemas`

## 4. Workflow Visualization

```text
[Production] main
               └── [Integration] develop
                                   ├── feat(repo): multi-project-update
                                   ├── chore(root): workspace-config
                                   ├── feat(frontend): new-ui
                                   └── chore(studio): cms-config
```
