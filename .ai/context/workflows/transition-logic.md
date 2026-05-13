# DGT Workflow: Transition & Turn Logic

## Template Expectation

The Sidekick should expect every GitHub issue to follow the general structure defined in `.ai/templates/dgt-issue-template.md`.  
This file is a **reference model only**. The Sidekick must parse the **actual GitHub issue body** for all concrete details: Description, Kanban Column Definition of Done (DoD for the current status), Acceptance Criteria, and Required Request Folder Files.

**See** `sidekick-rules.md` for full rules on template usage and GitHub issue retrieval.

## 1. Engagement Rules

1. **Cross-Reference to Sidekick Rules:** This document works in conjunction with `sidekick-rules.md`. In case of conflict, `sidekick-rules.md` takes precedence for GitHub interactions and session gating.

2. The Agent shall only task an issue when it is in: `Ready`, `In Progress`, `Staging`, or `Deploy`.

3. **DoD Expectation**: The GitHub issue must contain a relevant DoD subsection for the current status the Sidekick is working on (In Progress / Staging / Deploy). The final-turn / Done status is the only exception (Human-triggered only).

## 2. Status & Intent Matrix

The Agent must identify the current GitHub column to determine the required file output and log header.

| Current Column  | Sidekick Action                   | Required File Output                                     | Next Column        |
| --------------- | --------------------------------- | -------------------------------------------------------- | ------------------ |
| **Ready**       | Tasking                           | `inprogress-github-issue-details.md`                     | **In Progress**    |
| **In Progress** | Execution                         | `inprogress-github-issue-details.md` (if new turn)       | **Impl. Review**   |
| **Staging**     | Validation                        | `staging-github-issue-details.md`                        | **Staging Review** |
| **Deploy**      | Production                        | `deploy-github-issue-details.md`                         | **Deploy Review**  |
| **Done**        | Finalization (Human Trigger Only) | Create `final-turn/` folder + archive non-code artifacts | **Done** (closed)  |

**Important Notes:**

- The Sidekick shall **never** be asked to work on any **Review** columns (Implementation Review, Staging Review, Deploy Review).
- The **Done** status is only actionable by the Sidekick when the human **explicitly** requests finalization (e.g. “please finalize the ticket”, “finalize issue”, “move to final-turn”, etc.).
- Before proceeding, the Sidekick **must check** whether `product/issues/<issue-folder>/output/final-turn/` already exists. If it does, log the situation and stop (no further action).
- When finalizing:
  - Create the `final-turn/` folder if it does not exist.
  - Archive **non-code artifacts** (e.g. style guides, images, wireframes, release notes, design documents, etc.) by copying them from previous turn folders (`turn-N-*`) into `output/final-turn/`.
  - **Code changes** and production files remain in their original locations (e.g. `dgt-xyz-web/`, `studio-dgt-xyz/`, etc.).
  - A simple default approach is to copy the contents of the most recent turn folder and then prune code files if necessary.

## 3. Trigger-on-Task Protocol (Metadata Sync)

The moment the Agent is asked to work on an issue:

1. **Issue Folder Verification & Structure:**  
   Check if a folder for the specific issue exists in `product/issues/`.  
   If it does not exist, create it using the following format: `<yyyymmdd>-<type>-<ID>-<Title>`.  
   Inside every issue folder, ensure the following three standard subfolders exist:

   - `request/` — Immutable input. The agent must always check this folder first for files **explicitly listed in the current GitHub issue** (under "Required Request Folder Files").
   - `execution-log/` — Append-only logs for this issue (one primary log file per issue).
   - `output/` — All turn folders and session-specific artifacts.

2. **Request Folder Verification (Critical Step):**  
   Verify the `request/` folder contents **against the exact list in the current GitHub issue**.  
   If any required files/folders are missing **or** any other blocker/issue/need exists:

   - Immediately stop all execution
   - Do **not** create any missing `request/` content
   - Document the issue(s) with full paths/descriptions **only in the final execution-log entry**
   - Wait for the next human turn

3. **Turn Number Discovery:** Scan the issue folder's `output/` subfolder for existing turn folders (named `turn-N-*`). Determine the current highest N and prepare the next turn number as `(N+1)`.

4. **Turn Creation:** Using the next turn number from Step 3, create the new turn folder at `product/issues/<issue-folder>/output/turn-(N+1)-(status)/`.

5. **Metadata Sync:** Create the status-specific `.md` file inside the newly created turn folder.  
   **These metadata files are pure snapshots of the GitHub issue state only** — they must not contain free-form Agent notes or commentary.

6. **Task Execution:** Perform the specific technical work defined by the GitHub issue (Title, Body, Definition of Done, and Acceptance Criteria).

7. **Post-Execution Log:** Immediately upon completion or termination of the task, append the final entry (see Section 4).

## 4. Output Folder Structure & Artifact Rules

Every issue folder contains an `output/` directory with the following guidelines:

- **`turn-N-inprogress/`** → Working artifacts, temporary files, code experiments, in-progress components, screenshots, notes, etc.
- **`turn-N-staging/`** → Staging-specific outputs (deployment verification logs, smoke test results, performance screenshots, staging-specific docs, etc.).
- **`turn-N-deploy/`** → Production deployment artifacts (release notes, final verification screenshots, post-deploy checklists, etc.).
- **`final-turn/`** → **Archive only** (Human-triggered). Contains final non-code deliverables.
  - Code changes **stay** in their permanent locations (`dgt-xyz-web/`, etc.).
  - Non-code artifacts (style guides, images, wireframes, design docs, release notes, etc.) are copied here from previous turns for long-term reference.

**General Rule**:  
Temporary or session-specific files stay inside their respective `turn-N-*` folder.  
Only permanent, non-code deliverables are moved/copied into `final-turn/` during finalization.

## 5. Execution Logging Protocol (Strict Syntax)

- Every session has exactly **two logs**:
  - **Log #1 (Initial):** Immediately upon receipt of the prompt to declare your plan.
  - **Log #2 (Final):** Immediately upon completion or termination — this is the **only** place where blockers, missing files, or other issues are documented in detail.

**Syntax:**  
`[timestamp YYYYMMdd:HH24:mm:ss] [ISSUE STATUS]::: [Summary of requested work or completed actions]`

**Final Log Guidance:**  
Include any missing `request/` files (with full paths), blockers, or human input needed.

## 6. One-Column Move & Finalize Rules

(Reference `sidekick-rules.md` Section 4 for full details)

---

_Last Updated: 2026-05-11 – Aligned with dgt-issue-template.md and sidekick-rules.md_
