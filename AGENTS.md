# Agents

## Cursor Cloud specific instructions

### Project overview

Single-service Next.js (v15) app with Prisma and SQLite. No Docker, no external APIs. A minimal Notes CRUD demo exercises Server Components, Server Actions, REST routes, and database access.

### Running the dev server

```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

The server starts on `http://localhost:3000`.

### Commands reference

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Test | `npm run test` |
| Build | `npm run build` |
| Full validation | `npm run check` |
| Push schema | `npm run db:push` |
| Seed database | `npm run db:seed` |
| DB browser | `npm run db:studio` |

### Key caveats

- `DATABASE_URL` is required and validated at startup via `envalid` in `src/lib/env.ts`. If missing, the process crashes immediately.
- SQLite database file lives at `prisma/dev.db` (gitignored). Run `npm run db:push` before first use.
- Prisma client is generated to `src/generated/prisma`. Run `npx prisma generate` after schema changes (also runs on `postinstall` and `build`).
- Validate changes with `npm run check`, not just lint.
- **Where to edit:**
  - Models: `prisma/schema.prisma`
  - Queries/validation: `src/lib/notes.ts` (add new modules alongside)
  - REST API: `src/app/api/`
  - Server Actions: `src/actions/`
  - UI: `src/app/` and `src/app/components/`

### Architecture notes

- **Reads:** Server Component (`src/app/page.tsx`) calls `getNotes()` directly
- **Creates (UI):** Server Action in `src/actions/notes.ts`
- **Creates/deletes (API):** REST routes under `src/app/api/notes/`
