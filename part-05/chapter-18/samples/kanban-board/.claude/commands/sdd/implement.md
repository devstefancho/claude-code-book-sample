---
description: Implement tasks from tasks.md based on spec and plan documents
argument-hint: [--all] (optional flag for batch implementation)
model: inherit
---

## Arguments

`--all` (optional): Batch implementation flag

- When provided: Implement all tasks at once without interruption
- When omitted: Implement one group at a time, waiting for user approval between groups

## Instructions

### 1. Read Task Documentation

Read `docs/{current_branch}/tasks.md` to understand:

- The complete task list
- Task groupings and dependencies
- Implementation order

### 2. Reference Requirements and Technical Decisions

- Review `docs/{current_branch}/spec.md` for requirements and constraints
- Review `docs/{current_branch}/plan.md` for technical decisions, architecture, and patterns

### 3. Determine Implementation Strategy

**With `--all` flag:**

- Implement all tasks sequentially without pausing
- Mark each task in-progress → complete as you work through them

**Without `--all` flag:**

- Implement tasks one group at a time
- After completing each group, wait for user approval before proceeding
- Show progress report after each group

### 4. Implementation Process for Each Task

For every task:

a) **Mark as In-Progress**

- Update task status to in-progress before starting

b) **Implement the Feature**

- Write clean, maintainable code
- Follow existing code patterns and conventions in the codebase
- Handle edge cases and errors appropriately
- Add necessary comments for complex logic
- Ensure accessibility and performance considerations

c) **Test the Implementation**

- Run automated tests if test commands are available (npm test, pytest, etc.)
- Verify the implementation works as expected
- Check for console errors or warnings
- Test edge cases

d) **Mark as Completed**

- Update task status to completed only when fully working
- If tests fail or issues arise, keep as in-progress and fix before completing

### 5. Code Quality Guidelines

- Follow the project's existing code style and patterns
- Use consistent naming conventions
- Keep functions focused and single-purpose
- Avoid code duplication
- Handle errors gracefully
- Consider performance implications
- Ensure responsive design (if UI work)

## Report

After implementing each group (or at the end if using `--all`), provide:

### Implementation Summary

- Brief description of what was implemented
- Key features or changes made

### Files Changed

- List all created files with their purpose
- List all modified files with description of changes

### Testing

**Manual Testing Steps:**

1. Step-by-step instructions to manually verify the implementation
2. What to look for in the UI/console/output
3. Expected behavior at each step

**Automated Test Commands:**

- Command to run tests (e.g., `npm test`, `pytest`, etc.)
- Expected test output or success criteria

**Expected Results:**

- What the user should see when the feature works correctly
- Example outputs or screenshots description

**Edge Cases to Verify:**

- List specific edge cases to test
- Boundary conditions
- Error scenarios

### Next Steps

**If not using `--all` flag:**

- Indicate which group was completed
- Describe what the next group will implement
- Ask for user approval to continue

**If using `--all` flag:**

- Confirm all tasks are completed
- Suggest next actions (e.g., testing, deployment, documentation)

## Notes

- Always read the task documentation first before starting implementation
- Respect the task order and dependencies defined in tasks.md
- If you encounter unclear requirements, ask the user for clarification before proceeding
- Keep the user informed of progress, especially for long-running implementations
- If implementation reveals issues with the spec or plan, inform the user and suggest updates
- Use the TodoWrite tool to track implementation progress
