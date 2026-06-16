# Task Breakdown - Kanban Board 웹 서비스

**Generated**: 2025-11-22
**Branch**: init
**Total Tasks**: 44
**Task Groups**: 8

---

## Task Groups Overview

| Group                             | Tasks | Complexity | Required | Optional |
| --------------------------------- | ----- | ---------- | -------- | -------- |
| Setup & Configuration             | 4     | Low-Medium | 4        | 0        |
| Type Definitions & Data Models    | 3     | Low        | 3        | 0        |
| State Management                  | 5     | Medium     | 5        | 0        |
| UI Components                     | 8     | Low-Medium | 8        | 0        |
| Core Features - CRUD              | 8     | Medium     | 8        | 0        |
| Core Features - Drag & Drop       | 7     | High       | 6        | 1        |
| Responsive Design & Accessibility | 6     | Medium     | 5        | 1        |
| Documentation                     | 3     | Low        | 3        | 0        |

---

## Task Group: Setup & Configuration

**Complexity**: Low-Medium
**Estimated Tasks**: 4

### T-001: Initialize Next.js Project

**Purpose**: Set up the foundational Next.js 15.5 project structure with TypeScript support
**Required**: Yes
**Dependencies**: None

**Acceptance Criteria**:

- Next.js 15.5 installed with TypeScript configuration
- Project runs successfully with `npm run dev`
- App Router structure created in `src/app/`
- No compilation errors on initial build

**Implementation Notes**:

- Use `npx create-next-app@latest` with TypeScript, ESLint, Tailwind CSS, App Router options
- Verify Node.js version compatibility (18.17+)

---

### T-002: Install Core Dependencies

**Purpose**: Install all production dependencies required for the kanban board functionality
**Required**: Yes
**Dependencies**: T-001

**Acceptance Criteria**:

- @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities installed (v6.3.1, v9.0.0, v3.2.2)
- zustand v5.0+ installed with persist middleware support
- zod v3.24+ installed for validation
- nanoid v5.1+ and clsx v2.1+ installed
- All dependencies listed in package.json
- `npm install` completes without errors

**Implementation Notes**:

- Use exact versions specified in plan.md for stability
- Run `npm install --save` for production dependencies

---

### T-003: Configure TypeScript and ESLint

**Purpose**: Establish strict type checking and code quality standards
**Required**: Yes
**Dependencies**: T-002

**Acceptance Criteria**:

- tsconfig.json configured with strict mode enabled
- ESLint configured with Next.js and Prettier rules
- Path aliases configured (@/components, @/lib, @/types)
- No linting errors on empty project
- ESLint and Prettier don't conflict

**Implementation Notes**:

- Enable strict TypeScript options: noImplicitAny, strictNullChecks
- Add eslint-config-next and eslint-config-prettier
- Configure path aliases in tsconfig.json: `"@/*": ["./src/*"]`

---

### T-004: Configure Tailwind CSS

**Purpose**: Set up Tailwind CSS 3.4 with custom theme and JIT compilation
**Required**: Yes
**Dependencies**: T-001

**Acceptance Criteria**:

- Tailwind CSS 3.4 installed and configured
- tailwind.config.ts includes custom color scheme
- globals.css imports Tailwind directives
- JIT mode enabled and working
- Test utility classes render correctly

**Implementation Notes**:

- Configure content paths: `./src/**/*.{js,ts,jsx,tsx,mdx}`
- Define custom colors for columns (todo: blue, in-progress: yellow, done: green)
- Set up responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

---

## Task Group: Type Definitions & Data Models

**Complexity**: Low
**Estimated Tasks**: 3

### T-005: Define Core TypeScript Types

**Purpose**: Create type-safe definitions for Card, Column, and Status to ensure data consistency
**Required**: Yes
**Dependencies**: T-003

**Acceptance Criteria**:

- CardStatus type exported ('todo' | 'in-progress' | 'done')
- Card interface defined with all required fields (id, title, description, status, order, createdAt, updatedAt)
- Column interface defined (id, title, cards)
- KanbanState interface defined with columns and action signatures
- All types exported from types/index.ts

**Implementation Notes**:

