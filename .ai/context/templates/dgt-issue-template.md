# DGT GitHub Issue Template

## Description

<!-- Free-text overview of the work. Include context, background, and any high-level goals. -->

### Acceptance Criteria

- [ ] AC-1:
- [ ] AC-2:
- [ ] AC-3:
<!-- Add as many as needed. Be specific and testable. -->

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

### Done DoD (Finalization Deliverables)

- [ ] Final approved non-project assets to archive (e.g., final-image.png, style-guide.pdf)
- [ ] Programmatic validation: Extract only the latest version from the highest-indexed turn folder

- **Standard DoD for all other columns** (not editable per issue, for context only):

- **Ready**: Issue has complete Acceptance Criteria, all required `request/` files are present, dependencies resolved, Human has moved ticket to Ready.
- **Implementation Review**: Code reviewed by Human Architect, all feedback addressed, documentation updated, ticket moved by Sidekick.
- **Staging Review**: Human Architect validated functionality in staging, all feedback addressed, performance & mobile checks complete.
- **Deploy Review**: Human sign-off on production, monitoring checks passed.
- **Done**: Final-turn folder created (Human triggered only), all artifacts archived, lessons learned documented (optional).

## Required Request Folder Files

<!-- List every file the Agent **must** read before starting work. If files do not exist, Agent must stop and express missing files and log outcome. -->

**Mandatory Path or Files** (Sidekick will auto-create if missing): `product/issues/<type>-<number>/request/`

- List all required files here.

**Template Usage Instructions (for Humans)**

1. Copy this template into a new GitHub Issue.
2. Fill in Description, DoD, Acceptance Criteria, and Required Request Folder Files.
3. Add real files to the corresponding `product/issues/<type>-<number>/request/` folder.
4. Move the issue to the **Ready** column on the project board.
5. Tell the Sidekick: “Work on issue #XXX”

_Last Updated: 2026-05-14 – Aligned with sidekick-rules.md folder convention_
