# PLS developer test

A small copy of the PLS project used for the paid developer test. Read the test brief you were sent first.

## Run it locally

You need Node 22, pnpm 9 and Postgres 16 (Docker is easiest).

```bash
cp .env.example .env
docker compose up -d          # or use your own Postgres and change DATABASE_URL
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev                      # web on http://localhost:3000, API on http://localhost:4000
```

The tenant switcher in the top bar stands in for sign-in. Switch between "The Prescott Team" and "Bayside Commercial".

## Useful commands

| Command | What it does |
|---|---|
| `pnpm check` | Everything CI runs: typecheck, lint, tests, migration check, build |
| `pnpm db:generate` | Create a migration from `packages/db/src/schema.ts` |
| `pnpm db:migrate` | Apply migrations |
| `pnpm db:seed` | Reset and load sample data |
| `pnpm import:properties ../../data/properties_export.csv prescott` | Import the CSV into a tenant |

## Layout

```
apps/web        Next.js frontend (Properties screen)
apps/api        Fastify API with tenant middleware
packages/db     Drizzle schema, migrations, seed, import script, tenant query helper
packages/types  zod schemas shared by web and api
specs/          one file per spec, acceptance tests at the bottom
data/           CSV export for the import task
```
