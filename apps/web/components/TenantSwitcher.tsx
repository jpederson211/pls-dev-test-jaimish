import type { TenantSummary } from "@pls/types";

// Stands in for Clerk sign-in in this test project.
export function TenantSwitcher({ tenants, current }: { tenants: TenantSummary[]; current: string }) {
  return (
    <div>
      Signed in to:
      {tenants.map((t) => (
        <a key={t.id} href={`/?tenant=${t.id}`} className={t.id === current ? "active" : undefined}>
          {t.name}
        </a>
      ))}
    </div>
  );
}
