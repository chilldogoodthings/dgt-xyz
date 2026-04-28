# dgt-xyz - Digital Ecosystem

Do Good Things Front Door: A high-performance monorepo utilizing Sanity CMS for headless content management and Next.js for a localized, dual-layout frontend.

---

## 📂 Project Structure

This monorepo is designed to be tool-agnostic while providing a seamless experience in VS Code.

- **`dgt-xyz-workspace`**: (Local Only) VS Code workspace file for managing multiple project roots.
- **`/` (Root)**: The parent directory containing monorepo configuration, `.nvmrc`, and shared `package.json`.
- **`/dgt-xyz-web`**: The Next.js frontend application (App Router).
- **`/studio-dgt-xyz`**: The Sanity Studio "blueprints" (schemas, config, and structure).

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
