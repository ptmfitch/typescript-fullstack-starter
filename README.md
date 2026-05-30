# TypeScript Full-Stack Starter

Minimal Next.js + Prisma + SQLite starter for building and testing AI coding workflows.

## Prerequisites

- Node.js 20+
- npm

## Quick start

```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Production start | `npm run start` |
| Typecheck | `npm run typecheck` |
| Lint | `npm run lint` |
| Test | `npm run test` |
| Full check | `npm run check` |
| Push schema | `npm run db:push` |
| Seed data | `npm run db:seed` |
| DB browser | `npm run db:studio` |

## Project structure

```
prisma/schema.prisma   Database models
src/lib/notes.ts       Shared queries and validation
src/actions/           Server Actions (UI mutations)
src/app/api/           REST API routes
src/app/components/    Client components
src/app/page.tsx       Server Component homepage
```

## API

- `GET /api/health` — smoke test
- `GET /api/notes` — list notes
- `POST /api/notes` — create `{ "title": "...", "body": "..." }`
- `DELETE /api/notes/:id` — delete a note

## Extend this

1. Add models in `prisma/schema.prisma`, then `npm run db:push`
2. Add query helpers in `src/lib/`
3. Expose REST endpoints under `src/app/api/`
4. Build UI in `src/app/` with Server Components + client components as needed
5. Swap SQLite for Postgres by changing the Prisma datasource and `DATABASE_URL`

## License

MIT