- Create src/types/index.ts
- Use TypeScript strict mode compatible types
- Document each interface with JSDoc comments
- Reference plan.md lines 166-210 for exact structure

---

### T-006: Define Zod Validation Schemas

**Purpose**: Implement runtime validation to protect against invalid localStorage data
**Required**: Yes
**Dependencies**: T-005

**Acceptance Criteria**:

- cardSchema validates title (1-200 chars) and description (0-2000 chars)
- Validation error messages are user-friendly in Korean
- Schema exports TypeScript types via z.infer
- Invalid data is rejected with clear error messages
- Validation functions exported from lib/validation.ts

**Implementation Notes**:

- Create src/lib/validation.ts
- Use Zod's string validators: min(), max(), trim()
- Error messages: "제목을 입력하세요", "제목은 200자 이내", "설명은 2000자 이내"
- Export schema and type: `export const cardSchema = z.object({...})`

---

### T-007: Define Constants and Configuration

**Purpose**: Centralize configuration values to avoid magic numbers and ensure consistency
**Required**: Yes
**Dependencies**: T-005

**Acceptance Criteria**:

- Column definitions exported (id, title for 3 columns)
- Character limits defined (TITLE_MAX_LENGTH: 200, DESCRIPTION_MAX_LENGTH: 2000)
- localStorage key constant defined
- All constants typed with TypeScript
- Constants exported from lib/constants.ts

**Implementation Notes**:

- Create src/lib/constants.ts
- Define COLUMNS array with CardStatus and Korean titles
- Export as const for type narrowing
- Include performance constants if needed (MAX_CARDS: 100)

---

## Task Group: State Management

**Complexity**: Medium
**Estimated Tasks**: 5

### T-008: Create Zustand Store Structure

**Purpose**: Set up centralized state management with localStorage persistence
**Required**: Yes
**Dependencies**: T-005, T-007

**Acceptance Criteria**:

- Zustand store created with KanbanState interface
- Initial state includes 3 empty columns (todo, in-progress, done)
- persist middleware configured for localStorage
- Store exports useKanbanStore hook
- DevTools integration enabled for development

**Implementation Notes**:

- Create src/lib/store.ts
- Use zustand/middleware/immer for immutable updates
- Configure persist: `persist(storeFunction, { name: 'kanban-store' })`
- Initial columns structure matches plan.md lines 239-271

---

### T-009: Implement addCard Action

**Purpose**: Enable card creation with automatic ID generation and timestamp tracking
**Required**: Yes
**Dependencies**: T-008

**Acceptance Criteria**:

- addCard accepts card data without id, order, createdAt, updatedAt
- Generates unique ID using nanoid()
- Sets order to end of current column (cards.length)
- Sets createdAt and updatedAt to current timestamp
- Card added to correct column based on status
- State automatically persists to localStorage

**Implementation Notes**:

- Use nanoid() for ID generation
- Calculate order: `state.columns[card.status].cards.length`
- Push new card to cards array
- Immer middleware handles immutability

---

### T-010: Implement updateCard Action

**Purpose**: Allow modification of card title and description with timestamp tracking
**Required**: Yes
**Dependencies**: T-008

**Acceptance Criteria**:

- updateCard accepts card ID and partial updates (title, description)
- Finds card across all columns
- Updates only specified fields
- Updates updatedAt timestamp
- Returns early if card not found
- Changes persist to localStorage

**Implementation Notes**:

- Loop through all columns to find card by ID
- Use Object.assign() or spread operator for partial updates
- Set `updatedAt: Date.now()`
- Handle card not found gracefully (no error thrown)

---

### T-011: Implement deleteCard Action

**Purpose**: Remove cards from board and maintain correct ordering of remaining cards
**Required**: Yes
**Dependencies**: T-008

**Acceptance Criteria**:

- deleteCard accepts card ID
- Removes card from its column
- Recalculates order for remaining cards (0, 1, 2, ...)
- Changes persist to localStorage
- No error if card doesn't exist

**Implementation Notes**:

- Find card by ID across columns
- Use splice() to remove card
- Reindex remaining cards: `cards.forEach((card, idx) => card.order = idx)`
- Reference plan.md lines 479-491

---

### T-012: Implement moveCard and reorderCard Actions

