````markdown
# dgt-xyz - Digital Ecosystem

Do Good Things Front Door: A high-performance monorepo utilizing Sanity CMS for headless content management and Next.js for a localized, dual-layout frontend.

---

## 📂 Project Structure

This monorepo is designed to be tool-agnostic while providing a seamless experience in VS Code.

- **`dgt-xyz-workspace`**: (Local Only) VS Code workspace file for managing multiple project roots.
- **`/` (Root)**: The parent directory containing monorepo configuration, `.nvmrc`, and shared `package.json`.
- **`/dgt-xyz-web`**: The Next.js frontend application (App Router).
- **`/studio-dgt-xyz`**: The Sanity Studio "blueprints" (schemas, config, and structure).

```bash
/dgt-xyz
├── .ai/                          # Global AI Orchestration (Agent-Agnostic)
│   ├── infra/                    # The "Engine Room"
│   │   ├── venv/                 # Isolated Python env
│   │   ├── router-config.yaml    # The brain of your Complexity Router
│   │   └── litellm.log           # Local proxy runtime logs
│   ├── scripts/                  # Shared utility scripts (optional)
│   │   └── sidekick.sh           # Proxy launcher script
│   ├── context/                  # The Agent's "Brain" (Read-Only for LLM)
│   │   ├── roles/
│   │   │   └── sidekick-rules.md     # Latest Core Rules (authoritative)
│   │   └── workflows/
│   │       └── transition-logic.md   # Transition, Turn Logic & Status Matrix
│   └── templates/
│       ├── github-issue-detail-template-default.md     # Standardized issue detail log template
│       └── dgt-issue-template.md                       # Standardized issue template; what to expect from an issue
├── .roo/                         # Roo Code specific configuration (co-located)
│   ├── system-prompt-dgt.md      # Master system prompt for Roo
│   └── rules.md                  # Additional Roo-specific rules (optional)
├── product/                      # All design & state-machine artifacts
│   ├── architecture/             # System-wide logic & decisions
│   │   ├── git-workflow-branching-standards.md
│   │   ├── site-wireframes.md
│   │   └── future-features.md    # Localization, Members, Ads, etc.
│   ├── design/                   # The "Global Truth" (LLM always reads this)
│   │   └── brand/                # Brand-specific assets and guidelines (canonical ground truth)
│   │       ├── style-guide.md
│   │       ├── brand-assets/     # Logos, Monograms, SVGs
│   │       └── icons/            # Icon grid
│   └── issues/                   # The State-Machine (Stateful Work)
│       └── <yyyymmdd>-<type>-<ID>-<Title>/   # e.g. 20260428-story-001-test-header-scaffold
│           ├── request/          # Immutable Input (Specs, Images, Prompt)
│           ├── execution-log/    # Append-only logs (output-YYYYMMdd-HHMMSS.log)
│           └── output/           # Turn-based iterations
│               ├── turn-1-inprogress/
│               │   ├── inprogress-github-issue-details.md
│               │   └── <work-files>
│               ├── turn-2-staging/
│               │   └── staging-github-issue-details.md
│               └── turn-n-<status>/   # e.g. turn-3-deploy, final-turn (human only)
├── dgt-xyz-web                     # The actual Next.js + Sanity project (monorepo)
│   ├── public/
│   ├── src/
│   └── ...                      # Standard Next.js/Sanity structure
├── studio-dgt-xyz               # Standard Sanity structure
└── README.md                    # Project overview & setup instructions
```
````

---

## 🤖 AI Orchestration & Sidekick Setup

This repository uses **Roo Code** integrated with a local **LiteLLM** proxy to manage private, cost-effective AI workflows.

### 1. Start the LiteLLM Proxy

Before using Roo Code, you must start the local "Sidekick" router. This manages your API keys and routes traffic based on task complexity.

```bash
# From the project root
bash .ai/scripts/sidekick.sh

```

- **Verification:** You should see `✅ LiteLLM router started!`. The proxy runs on `http://localhost:4000`.

