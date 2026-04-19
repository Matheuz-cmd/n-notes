<!--
Sync Impact Report:
- Version change: 1.0.0 (initial)
- List of modified principles:
  - I. Modern Full-Stack Architecture (New)
  - II. Supabase Primary Backend (New)
  - III. Clear Separation of Concerns (New)
  - IV. API-Centric Design (New)
  - V. Future-Proof Backend Architecture (New)
  - VI. Clean & Modular Code / Incremental Development (New)
- Added sections: Core Principles, Architecture Constraints, Development Workflow, Governance
- Removed sections: N/A
- Templates requiring updates: ✅ Verified (None pending)
- Follow-up TODOs: None
-->

# Personal Book Tracker Constitution

## Core Principles

### I. Modern Full-Stack Architecture
The application MUST be built using a modern full-stack framework. The user interface MUST prioritize reactive updates and clean UI/UX, ensuring a seamless experience for end users.

### II. Supabase Primary Backend
The system MUST use Supabase as the primary backend for database, authentication, and core services. This ensures rapid delivery and robust data integrity.

### III. Clear Separation of Concerns
The codebase MUST strictly delineate UI components, business logic, data access, and API interfacing layers. Mixing these concerns within a single file or component is PROHIBITED.

### IV. API-Centric Design
The UI MUST interact with the backend purely via an API-centric abstraction/adapter layer. Direct database queries from generic UI components are PROHIBITED.

### V. Future-Proof Backend Architecture
The code MUST be structured to allow the seamless introduction of a dedicated backend layer (e.g., Node, Go, or Python) in the future. Migration should require changes ONLY in the abstraction/adapter layer, with zero major UI refactoring.

### VI. Clean & Modular Code / Incremental Development
Features MUST be developed incrementally. The codebase MUST maintain tightly scoped and modular implementations that are independently testable and validatable.

## Architecture Constraints

The project focuses on front-end simplicity backed by BaaS (Backend-as-a-Service) for rapid delivery but rigorously abstracts the BaaS to avoid tight coupling. Any third-party dependencies MUST be evaluated against this abstraction requirement.

## Development Workflow

Incremental changes are MANDATORY. Code is to be introduced in small, verifiable increments. Each feature MUST be verified against the core principles before being merged.

## Governance

All code contributions MUST verify compliance with the Core Principles. Architecture complexity must be justified. The Constitution supersedes all other practices and unwritten conventions. Code reviews MUST actively guarantee the abstraction between UI code and Supabase SDK logic.

**Version**: 1.0.0 | **Ratified**: 2026-04-16 | **Last Amended**: 2026-04-16
