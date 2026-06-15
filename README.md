# dgt-xyz - Digital Ecosystem

**Do Good Things Front Door**: A high-performance monorepo utilizing Sanity CMS for headless content management and Next.js for a localized, dual-layout frontend.

---

## 📂 Project Structure

This monorepo is designed to be tool-agnostic while providing a seamless experience in VS Code.

- **`dgt-xyz-workspace`**: (Local Only) VS Code workspace file for managing multiple project roots.
- **`/` (Root)**: The parent directory containing monorepo configuration, `.nvmrc`, shared `package.json`, and scripts.
- **`/dgt-xyz-web`**: The Next.js frontend application (App Router).
- **`/studio-dgt-xyz`**: The Sanity Studio "blueprints" (schemas, config, and structure).

```bash
/dgt-xyz
├── .ai/                          # Global AI Orchestration (Agent-Agnostic)
│   ├── infra/                    # The "Engine Room"
│   │   ├── venv/                 # Isolated Python env
│   │   ├── router-config.yaml    # The brain of your Complexity Router
│   │   └── litellm.log           # Local proxy runtime logs
│   ├── scripts/                  # Shared utility scripts
│   │   ├── sidekick.sh
│   │   ├── sidekick-setup.sh
│   │   └── ensure-node.sh
│   ├── context/                  # The Agent's "Brain"
│   │   ├── roles/
│   │   │   └── sidekick-rules.md
│   │   └── workflows/
│   │       └── transition-logic.md
│   └── templates/
│       ├── github-issue-detail-template-default.md
│       └── dgt-issue-template.md
├── .roo/rules                    # Roo Code specific configuration
├── product/                      # All design & state-machine artifacts
│   ├── architecture/
│   ├── design/brand/
│   └── issues/
├── dgt-xyz-web/
├── studio-dgt-xyz/
├── package.json
├── .nvmrc
└── README.md
```

---

## 🤖 AI Orchestration & Sidekick Setup

This repository uses **Roo Code** integrated with a local **LiteLLM** proxy.

### 1. Start the LiteLLM Proxy (Recommended)

```bash
npm run sidekick:up
```

- **Verification:** You should see `✅ LiteLLM router started!` on port 4000.
- Automatically enforces correct Node version from `.nvmrc`.

### 2. Configure Roo Code (VS Code Extension)

1. Install **Roo Code**.
2. Provider → LiteLLM / OpenAI Compatible.
3. Base URL: `http://localhost:4000`
4. API Key: Any string (e.g. `sk-1234`)
5. Refresh Models → Use `dgt-smart-coder` (simple) / `dgt-arch-model` (complex).
6. Automated Asset Generation: The router natively intercepts image generations on the standard /v1/images/generations route. Target the explicit flux-direct model identifier to fire synchronous Flux image generation directly into your workspace.

### 3. Stop the Proxy

```bash
npm run sidekick:down
```

---

## 🚀 Environment Setup (NVM)

1. Ensure [NVM](https://github.com/nvm-sh/nvm) is installed.
2. From project root:
   ```bash
   nvm use
   ```
3. Verify:
   ```bash
   node -v   # >= 22.19.0
   ```

---

## 🛠 Rebuild / Installation

Run from **project root** (`/dgt-xyz`):

```bash
nvm use
npm install
npm run sidekick:setup   # One-time or after Python changes
```

### Available Root Scripts

| Command                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `npm run sidekick:setup` | Create Python venv + install LiteLLM        |
| `npm run sidekick:up`    | Start LiteLLM proxy (with Node enforcement) |
| `npm run sidekick:down`  | Stop any running LiteLLM                    |
| `npm run dev:web`        | Start Next.js dev server                    |
| `npm run dev:studio`     | Start Sanity Studio                         |
| `npm install`            | Install monorepo dependencies               |

---

## 💻 Development Workflow

**Terminal 1** – AI Proxy:

```bash
npm run sidekick:up
```

**Terminal 2** – Development Servers:

```bash
npm run dev:studio   # http://localhost:3333
npm run dev:web      # http://localhost:3000
```

---

## 📝 GitHub Issue & Template Workflow

All work follows the standardized process in `.ai/context/templates/dgt-issue-template.md` and rules in `sidekick-rules.md` / `transition-logic.md`.

---

## 📝 Technical Notes

- **Node Enforcement**: All major scripts source `.ai/scripts/ensure-node.sh`.
- **Route Groups**: `(main)` for Header/Footer pages, `(bare)` for minimal layouts.
- **Security**: Root `package.json` overrides for vulnerabilities.
- **Environment Variables**:
  - Root `.env.local` for LiteLLM API keys.
  - `dgt-xyz-web/.env.local` for Sanity credentials.

---

## 🌍 Environment Variables Example

**Root `.env.local`**:

```env
DEEPSEEK_API_KEY=sk-...
MOONSHOT_API_KEY=sk-...
DEEPINFRA_API_KEY=...
```

**Frontend `dgt-xyz-web/.env.local`**:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-20
```

---