**Purpose**: Support drag-and-drop functionality by updating card position and status
**Required**: Yes
**Dependencies**: T-008

**Acceptance Criteria**:

- moveCard moves card between columns and updates status
- reorderCard changes order within same column
- Both actions recalculate order values correctly
- Original and target columns are both reordered
- Changes persist to localStorage
- Handles edge cases (invalid IDs, same position)

**Implementation Notes**:

- moveCard: remove from source column, update status, insert at target order
- reorderCard: find card, remove, re-insert at new position
- Recalculate order for all affected cards
- Use array manipulation: splice, forEach

---

## Task Group: UI Components

**Complexity**: Low-Medium
**Estimated Tasks**: 8

### T-013: Create Button Component

**Purpose**: Provide reusable, accessible button with consistent styling
**Required**: Yes
**Dependencies**: T-004

**Acceptance Criteria**:

- Button accepts variant prop (primary, secondary, danger)
- Supports disabled state with visual feedback
- Fully accessible (keyboard, ARIA)
- Hover and active states styled
- Exported from components/ui/Button.tsx

**Implementation Notes**:

- Use Tailwind classes with clsx for conditional styling
- Props: variant, disabled, onClick, children, className, type
- Base classes: px-4 py-2 rounded font-medium transition
- Variants: primary (blue), secondary (gray), danger (red)

---

### T-014: Create Input Component

**Purpose**: Provide accessible text input with error state support
**Required**: Yes
**Dependencies**: T-004

**Acceptance Criteria**:

- Input accepts value, onChange, placeholder, error props
- Shows error message below input if provided
- Accessible with proper labels and ARIA attributes
- Focus state clearly visible
- Exported from components/ui/Input.tsx

**Implementation Notes**:

- Wrap input in div with label
- Props: label, value, onChange, placeholder, error, required, maxLength
- Error styling: border-red-500, text-red-600
- Use aria-invalid and aria-describedby for errors

---

### T-015: Create Textarea Component

**Purpose**: Provide multi-line text input for card descriptions
**Required**: Yes
**Dependencies**: T-004

**Acceptance Criteria**:

- Textarea accepts value, onChange, placeholder, error props
- Auto-resizes or has fixed height (4-6 rows)
- Shows character count if maxLength provided
- Error state visually distinct
- Exported from components/ui/Textarea.tsx

**Implementation Notes**:

- Similar to Input but with textarea element
- Props: label, value, onChange, placeholder, error, maxLength, rows
- Show character count: "245 / 2000"
- Use resize-none for fixed height

---

### T-016: Create Modal Base Component

**Purpose**: Provide accessible modal container with overlay, focus trap, and ESC handling
**Required**: Yes
**Dependencies**: T-004, T-013

**Acceptance Criteria**:

- Modal renders with overlay backdrop
- Closes on ESC key press
- Closes on backdrop click (optional)
- Focus trapped within modal
- Body scroll disabled when open
- Accessible with proper ARIA attributes

**Implementation Notes**:

- Use React Portal for rendering outside root
- Props: isOpen, onClose, title, children
- Overlay: fixed inset-0 bg-black/50
- Focus trap: useEffect with keyboard listener
- ARIA: role="dialog", aria-modal="true", aria-labelledby

---

### T-017: Create CardFormModal Component

**Purpose**: Unified modal for creating and editing cards with validation
**Required**: Yes
**Dependencies**: T-014, T-015, T-016, T-006

**Acceptance Criteria**:

- Supports both create and edit modes
- Pre-fills form data in edit mode
- Validates input using Zod schema
- Shows validation errors inline
- Calls addCard or updateCard on submit
- Resets form on cancel

**Implementation Notes**:

- Props: mode ('create' | 'edit'), card (optional), status (for create), onClose
- Local state for title, description, errors
- Validate on submit using cardSchema.safeParse()
- Submit calls appropriate Zustand action
- Reference plan.md lines 352-361

---

### T-018: Create ConfirmModal Component

**Purpose**: Reusable confirmation dialog for destructive actions like delete
**Required**: Yes
**Dependencies**: T-016, T-013

**Acceptance Criteria**:

