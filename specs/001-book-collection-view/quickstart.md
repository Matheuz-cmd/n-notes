# Quickstart: book-collection-view

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Environment

1. Copy the example environment variables file to construct your connection credentials:

```bash
cp .env.example .env.local
```

2. Add your Supabase project URL and anonymous key.
*(Since this is a read-only showcase, the anon key is sufficient to fetch the collection assuming proper row-level-security policies are applied loosely or appropriately for public view).*

```ini
VITE_SUPABASE_URL=https://[YOUR_INSTANCE].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

## Running the Project

1. Install dependencies:
```bash
npm install
```

2. Start the Vite development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`.
