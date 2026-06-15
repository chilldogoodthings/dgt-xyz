# DGT Workflow: Transition & Turn Logic

## Template Expectation

The Sidekick should expect every GitHub issue to follow the general structure defined in `.ai/context/templates/dgt-issue-template.md`.  
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
| **Ready**       | Auto-Advance & Tasking            | `inprogress-github-issue-details.md`                     | **In Progress**    |
| **In Progress** | Execution                         | `inprogress-github-issue-details.md` (if new turn)       | **Impl. Review**   |
| **Staging**     | Validation                        | `staging-github-issue-details.md`                        | **Staging Review** |
| **Deploy**      | Production                        | `deploy-github-issue-details.md`                         | **Deploy Review**  |
| **Done**        | Finalization (Human Trigger Only) | Create `final-turn/` folder + archive non-code artifacts | **Done** (closed)  |

**Important Notes:**

- The Sidekick shall **never** be asked to work on any **Review** columns (Implementation Review, Staging Review, Deploy Review).
- **The Ready Column Lifespan:** An issue remaining in the **Ready** column is considered idle. The moment the Sidekick initializes a task cycle on a Ready ticket, it must immediately execute a Kanban move to **In Progress** as its very first active command. Actual code tasking, component generation, or architecture exploration must only occur under an active **In Progress** state.
- The **Done** status is only actionable by the Sidekick when the human **explicitly** requests finalization (e.g. “please finalize the ticket”, “finalize issue”, “move to final-turn”, etc.).
- Before proceeding, the Sidekick **must check** whether `product/issues/<issue-folder>/output/final-turn/` already exists. If it does, log the situation and stop (no further action).
- When finalizing:
  - Create the `final-turn/` folder if it does not exist.
  - Archive **non-code artifacts** (e.g. style guides, images, wireframes, release notes, design documents, etc.) by copying them from previous turn folders (`turn-N-*`) into `output/final-turn/`.
  - **Code changes** and production files remain in their original locations (e.g. `dgt-xyz-web/`, `studio-dgt-xyz/`, etc.).
  - A simple default approach is to copy the contents of the most recent turn folder and then prune code files if necessary.

## 3. Trigger-on-Task Protocol (Metadata Sync)

The moment the Agent is asked to work on an issue:

1. **GitHub-First State Refresh (Mandatory):**

   - **Before doing anything else**, execute the GitHub retrieval commands defined in `sidekick-rules.md` Section 9 (“GitHub Issue & Project Data Retrieval Protocol”).
   - Capture the current live column status from the GitHub Project (`project.status.name`).
   - Store this value in memory as `CURRENT_GITHUB_STATUS`.
   - Log the retrieved status immediately in the initial log entry.
   - This value is now the single source of truth for all subsequent decisions in this session.

2. **Issue Folder Verification & Structure:**  
   Check if a folder for the specific issue exists in `product/issues/`.  
   If it does not exist, create it using the following format: `<type>-<ID>`.  
   Inside every issue folder, ensure the following three standard subfolders exist:

   - `request/` — Immutable input. The agent must always check this folder first for files **explicitly listed in the current GitHub issue** (under "Required Request Folder Files").
   - `execution-log/` — Append-only logs for this issue containing exactly one file: `issue-logs.md` (one primary log file per issue across its entire lifecycle).
   - `output/` — All turn folders and session-specific artifacts.

3. **Request Folder Verification (Critical Step):**

   - The Sidekick MUST automatically create the full local issue folder structure (`request/`, `execution-log/`, `output/`) if it does not already exist.
   - Then verify the `request/` folder contents **against the exact list** in the current GitHub issue (under “Required Request Folder Files”).
   - If any required file or subfolder is missing from `request/` (or its subfolders), **stop immediately**. Do not proceed with any work.
   - Document the exact missing items (with full paths) **only in the final execution-log entry**.
   - Do **not** create placeholder files. The Human is responsible for placing the real files into `request/` before or right after moving the issue to Ready.
   - Wait for the next human turn

4. **Turn Number Discovery & Status Comparison:**

   - Scan the issue folder’s `output/` subfolder for existing turn folders (`turn-N-*`).
   - Identify the highest existing turn number (`N`) and the status portion of the most recent turn folder (e.g., `turn-3-staging` → status = `staging`).
   - Compare the status of the **most recent local turn folder** against `CURRENT_GITHUB_STATUS`:
     - **If they match** → Continue working inside the most recent turn folder. Do **not** create a new turn folder yet. Append new artifacts/logs to the existing turn folder.
     - **If they do not match** (status changed — whether forward or backward human move) → Prepare to create a **new** turn folder using the next sequential number (`N+1`) and the current `CURRENT_GITHUB_STATUS` (e.g., `turn-4-staging` or `turn-4-inprogress`).
   - Record the comparison result and decision in the initial log entry.