- Displays custom title and message
- Shows Confirm and Cancel buttons
- Confirm button styled as danger variant
- Calls onConfirm callback when confirmed
- Closes on cancel or ESC

**Implementation Notes**:

- Props: isOpen, onClose, onConfirm, title, message
- Message prop for flexibility: "이 카드를 삭제하시겠습니까?"
- Buttons: "확인" (danger), "취소" (secondary)
- Reference plan.md lines 362-370

---

### T-019: Create ColumnHeader Component

**Purpose**: Display column title and card count badge
**Required**: Yes
**Dependencies**: T-004

**Acceptance Criteria**:

- Shows column title (할 일, 진행 중, 완료)
- Displays card count in badge
- Responsive typography
- Visually distinct for each column (color-coded)
- Exported from components/board/ColumnHeader.tsx

**Implementation Notes**:

- Props: title (string), count (number), status (CardStatus)
- Badge styling: rounded-full px-2 py-1 text-sm
- Color mapping: todo (blue), in-progress (yellow), done (green)
- Reference plan.md lines 344-350

---

### T-020: Create Add Card Button Component

**Purpose**: Trigger card creation modal from each column
**Required**: Yes
**Dependencies**: T-013

**Acceptance Criteria**:

- Button displays "+ 카드 추가" text
- Positioned at top or bottom of column
- Accessible with keyboard
- Opens CardFormModal in create mode
- Different styling from regular buttons (subtle, dashed border)

**Implementation Notes**:

- Can be part of ColumnHeader or separate component
- Styling: border-2 border-dashed hover:border-solid
- onClick opens modal with correct status pre-selected

---

## Task Group: Core Features - CRUD

**Complexity**: Medium
**Estimated Tasks**: 8

### T-021: Create Card Component Structure

**Purpose**: Build the draggable card UI showing title, description, and action buttons
**Required**: Yes
**Dependencies**: T-005, T-013, T-019

**Acceptance Criteria**:

- Card displays title, truncated description, and action buttons
- Description limited to 100 characters with ellipsis
- Edit and Delete buttons visible on hover or always visible on mobile
- Card has rounded corners, shadow, and padding
- Exported from components/board/Card.tsx

**Implementation Notes**:

- Props: card (Card type), onEdit, onDelete
- Truncate description: `description.slice(0, 100) + '...'`
- Styling: bg-white rounded-lg shadow p-4 hover:shadow-md
- Action buttons: position absolute top-right or bottom-right
- No drag functionality yet (added in T-030)

---

### T-022: Implement Card Display and Rendering

**Purpose**: Render card content with proper formatting and accessibility
**Required**: Yes
**Dependencies**: T-021

**Acceptance Criteria**:

- Card title rendered as heading (h3 or h4)
- Description rendered with proper line breaks
- Empty description handled gracefully
- Timestamps displayed in readable format (optional)
- ARIA labels for screen readers

**Implementation Notes**:

- Title: font-semibold text-lg
- Description: text-sm text-gray-600 line-clamp-3
- Use aria-label for card: "카드: {title}"
- Consider adding created date: format with Intl.DateTimeFormat

---

### T-023: Implement Card Creation Flow

**Purpose**: Allow users to create new cards from any column
**Required**: Yes
**Dependencies**: T-017, T-020, T-009

**Acceptance Criteria**:

- Clicking "카드 추가" opens CardFormModal in create mode
- Modal pre-selects correct column status
- Form validation prevents empty title
- New card appears at bottom of column after creation
- Modal closes and form resets after successful creation

**Implementation Notes**:

- Parent component manages modal state (isOpen, mode, targetStatus)
- Pass status to CardFormModal: status={column.id}
- CardFormModal calls useKanbanStore().addCard({ title, description, status })
- Close modal on success

---

### T-024: Implement Card Edit Flow

**Purpose**: Enable users to modify existing card title and description
**Required**: Yes
**Dependencies**: T-017, T-021, T-010

**Acceptance Criteria**:

- Clicking Edit button on card opens CardFormModal in edit mode
- Form pre-filled with current card data
- Changes saved update the card in place
- updatedAt timestamp updated
- Modal closes after save or cancel

**Implementation Notes**:

