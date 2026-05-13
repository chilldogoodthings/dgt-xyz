# DGT GitHub Issue Template

**Issue Type**: `story` | `bug` | `task` | `spike`  
**ID**: `YYYYMMDD-<type>-<sequential-number>` (e.g. `20260511-story-042`)  
**Title Format**: `YYYYMMDD-<type>-<ID>-<Short-Title>` (e.g. `20260511-story-042-landing-hero-scaffold`)

---

## Description

<!-- Free-text overview of the work. Include context, background, and any high-level goals. -->

## Kanban Column Definition of Done (DoD)

### In Progress DoD

<!-- HUMAN: Fill in specific DoD for this issue when creating it. Must include at minimum: "Meet all Acceptance Criteria" -->

- Meet all Acceptance Criteria
-
-
-

### Staging DoD

<!-- HUMAN: Fill in specific DoD for this issue when creating it -->

-
-
-

### Deploy DoD

<!-- HUMAN: Fill in specific DoD for this issue when creating it -->

-
-
-

**Standard DoD for all other columns** (not editable per issue):

- **Ready**: Issue has complete Acceptance Criteria, all required `request/` files are present, dependencies resolved, Human has moved ticket to Ready.
- **Implementation Review**: Code reviewed by Human Architect, all feedback addressed, documentation updated, ticket moved by Sidekick.
- **Staging Review**: Human Architect validated functionality in staging, all feedback addressed, performance & mobile checks complete.
- **Deploy Review**: Human sign-off on production, monitoring checks passed.
- **Done**: Final-turn folder created (Human triggered only), all artifacts archived, lessons learned documented (optional).

## Acceptance Criteria

- [ ] AC-1:
- [ ] AC-2:
- [ ] AC-3:
<!-- Add as many as needed. Be specific and testable. -->

## Required Request Folder Files

<!-- List every file the Agent **must** read before starting work. If files do not exist, Agent must stop and express missing files and log outcome. -->

**Mandatory Path**: `product/issues/<yyyymmdd>-<type>-<ID>-<Title>/request/`

- `specs.md` – Detailed technical or design specifications
- `wireframes/` – (folder) Any visual references or screenshots
- `brand-references.md` – Specific branding/style-guide excerpts (if needed)
- `acceptance-criteria-details.md` – (optional) Expanded AC if too long for main body
- `images/` – (folder) Any supporting images (logos, mockups, etc.)
- `other-files...` – Add any additional files required for this issue

**Agent Protocol for Missing Files or Blockers**:

> If the Sidekick encounters **any** missing required files/folders **or** any other blocker/issue/need (ambiguity, missing decision, technical constraint, etc.) when beginning a session, the Sidekick **MUST**:
>
> 1. Immediately stop all execution
> 2. Output a clear list of all missing items or blockers with full paths/descriptions
> 3. Document the issue(s) in the **final execution-log** entry only
> 4. Wait for the next human turn (do **not** create any folders or files for the `request/` section)

## Agent Folder/File Protocol (Sidekick MUST Follow)

1. On session start: Verify the full issue folder structure (do **not** create missing `request/` content)
2. Read **all** files listed in "Required Request Folder Files" before any implementation
3. Reference `/product/design/brand/style-guide.md` and `/product/design/brand/brand-assets/` as ground truth
4. Follow exact rules in `.ai/context/roles/sidekick-rules.md` and `.ai/context/workflows/transition-logic.md`
5. Log every action using the strict timestamp + `[STATUS]::: ` format
6. Move ticket **exactly one column** to the right upon completion (never to Done unless Human explicitly approves finalization)

## References

- **Brand Ground Truth**: `product/design/brand/style-guide.md`
- **Sidekick Rules**: `.ai/context/roles/sidekick-rules.md`
- **Transition Logic**: `.ai/context/workflows/transition-logic.md`
- **Project Architecture**: `product/architecture/`
- **Current GitHub Project**: [Link to DGT Kanban Board]

---

**Template Usage Instructions** (for Humans):

1. Copy this entire template into a new GitHub Issue.
2. Replace placeholders with real values.
3. **Fill in the DoD subsections for In Progress, Staging, and Deploy** with issue-specific criteria (In Progress must include at minimum "Meet all Acceptance Criteria").
4. Populate the `request/` folder with **all** listed files **before** moving the ticket to Ready.
5. When ready for the Sidekick, move the issue to **Ready** column.

**For Sidekick**:

- Always parse this template first when starting a session.
- Confirm current Kanban column matches one of the allowed statuses before proceeding.
- If any required `request/` files are missing or any blocker exists, stop immediately, document in the final log, and wait for human input.

---

_Last Updated: 2026-05-11 – This is the canonical issue template for the DGT project._
