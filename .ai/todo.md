````markdown
**TODO: DGT + Roo Code + LiteLLM Setup (MacBook Pro Edition – Fully Updated)**

**Total estimated time**: 5–9 hours spread over 1–2 days.  
**Key Changes Reflected**: `.ai/` as AI orchestration layer, LiteLLM proxy for smart routing, `sidekick:up` npm script, new project folders (`dgt-xyz-web`, `studio-dgt-xyz`).

---

### **Phase 1: Local Environment & Tools (1–2 hours)** **COMPLETED**

1. **Install GitHub CLI** **COMPLETED**
   ```bash
   brew install gh
   gh auth login --scopes repo,read:org,project,workflow
   gh auth status
   ```
````

2. **Install Roo Code VSCode Extension** **COMPLETED**

   - Extensions (`Cmd+Shift+X`) → Install **Roo Code** → Restart VSCode.

3. **Create Full Project Folder Structure** **COMPLETED**
   Use the exact tree from your latest `DGT Folder Structure.txt`. Run:

   ```bash
   mkdir -p \
     .ai/{infra,scripts,context/roles,context/workflows,templates} \
     .roo \
     product/architecture \
     product/design/brand/{brand-assets,icons} \
     product/issues \
     dgt-xyz-web \
     studio-dgt-xyz
   ```

4. **Copy Latest Rules & Configs** **COMPLETED**

   ```bash
   cp "/path/to/sidekick-rules.md" .ai/context/roles/sidekick-rules.md
   cp "/path/to/transition-logic.md" .ai/context/workflows/transition-logic.md
   ```

5. **Populate Baseline Files** **COMPLETED**
   - `product/design/brand/style-guide.md`
   - `product/architecture/site-wireframes.md`
   - `product/architecture/future-features.md`

---

### **Phase 2: GitHub Repository & Project Setup (45–60 min)** **COMPLETED**

6. **Update GitHub Project Columns**  
   Exactly: Backlog → Ready → In Progress → Implementation Review → Staging → Staging Review → Deploy → Deploy Review → Done

7. **Create GitHub Issue Template**  
   Create `ai/context/templates/dgt-issue-template.md`

8. **Create First Meta-Issue**  
   Title: `20260428-setup-roo-dgt-workflow` → Move to **Ready**

---

### **Phase 3: Roo Code + LiteLLM Router Setup (1.5–2 hours)** **COMPLETED**

9. **Set Up LiteLLM Infrastructure (New Core Routing Layer)**

   ```bash
   # Run from project root
   npm run sidekick:setup   # (we'll add this script in Phase 5)
   ```

10. **Create LiteLLM Config & Script**

    - Create `.ai/infra/router-config.yaml` and paste the full YAML you provided.
    - Create `.ai/scripts/sidekick.sh` with the exact bash content you provided (make it executable):
      ```bash
      chmod +x .ai/scripts/sidekick.sh
      ```

11. **Configure Roo Code to Use Local LiteLLM**

    - Open Roo Code panel (kangaroo icon).
    - Provider → **OpenAI Compatible** (or Custom).
    - Base URL: `http://localhost:4000/v1`
    - Model: `dgt-smart-coder`
    - Add your API keys to environment (`.env` file at root):
      ```
      DEEPSEEK_API_KEY=sk-...
      MOONSHOT_API_KEY=sk-...
      ```

12. **Create .roo Files (Native Roo Integration)**

    - `.roo/system-prompt-dgt.md` (updated with new paths)
    - `.roo/rules.md`

13. **Test Full Router + Sidekick**
    - In terminal: `npm run sidekick:up`
    - In Roo: `@complex Start session on test issue...`

---

### **Phase 4: DGT Folder & Session Workflow Validation (1 hour)** **COMPLETED**

14. **Create First Test Story Folder**

    ```bash
    mkdir -p product/issues/20260428-story-001-test-header-scaffold/{request,execution-log,output/turn-1-inprogress}
    ```

---

### **Phase 5: Monorepo & Script Integration (45–60 min)** **COMPLETED**

19. **Update Root package.json**

    ```json
    {
      "scripts": {
        "sidekick:setup": "python3 -m venv .ai/infra/venv && ./.ai/infra/venv/bin/pip install 'litellm[proxy]'",
        "sidekick:up": "bash .ai/scripts/sidekick.sh",
        "sidekick:down": "pkill -f litellm || true",
        "dev:web": "cd dgt-xyz-web && npm run dev",
        "dev:studio": "cd studio-dgt-xyz && npm run dev"
      }
    }
    ```

20. **Create/Update Root README.md**
    - Add sections: Project Overview, Folder Structure, How to Start Sidekick (`npm run sidekick:up`), LiteLLM Routing, DGT Rules, etc.

---

### **Phase 6: Website Project Integration & Final Validation** **COMPLETED**

21. Initialize `dgt-xyz-web` (Next.js + Sanity) and `studio-dgt-xyz`.

22. Self-review with Roo.

23. Human approval for finalization.

---
