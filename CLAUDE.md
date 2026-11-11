# Development context (read first)

This is a small test copy of PLS, a multi-tenant web app for commercial real estate brokers. Each tenant (brokerage) must only ever see its own data.

## Stack
Node/TypeScript, Next.js (apps/web), Fastify API (apps/api), Drizzle + Postgres (packages/db), zod contract (packages/types), pnpm workspaces + Turborepo, Vitest. Production also uses Clerk, BullMQ/Redis, Cloudflare R2, Render and Sentry; this test copy fakes sign-in with a tenant switcher.

## Rules
- Every tenant-owned query builds its WHERE clause with `tenantWhere()` from `packages/db`. Never a raw `where tenant_id =`, and never a query without a tenant filter.
- Migrations are generated with `pnpm db:generate` and are owned by the Platform workstream. Do not hand-edit migration files or the `drizzle/meta` folder.
- Web and API share schemas from `packages/types`.
- No `any`. No new dependencies without a reason in the PR.
- Run `pnpm check` before opening a PR.

## How to work a spec
Read `/specs/<ID>.md`. Build to its acceptance tests. PR title is the spec ID and name. PR body lists each acceptance test with pass or fail. If the spec is unclear, stop and ask in the PR.
