# Data Model: book-collection-view

## Entities

### Book

Represents a single book entry in the personal showcase.

**Fields**:
- `id` (UUID): Primary key
- `title` (String): Full title of the book
- `author` (String): Name of the author(s)
- `rating` (Numeric): Rating from 1.0 to 5.0 (allows half-stars e.g., 3.5)
- `status` (String): Reading progression - Enum (`Read`, `Currently Reading`, `Want to Read`)
- `cover_url` (String, Optional): URL to the book cover image
- `init_date` (Date, Optional): Date when the book reading started
- `finish_date` (Date, Optional): Date when the book was finished
- `created_at` (Timestamp): Record creation time

**Relationships**:
- None explicitly defined inside the read-only application. Handled as a flat collection for the MVP.

**Validation Rules**:
- Read-only on frontend. Validity is guaranteed strictly by Supabase constraint schema.

**State Transitions**:
- Read-only; transitions handled exclusively in the database directly.
