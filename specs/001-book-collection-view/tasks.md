# Tasks: book-collection-view

**Input**: Design documents from `/specs/001-book-collection-view/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base dependencies

- [x] T001 Initialize React TypeScript project using Vite (`npx -y create-vite@latest ./ --template react-ts`) in root directory
- [x] T002 [P] Configure ESLint and Prettier rules in `eslint.config.js` and `.prettierrc`
- [x] T003 [P] Install Supabase JS SDK (`npm install @supabase/supabase-js`)
- [x] T004 Setup local environment variables structure in `.env.local`
- [x] T005 Initialize the central Supabase client in `src/lib/supabase.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and UI baseline required before feature implementation

- [x] T006 Initialize base Vanilla CSS styling system in `src/index.css` (Implement modern typography like 'Inter', vibrant color palettes, and glassmorphism tokens)
- [x] T007 [P] Clean up default Vite boilerplate and establish layout wrapper in `src/App.tsx`
- [x] T008 [P] Establish directory structure (`src/types`, `src/repositories`, `src/hooks`, `src/components`, `src/pages`)

**Checkpoint**: Foundation ready - UI shell is styled, and project is correctly modularized.

---

## Phase 3: User Story 1 - View Book Collection Showcase (Priority: P1) 🎯 MVP

**Goal**: Display a visual, read-only list of the personal book collection fetching from Supabase.

**Independent Test**: Loading the web application immediately queries the repository and renders a grid of books.

### Implementation for User Story 1

- [x] T009 [P] [US1] Create Book data models and types in `src/types/book.ts`
- [x] T010 [P] [US1] Create `IBookRepository` interface in `src/repositories/book-repository.ts`
- [x] T011 [US1] Implement `SupabaseBookRepository` matching the interface in `src/repositories/supabase-book-repository.ts` (Depends on T010)
- [x] T012 [US1] Create custom data-fetching hook `useBooks` utilizing the repository in `src/hooks/useBooks.ts`
- [x] T013 [P] [US1] Build premium presentational `BookCard` component in `src/components/BookCard/BookCard.tsx` and accompanying `src/components/BookCard/BookCard.css` (must include hover micro-animations)
- [x] T014 [US1] Build responsive container `BookGrid` to map over items in `src/components/BookGrid/BookGrid.tsx` and `src/components/BookGrid/BookGrid.css`
- [x] T015 [US1] Assemble the `BookShowcase` page coordinating the data hook and grid in `src/pages/BookShowcase/BookShowcase.tsx`
- [x] T016 [US1] Integrate `BookShowcase` into `src/App.tsx` router/main-view

**Checkpoint**: At this point, User Story 1 should be fully functional, displaying books mapped from Supabase visually.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and edge cases

- [x] T017 [P] Add loading skeletons for data fetching delay inside `src/components/BookGrid/BookGrid.tsx`
- [x] T018 [P] Add empty state/fallback placeholder rendering if a book cover is missing or the list is completely empty
- [x] T019 Polish responsive breakpoints in CSS to ensure the grid behaves correctly on mobile and desktop
- [x] T020 Run manual UI inspection to guarantee premium aesthetic compliance 

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Opportunities

- Base types (`T009`) and interfaces (`T010`) can be written entirely context-free.
- The `BookCard` standard UI component (`T013`) can be mocked and styled independently of the Supabase API wiring (`T011`, `T012`).

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and 2 ensuring project builds and looks solid globally.
2. Complete data binding (T009 -> T012).
3. Complete modular UI (T013 -> T015).
4. **STOP and VALIDATE**: Test that the SPA fetches and renders data accurately.