5. **Turn Creation & Retry Handling**:

   - Always perform a full GitHub-First State Refresh, including fetching the latest comments on the issue.
   - Compare CURRENT_GITHUB_STATUS against the most recent local turn folder for that status.
   - **Create a new turn folder** (incrementing the turn number) in these cases:
     - The GitHub status has changed.
     - There are signals of human intervention or iteration even if the status matches the previous turn (new comments since last turn, `updatedAt` timestamp is newer, ticket was moved back into this column, AC/DoD changes, or explicit human request to re-work).
   - Turn folder path format: `product/issues/<issue-folder>/output/turn-(N+1)-(status)/`
     - Use the exact normalized status name from `CURRENT_GITHUB_STATUS` (lowercase, e.g. `inprogress`, `staging`, `deploy`, etc.).
   - If no new turn is needed (true no-op continuation), continue working inside the existing latest turn folder.
   - Every new turn must create a fresh metadata snapshot that includes current GitHub data and a summary of recent comments.

6. **Metadata Sync:** Use the CURRENT_GITHUB_STATUS captured in Step 1 when naming the metadata file (e.g., staging-github-issue-details.md). Read the local text-logging layout file from `.ai/context/templates/github-issue-detail-template-default.md`. Fill it completely using the snapshot data parsed out of the actual GitHub issue body. Save this file locally inside the newly created turn folder as a pure, status-specific metadata snapshot named strictly according to the current column status (i.e., `inprogress-github-issue-details.md`, `staging-github-issue-details.md`, or `deploy-github-issue-details.md`). **These metadata files are pure snapshots of the GitHub issue state only** — they must not contain free-form Agent notes or commentary.

**Handling GitHub Issue Comments**

- Pull latest issue comments (via `gh issue view <ISSUE_NUMBER> --comments` on your local machine).
- Read the comments to help build context for the current work.
- Should `.ai/context/templates/github-issue-detail-template-default.md` request Github Issue Comments, this is how you should retrieve them in order to apply them to the metadata file.

7. **Task Execution:** Perform the specific technical work defined by the GitHub issue (Title, Body, Definition of Done, and Acceptance Criteria).

8. **Post-Execution Log:** Immediately upon completion or termination of the task, append the final entry (see Section 4).

## 4. Output Folder Structure & Artifact Rules

Every issue folder contains an `output/` directory with the following guidelines:

- **`turn-N-inprogress/`** → Working artifacts, temporary files, code experiments, in-progress components, screenshots, notes, etc.
- **`turn-N-staging/`** → Staging-specific outputs (deployment verification logs, smoke test results, performance screenshots, staging-specific docs, etc.).
- **`turn-N-deploy/`** → Production deployment artifacts (release notes, final verification screenshots, post-deploy checklists, etc.).
- **`final-turn/`** → **Archive only** (Human-triggered). Contains final non-code deliverables.
  - Code changes **stay** in their permanent locations (`dgt-xyz-web/`, etc.).
  - **Reverse Chronological Asset Extraction Protocol:** Non-code artifacts (style guides, images, wireframes, design docs, etc.) must not be globally copied using broad wildcards across all previous turns. The Sidekick shall parse the explicit artifact filenames specified within the active issue's `Done DoD` section. The Sidekick must inspect historical local folders in reverse chronological order—beginning with the highest-indexed active turn (e.g., `turn-6-staging`, then `turn-5-inprogress`, downwards)—and extract the target non-code deliverable **exclusively** from the most recent, highest-numbered turn folder containing it. Older iterations or rejected drafts residing within lower-indexed turn folders must be structurally ignored.

**General Rule**:  
Temporary or session-specific files stay inside their respective `turn-N-*` folder.  
Only permanent, non-code deliverables are moved/copied into `final-turn/` during finalization.

## 5. Execution Logging Protocol (Strict Syntax)

- Every session has exactly **two log entries** appended to the single `product/issues/<issue-folder>/execution-log/issue-logs.md` file:
  - **Log Entry #1 (Initial):** Appended immediately upon receipt of the prompt to declare your plan.
  - **Log Entry #2 (Final):** Appended immediately upon completion or termination — this is the **only** place where blockers, missing files, or other issues are documented in detail.

**Syntax:** `[timestamp YYYYMMdd:HH24:mm:ss] [ISSUE STATUS]::: [Summary of requested work or completed actions]`

**Final Log Guidance:** Include any missing `request/` files (with full paths), blockers, or human input needed.

## 6. One-Column Move & Finalize Rules

(Reference `sidekick-rules.md` Section 4 for full details)

---

_Last Updated: 2026-06-01 – Aligned with dgt-issue-template.md and sidekick-rules.md_