- Card component onClick (edit button) → setEditingCard(card)
- CardFormModal receives: mode="edit", card={editingCard}
- Form submission calls updateCard(card.id, { title, description })
- Optimistic UI update (instant)

---

### T-025: Implement Card Delete Flow

**Purpose**: Allow safe deletion of cards with confirmation
**Required**: Yes
**Dependencies**: T-018, T-021, T-011

**Acceptance Criteria**:

- Clicking Delete button shows ConfirmModal
- Confirmation message clearly states action is irreversible
- Confirming deletes card from board
- Remaining cards reorder automatically
- Modal closes after confirm or cancel

**Implementation Notes**:

- Card component onClick (delete) → setDeletingCardId(card.id)
- ConfirmModal: title="카드 삭제", message="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
- onConfirm calls deleteCard(deletingCardId)
- Card disappears with smooth animation (optional)

---

### T-026: Create Column Component

**Purpose**: Container for cards with droppable area and vertical layout
**Required**: Yes
**Dependencies**: T-019, T-021, T-008

**Acceptance Criteria**:

- Column displays ColumnHeader with title and count
- Renders all cards in order (sorted by order field)
- Shows empty state when no cards ("카드가 없습니다")
- Droppable area spans full column height
- Exported from components/board/Column.tsx

**Implementation Notes**:

- Props: column (Column type)
- Get cards from Zustand: useKanbanStore(state => state.columns[columnId].cards)
- Sort cards: cards.sort((a, b) => a.order - b.order)
- Empty state: text-gray-400 text-center py-8
- Container: min-h-96 for droppable area
- No DnD functionality yet (added in T-029)

---

### T-027: Create KanbanBoard Component

**Purpose**: Root board component rendering all 3 columns and managing modals
**Required**: Yes
**Dependencies**: T-026

**Acceptance Criteria**:

- Renders 3 columns side-by-side on desktop
- Manages global modal state (CardFormModal, ConfirmModal)
- Loads data from Zustand store on mount
- Responsive layout (stacks columns on mobile)
- Exported from components/board/KanbanBoard.tsx

**Implementation Notes**:

- Layout: grid grid-cols-1 md:grid-cols-3 gap-4
- Local state: modalOpen, modalMode, editingCard, deletingCardId
- Map over COLUMNS constant to render Column components
- Pass modal handlers down to Card components
- Reference plan.md lines 315-324

---

### T-028: Integrate KanbanBoard into Main Page

**Purpose**: Display KanbanBoard as the main application interface
**Required**: Yes
**Dependencies**: T-027

**Acceptance Criteria**:

- src/app/page.tsx imports and renders KanbanBoard
- Page has proper title and metadata
- Layout includes header with app name
- No TypeScript or build errors
- Application displays correctly at localhost:3000

**Implementation Notes**:

- Update src/app/page.tsx to use 'use client' directive
- Import KanbanBoard component
- Add header: "칸반 보드" with Tailwind styling
- Metadata: title "칸반 보드 | Kanban Board"
- Container: max-w-7xl mx-auto px-4 py-8

---

## Task Group: Core Features - Drag & Drop

**Complexity**: High
**Estimated Tasks**: 7

### T-029: Integrate dnd-kit DndContext

**Purpose**: Set up drag-and-drop infrastructure with sensors and collision detection
**Required**: Yes
**Dependencies**: T-027, T-002

**Acceptance Criteria**:

- DndContext wraps all columns in KanbanBoard
- Mouse and touch sensors configured
- Collision detection strategy set (closestCenter or closestCorners)
- onDragStart, onDragOver, onDragEnd handlers defined
- No errors when dragging not yet implemented on cards

**Implementation Notes**:

- Import from @dnd-kit/core: DndContext, PointerSensor, useSensor, useSensors
- Sensors: useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
- Collision: closestCenter
- Reference plan.md lines 315-324

---

### T-030: Make Cards Draggable with useSortable

**Purpose**: Enable cards to be picked up and dragged
**Required**: Yes
**Dependencies**: T-029, T-021

**Acceptance Criteria**:

- Each Card uses useSortable hook from @dnd-kit/sortable
- Card transforms visually when dragged (opacity, scale)
- Drag handle covers entire card (or specific area)
- Keyboard drag works (Space/Enter to pick up)
- Drag preview shows card being moved