### 2. Configure Roo Code

1. Install the **Roo Code** extension in VS Code.
2. Open Roo Code Settings and select **LiteLLM** as the provider.
3. Set **Base URL** to `http://localhost:4000`.
4. Set **API Key** to any string (e.g., `sk-1234`) to satisfy the UI.
5. Click **Refresh Models** and select `dgt-smart-coder`.

### 3. Understanding the Router

The system uses an `auto_router` to optimize performance and cost:

- **Simple Tasks (DeepSeek):** Routed to `dgt-base-model`. Used for quick questions, "Ask" mode, and basic code snippets.
- **Complex Tasks (Kimi 2.6):** Routed to `dgt-arch-model`. Triggered for architecture, heavy refactors, or when using the `@complex` signal.

---

## 🚀 Environment Setup (NVM)

This project strictly enforces a Node.js engine to ensure build stability and satisfy security requirements for packages like `undici` and `next`.

1.  **Install NVM:** Ensure [Node Version Manager](https://github.com/nvm-sh/nvm) is installed.
2.  **Sync Node Version:** From the project root, run:
    ```bash
    nvm use
    ```
    _If the version is missing, run `nvm install` to fetch the version specified in `.nvmrc`._
3.  **Verify Engine:**
    ```bash
    node -v # Expected: v22.19.0 or higher
    ```

---

## 🛠 Rebuild / Installation

Follow these steps to restore the local environment from a fresh clone or after a dependency reset.

### 1\. Global Cleanup (If required)

If switching Node versions or clearing "muddy" states, run this from the root:

```bash
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "package-lock.json" -exec rm -rf '{}' +
```

### 2\. Install Dependencies

Always install from the **Root Directory** to allow the monorepo to manage the dependency tree:

```bash
nvm use
npm install
```

### 3\. Verify Security Baseline

```bash
npm audit
# Result should be 0 vulnerabilities due to root-level overrides.
```

---

## 💻 Development Workflow

To run the full ecosystem, open separate terminal tabs for the backend and frontend.

### Restore the Studio (CMS)

```bash
cd studio-dgt-xyz
npm run dev
```

> **Access:** [http://localhost:3333](https://www.google.com/search?q=http://localhost:3333)

### Restore the Frontend (Website)

```bash
cd dgt-xyz-web
npm run dev
```

> **Access:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

---

## 📝 GitHub Issue & Template Workflow

All work in this project is driven through GitHub issues that follow a standardized structure.

- **Canonical Template**: `.ai/templates/dgt-issue-template.md` — This is the **reference model** that defines the expected sections in every GitHub issue (Description, Kanban Column DoD, Acceptance Criteria, Required Request Folder Files, etc.).
- Every issue folder under `product/issues/` must contain:
  - `request/` — Immutable input files (explicitly listed in the GitHub issue)
  - `execution-log/` — Append-only logs
  - `output/` — Turn-based artifacts (see `transition-logic.md` for details)

**Sidekick Behavior**:

- The Sidekick always parses the actual GitHub issue body for concrete instructions.
- Verification of `request/` files is done **against the list in the GitHub issue**.
- See `sidekick-rules.md` and `transition-logic.md` for full workflow, blocker handling, and artifact rules.

---

## 📝 Technical Notes

- **Route Groups:** The frontend uses `(main)` for pages with Header/Footer logic and `(bare)` for minimal/empty layouts.
- **Sanity Client:** Initialized via `createImageUrlBuilder` from `@sanity/image-url`.
- **Security Overrides:** High-severity vulnerabilities are managed via the `overrides` field in the root `package.json`. **Do not use `npm audit fix --force`**, as it may trigger breaking major-version jumps for the Sanity Studio.
- **Local RAG Integration:** This repository is compatible with local AI workflows (LM Studio/Continue) for architecting Pinescript and React hooks.

---

## 🌍 Environment Variables

Create a `.env.local` inside `/dgt-xyz-web`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-04-20"
```
