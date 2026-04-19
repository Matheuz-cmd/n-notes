# Research & Decisions: book-collection-view

## Technology Stack Validation

- **Decision**: Vite + React + TypeScript
- **Rationale**: User-requested standard for modern, fast frontend web development. Vite offers unopinionated minimal bundling suitable for UI. React provides the component ecosystem. TypeScript ensures type safety for the Data Model abstraction.
- **Alternatives considered**: Next.js (too heavy for a statically served read-only application without a dedicated backend phase yet).

## Data Layer Abstraction

- **Decision**: Repository Pattern via Custom React Hooks
- **Rationale**: To enforce Constitution Principle IV (API-Centric Design) and III (Clear Separation of Concerns), the UI components must NOT import Supabase directly. We will implement an interface `IBookRepository` that a custom hook `useBooks` consumes. In this MVP, `SupabaseBookRepository` implements this interface.
- **Alternatives considered**: Direct `useEffect` with Supabase SDK (Rejected due to strict Future-Proof Backend principle).

## State Management

- **Decision**: React Query (implementation pending review, or just simple state hooks)
- **Rationale**: For read-only data, simple `useState`/`useEffect` combination is sufficient. If advanced caching is needed, lightweight `SWR` or `React Query` acts effectively under the hook abstraction. Defaulting to standard generic hooks for simplicity.
- **Alternatives considered**: Redux (rejected due to excessive boilerplate for read-only).