**Implementation Notes**:

- Import useSortable from @dnd-kit/sortable
- Hook: const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id })
- Apply to card div: ref={setNodeRef}, style={transform}, {...attributes}, {...listeners}
- Dragging style: isDragging ? 'opacity-50' : 'opacity-100'
- Reference plan.md lines 335-343

---

### T-031: Make Columns Droppable with SortableContext

**Purpose**: Define drop zones for each column and enable card reordering
**Required**: Yes
**Dependencies**: T-029, T-026

**Acceptance Criteria**:

- Each Column wrapped in SortableContext
- SortableContext receives items prop (array of card IDs)
- Cards within column can be reordered by dragging
- Drop zone highlights when dragging over (optional visual feedback)
- Strategy set to verticalListSortingStrategy

**Implementation Notes**:

- Import SortableContext, verticalListSortingStrategy from @dnd-kit/sortable
- Wrap cards: <SortableContext items={column.cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
- useDroppable hook for column container (optional for highlight)
- Reference plan.md lines 325-333

---

### T-032: Implement onDragEnd Handler for Cross-Column Moves

**Purpose**: Update card status when dropped into different column
**Required**: Yes
**Dependencies**: T-030, T-031, T-012

**Acceptance Criteria**:

- Detects when card moved to different column
- Updates card status using moveCard action
- Card appears in new column immediately
- Original column card count decreases, target increases
- Handles drop on same column (no status change)

**Implementation Notes**:

- onDragEnd receives event with active (dragged card) and over (drop target)
- Determine target column from over.id or over.data
- Find card status and target status
- If different: moveCard(active.id, targetStatus, targetOrder)
- Calculate targetOrder: cards.length (append to end) or specific index

---

### T-033: Implement onDragEnd Handler for Same-Column Reordering

**Purpose**: Allow users to change card order within a column
**Required**: Yes
**Dependencies**: T-030, T-031, T-012

**Acceptance Criteria**:

- Detects when card reordered within same column
- Updates card order using reorderCard action
- Visual order updates immediately
- Other cards shift positions smoothly
- Edge cases handled (drop on self, invalid positions)

**Implementation Notes**:

- Compare active.data.current.sortable.containerId with over.data.current.sortable.containerId
- If same: calculate newOrder from over.data.current.sortable.index
- Call reorderCard(active.id, newOrder)
- dnd-kit handles animation automatically

---

### T-034: Add Drag Visual Feedback and Animations

**Purpose**: Provide clear visual cues during drag operations for better UX
**Required**: Yes
**Dependencies**: T-030, T-031

**Acceptance Criteria**:

- Dragged card has reduced opacity or elevated shadow
- Placeholder shown in original position
- Drop zones highlighted when hovering
- Smooth transition animation when card settles
- Touch devices show drag preview

**Implementation Notes**:

- Use isDragging state from useSortable
- Dragging styles: opacity-50, rotate-3, scale-105
- CSS transitions: transition-transform duration-200
- DragOverlay component for custom drag preview (optional)
- Reference plan.md lines 335-343 for styling

---

### T-035: Implement Keyboard Drag-and-Drop Support (Optional)

**Purpose**: Enable full keyboard navigation for accessibility (WCAG 2.1 requirement)
**Required**: No
**Dependencies**: T-032, T-033

**Acceptance Criteria**:

- Space or Enter key picks up card
- Arrow keys move card between positions
- Space or Enter drops card
- Escape cancels drag
- Screen reader announces drag state

**Implementation Notes**:

- dnd-kit includes keyboard sensor by default
- Import KeyboardSensor from @dnd-kit/core
- Add to sensors: useSensor(KeyboardSensor)
- Ensure proper ARIA labels on cards
- Test with screen reader (VoiceOver, NVDA)

---

## Task Group: Responsive Design & Accessibility

**Complexity**: Medium
**Estimated Tasks**: 6

### T-036: Implement Mobile Layout (< 768px)

**Purpose**: Optimize board layout for small screens with vertical stacking
**Required**: Yes
**Dependencies**: T-027, T-004

**Acceptance Criteria**:

- Columns stack vertically on mobile
- Full viewport width used for each column
- Touch drag-and-drop works smoothly
- Text remains readable (minimum 16px)
- Buttons large enough for touch (min 44px tap target)

**Implementation Notes**:

- Grid layout: grid-cols-1 (mobile default)
- Each column: min-h-screen-1/3 for adequate drop area
- Touch sensor already configured in T-031
- Test on real device or Chrome DevTools mobile emulation

---

### T-037: Implement Tablet Layout (768px - 1023px)

**Purpose**: Optimize for tablet screens with 2-column or 3-column layout
**Required**: Yes
**Dependencies**: T-027, T-004

**Acceptance Criteria**:

- 3 columns displayed side-by-side on landscape tablets
- Adequate spacing between columns (gap-4)
- Horizontal scrolling if needed
- Touch interactions work correctly
- Readable at typical tablet viewing distance

**Implementation Notes**:

- Breakpoint: md:grid-cols-3
- Alternative: md:grid-cols-2 with scroll for third column
- Container: overflow-x-auto for safety
- Test on iPad (768x1024) and Android tablets

---

### T-038: Implement Desktop Layout (1024px+)

**Purpose**: Full 3-column side-by-side layout with optimal spacing
**Required**: Yes
**Dependencies**: T-027, T-004

**Acceptance Criteria**:

- All 3 columns visible without scrolling
- Columns have equal width or flex-based sizing
- Maximum content width for large screens (max-w-7xl)
- Adequate whitespace and padding
- Smooth drag transitions

**Implementation Notes**:

- Desktop: lg:grid-cols-3 with equal column widths
- Container: max-w-7xl mx-auto for centering
- Column: flex-1 or grid with fr units
- Gap: gap-6 lg:gap-8 for generous spacing

---

### T-039: Add ARIA Labels and Semantic HTML

**Purpose**: Ensure screen reader users can navigate and use all features
**Required**: Yes
**Dependencies**: T-021, T-026, T-027

**Acceptance Criteria**:

- All interactive elements have aria-label or aria-labelledby
- Columns use semantic HTML (section or article)
- Cards have role and accessible names
- Buttons have descriptive labels
- Live regions announce state changes

**Implementation Notes**:

- Column: <section aria-label="할 일 칼럼">
- Card: <article aria-label={`카드: ${card.title}`}>
- Buttons: aria-label="카드 수정", "카드 삭제"
- Drag state: aria-live="polite" region for announcements
- Reference NFR-007 in spec.md

---

### T-040: Implement Keyboard Navigation

**Purpose**: Enable full application use without mouse for accessibility
**Required**: Yes
**Dependencies**: T-021, T-026, T-017

**Acceptance Criteria**:

- Tab key navigates through all interactive elements
- Enter/Space activates buttons
- Escape closes modals
- Focus visible with clear outline
- Logical tab order (top to bottom, left to right)

**Implementation Notes**:

- Ensure all buttons, inputs have tabIndex (default 0)
- Focus styles: focus:ring-2 focus:ring-blue-500
- Modal: trap focus within modal when open (useEffect)
- Test tab order manually
- Reference NFR-008 in spec.md

---

### T-041: Verify Color Contrast and Visual Accessibility (Optional)

**Purpose**: Ensure WCAG 2.1 Level AA compliance for color contrast
**Required**: No
**Dependencies**: T-004

**Acceptance Criteria**:

- Text contrast ratio ≥ 4.5:1 for normal text
- Large text (18pt+) contrast ≥ 3:1
- Interactive elements distinguishable without color alone
- Focus indicators have 3:1 contrast with background
- Tested with Chrome DevTools or automated tools

**Implementation Notes**:

- Use Tailwind's default colors (already WCAG compliant)
- Text on white: text-gray-900 (21:1), text-gray-700 (9:1)
- Buttons: ensure sufficient contrast
- Tools: Chrome Lighthouse, axe DevTools
- Reference NFR-006 in spec.md

---

## Task Group: Documentation

**Complexity**: Low
**Estimated Tasks**: 3

### T-042: Configure Husky and lint-staged

**Purpose**: Enforce code quality checks before commits
**Required**: Yes
**Dependencies**: T-003

**Acceptance Criteria**:

- Husky pre-commit hook installed
- lint-staged runs ESLint and Prettier on staged files
- Commit blocked if linting fails
- Only staged files checked (fast)

**Implementation Notes**:

- Run: npx husky-init
- Configure .husky/pre-commit: npx lint-staged
- package.json lint-staged config: { "\*.{ts,tsx}": ["eslint --fix", "prettier --write"] }
- Test by committing file with lint errors

---

### T-043: Write README with Setup Instructions

**Purpose**: Document project setup, development, and testing for new developers
**Required**: Yes
**Dependencies**: T-001

**Acceptance Criteria**:

- README includes project description
- Installation steps (Node version, npm install)
- Development commands (dev, build, test, lint)
- Project structure overview
- Technology stack listed

**Implementation Notes**:

- Sections: Overview, Features, Tech Stack, Getting Started, Scripts, Project Structure
- Commands: `npm install`, `npm run dev`, `npm test`, `npm run build`
- Specify Node.js 18.17+ requirement
- Add screenshot or demo link (optional)

---

### T-044: Add JSDoc Comments to Core Functions

**Purpose**: Improve code maintainability with inline documentation
**Required**: Yes
**Dependencies**: T-008 to T-012

**Acceptance Criteria**:

- All Zustand actions have JSDoc comments
- Complex utility functions documented
- Parameters and return types described
- Examples provided where helpful

**Implementation Notes**:

- Format:
  ```typescript
  /**
   * Adds a new card to the specified column
   * @param card - Card data without id, order, timestamps
   * @returns void
   */
  addCard: (card) => { ... }
  ```
- Document edge cases and assumptions

---

## Quality Checklist

### Coverage Verification

- [ ] All spec requirements (US-001 to US-007) mapped to tasks
- [ ] All functional requirements (FR-001 to FR-015) covered
- [ ] All non-functional requirements (NFR-001 to NFR-016) addressed
- [ ] All plan components implemented
- [ ] No duplicate or overlapping tasks

### Task Quality

- [ ] Each task is atomic (single focus)
- [ ] All tasks have clear acceptance criteria
- [ ] Dependencies correctly identified
- [ ] Complexity ratings realistic
- [ ] Required vs Optional clearly marked
- [ ] Implementation guidance provided

### Technical Coverage

- [ ] Setup and configuration complete (T-001 to T-004)
- [ ] Type safety ensured (T-005 to T-007)
- [ ] State management implemented (T-008 to T-012)
- [ ] UI components built (T-013 to T-020)
- [ ] CRUD functionality complete (T-021 to T-028)
- [ ] Drag-and-drop working (T-029 to T-035)
- [ ] Responsive design (T-036 to T-038)
- [ ] Accessibility compliant (T-039 to T-041)
- [ ] Documentation (T-042 to T-044)

---

## Next Steps

To begin implementation, you have three options:

1. **Sequential Implementation**: Work through tasks in order (T-001 → T-044)
   - Recommended for solo developers
   - Ensures dependencies are met
   - Clear progression path

2. **Parallel Implementation**: Work on independent task groups simultaneously
   - Group 1: Setup (T-001 to T-004)
   - Group 2: Types + State (T-005 to T-012) - requires Group 1
   - Group 3: UI Components (T-013 to T-020) - requires Group 1
   - Group 4: CRUD Features (T-021 to T-028) - requires Groups 2, 3
   - Group 5: Drag & Drop (T-029 to T-035) - requires Group 4
   - Group 6: Responsive + A11y (T-036 to T-041) - requires Group 4
   - Group 7: Documentation (T-042 to T-044) - ongoing throughout

3. **Custom Order**: Pick tasks based on priority or preference
   - Check dependencies before starting
   - Focus on must-have features first
   - Leave optional tasks for later

**Recommended Starting Point**: Begin with T-001 (Initialize Next.js Project)

**Estimated Timeline** (solo developer, 4 hours/day):

- Week 1: Setup + Types + State (T-001 to T-012)
- Week 2: UI Components + CRUD (T-013 to T-028)
- Week 3: Drag & Drop + Responsive + Accessibility (T-029 to T-041)
- Week 4: Documentation + Polish (T-042 to T-044)

**Total Effort**: ~60-75 hours
