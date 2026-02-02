# dgt-xyz

Do Good Things Front Door

# DGT XYZ Project Baseline

This repository contains the core **blueprints** for the DGT ecosystem, utilizing a monorepo structure to manage the Sanity CMS and the Next.js frontend application.

---

## 📂 Project Structure

To maintain a tool-agnostic core while supporting a seamless VS Code experience, the project is organized as follows:

- **`dgt.xyz-workspace`**: (Local Only) VS Code workspace file for managing multiple project roots.
- **`/dgt-xyz-workspace`**: The main repository root.
- **`/dgt-xyz`**: The Next.js frontend application.
- **`/studio-dgt-xyz`**: The Sanity Studio "blueprints" (schemas, config, and structure).

---

## 🛠 Rebuild / First-Time Setup

Follow these steps to restore the local environment from a fresh clone.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dgt-xyz.git
cd dgt-xyz

```

### 2. Environment Configuration

Create a `.env.local` file inside the `/dgt-xyz` directory to connect the frontend to the Sanity Content Lake:

```bash
# /dgt-xyz/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID="<projectid>"
NEXT_PUBLIC_SANITY_DATASET="datasetname"
NEXT_PUBLIC_SANITY_API_VERSION="apiversion"

```

### 3. Restore the Studio (CMS)

The studio folder contains only the necessary configuration files. Dependencies and local artifacts must be rebuilt.

```bash
cd studio-dgt-xyz
npm install
npm run dev

```

> **Access:** The Studio will be accessible at [http://localhost:3333](https://www.google.com/search?q=http://localhost:3333).

### 4. Restore the Frontend (Website)

Open a new terminal window to run the Next.js application:

```bash
cd dgt-xyz
npm install
npm run dev

```

> **Access:** The Website will be accessible at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

---

## 📝 Technical Notes

- **Sanity Client:** Initialized using the modern named export `createImageUrlBuilder` from `@sanity/image-url`.
- **Version Control:** Only source code and "blueprint" configurations are tracked. Local folders such as `node_modules`, `.next`, and `.sanity` are excluded via `.gitignore`.
