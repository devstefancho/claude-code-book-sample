# 칸반 보드 (Kanban Board)

드래그 앤 드롭 기능을 지원하는 웹 기반 칸반 보드 애플리케이션

## Features

- **드래그 앤 드롭**: 직관적인 드래그 앤 드롭으로 카드 이동
- **3개의 상태 컬럼**: 할 일, 진행 중, 완료
- **카드 CRUD**: 카드 생성, 수정, 삭제 기능
- **데이터 영속성**: localStorage를 통한 자동 저장
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **접근성**: WCAG 2.1 Level AA 준수, 키보드 네비게이션 지원
- **타입 안전성**: TypeScript와 Zod를 통한 런타임 검증

## Tech Stack

- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 5.0 with persist middleware
- **Drag & Drop**: @dnd-kit
- **Validation**: Zod
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## Requirements

- Node.js 18.17 or higher
- npm 9.0 or higher

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kanban-board-251122

# Install dependencies
npm install
```

### Development

```bash
# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npx prettier --write "src/**/*.{ts,tsx,json}"
```

## Project Structure

```
kanban-board-251122/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── board/              # Board components
│   │   │   ├── KanbanBoard.tsx # Main board with DnD
│   │   │   ├── Column.tsx      # Column with cards
│   │   │   ├── Card.tsx        # Draggable card
│   │   │   └── ColumnHeader.tsx # Column header
│   │   ├── modals/             # Modal components
│   │   │   ├── CardFormModal.tsx # Create/Edit modal
│   │   │   └── ConfirmModal.tsx  # Delete confirmation
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Textarea.tsx
│   │       └── Modal.tsx
│   ├── lib/                    # Utilities
│   │   ├── store.ts            # Zustand store
│   │   ├── validation.ts       # Zod schemas
│   │   └── constants.ts        # Constants
│   └── types/                  # TypeScript types
│       └── index.ts
├── docs/                       # Documentation
│   └── init/
│       ├── spec.md             # Specifications
│       ├── plan.md             # Technical plan
│       └── tasks.md            # Task breakdown
└── public/                     # Static assets
```

## Key Features Implementation

### Drag and Drop

Powered by [@dnd-kit](https://dnd-kit.com/):

- Mouse and touch support
- Keyboard navigation (Space to pick up, Arrow keys to move)
- Cross-column movement
- Same-column reordering
- Visual feedback during drag

### State Management

Zustand store with localStorage persistence:

- Automatic synchronization
- Optimistic UI updates
- Type-safe actions

### Validation

Zod runtime validation:

- Title: 1-200 characters
- Description: 0-2000 characters
- Korean error messages

### Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus management in modals
- WCAG 2.1 Level AA compliant

## Scripts

| Command         | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start development server with Turbopack |
| `npm run build` | Create production build                 |
| `npm start`     | Start production server                 |
| `npm run lint`  | Run ESLint                              |

## Browser Support

- Chrome (latest + 2 previous versions)
- Firefox (latest + 2 previous versions)
- Safari (latest + 2 previous versions)
- Edge (latest + 2 previous versions)

## Contributing

1. Code changes must pass ESLint and TypeScript checks
2. Use Prettier for code formatting
3. Pre-commit hooks will run automatically via Husky

## License

MIT

## Credits

Built with [Claude Code](https://claude.com/claude-code)
