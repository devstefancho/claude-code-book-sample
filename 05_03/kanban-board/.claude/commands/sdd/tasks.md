---
argument-hint: "[description]"
description: "Generate detailed task breakdown from spec and plan documents"
model: inherit
---

## Arguments

$1 (optional, Korean/English): Additional context or focus area for task generation

## Instructions

You are tasked with creating a comprehensive, actionable task breakdown document based on the project specification and technical plan.

### Step 1: Read Documentation

Read and thoroughly understand:

- `docs/{current_branch}/spec.md` - Project specification and requirements
- `docs/{current_branch}/plan.md` - Technical implementation plan

Note: Use git branch command to determine `{current_branch}` if needed.

### Step 2: Generate `docs/{current_branch}/tasks.md`

Create a detailed task breakdown document with the following structure:

#### Document Header

```markdown
# Task Breakdown - {Project Name}

**Generated**: {current date}
**Branch**: {current_branch}
**Total Tasks**: {count}
**Task Groups**: {count}
```

#### Task Organization

Organize tasks into **Task Groups** based on logical feature areas or implementation phases:

- Setup & Configuration
- Type Definitions & Data Models
- State Management
- UI Components
- Core Features (CRUD, Drag & Drop, etc.)
- Responsive Design & Accessibility
- Testing
- Documentation & Quality Assurance

#### Task Format

Each task must follow this format:

```markdown
### Task Group: {Group Name}

**Complexity**: Low | Medium | High
**Estimated Tasks**: {count}

#### T-XXX: {Task Title}

**Purpose**: {Why this task is needed and what problem it solves}
**Required**: Yes | No
**Dependencies**: {List of task IDs this depends on, or "None"}
**Acceptance Criteria**:

- {Specific, testable criterion 1}
- {Specific, testable criterion 2}
- {Specific, testable criterion 3}

**Implementation Notes**:

- {Brief technical guidance or approach}
```

#### Task Quality Requirements

- **Atomic**: Each task should be a single, focused unit of work
- **Testable**: Must have clear, verifiable acceptance criteria
- **Ordered**: Tasks sorted by dependencies (prerequisites come first)
- **Scoped**: Realistic size (2-8 hours of work)
- **Clear**: Unambiguous description and purpose
- **Traceable**: Maps back to spec/plan requirements

#### Task Numbering

- Use format: **T-001**, **T-002**, **T-003**, etc.
- Number sequentially across all groups
- Maintain dependency order within and across groups

#### Coverage Requirements

Ensure ALL aspects from spec and plan are covered:

- All features and requirements
- All technical components (frontend, state, UI, etc.)
- Testing requirements
- Accessibility requirements
- Performance requirements
- Documentation needs

### Step 3: Report to User

Provide a comprehensive summary in this format:

```markdown
## Task Breakdown Summary

**Total Tasks**: {X}
**Task Groups**: {Y}

### Task Groups Overview

| Group        | Tasks   | Complexity     | Required | Optional |
| ------------ | ------- | -------------- | -------- | -------- |
| {Group Name} | {count} | {Low/Med/High} | {count}  | {count}  |
| ...          | ...     | ...            | ...      | ...      |

### All Tasks Summary

| ID    | Task                | Purpose         | Required | Dependencies  |
| ----- | ------------------- | --------------- | -------- | ------------- |
| T-001 | {brief description} | {brief purpose} | Yes/No   | {IDs or None} |
| ...   | ...                 | ...             | ...      | ...           |

### Next Steps

To begin implementation, run:

- `/sdd:implement` - Implement tasks one by one with guidance
- `/sdd:implement --all` - Implement all tasks in sequence

**Recommendation**: Start with `/sdd:implement` for better control and review at each step.
```

## Quality Checklist

Before finalizing, verify:

- [ ] All spec requirements mapped to tasks
- [ ] All plan components covered
- [ ] Tasks are atomic and testable
- [ ] Dependencies correctly identified
- [ ] Acceptance criteria are specific
- [ ] Complexity ratings are realistic
- [ ] Required vs Optional clearly marked
- [ ] Task order respects dependencies
- [ ] No duplicate or overlapping tasks
- [ ] Clear implementation guidance provided

## Output

1. Create `docs/{current_branch}/tasks.md` with complete task breakdown
2. Display summary report to user
3. Provide next step guidance
