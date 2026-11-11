import { api } from "../lib/api";
import { TenantSwitcher } from "../components/TenantSwitcher";
import { SearchForm } from "../components/SearchForm";
import { PropertiesTable } from "../components/PropertiesTable";
import { PreviewPanel } from "../components/PreviewPanel";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | undefined>>;

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const tenants = await api.tenants();
  const tenant = params.tenant ?? tenants[0]?.id ?? "prescott";

  const query = new URLSearchParams();
  for (const key of ["apn", "address", "owner", "tier", "sort", "dir"]) {
    const v = params[key];
    if (v) query.set(key, v);
  }
  const rows = await api.properties(tenant, query);
  const preview = params.selected ? await api.preview(tenant, params.selected) : null;

  return (
    <>
      <header>
        <strong>PLS</strong>
        <TenantSwitcher tenants={tenants} current={tenant} />
      </header>
      <main>
        <section className="list">
          <div className="crumb">Properties</div>
          <SearchForm tenant={tenant} values={params} />
          <PropertiesTable rows={rows} params={{ ...params, tenant }} selected={params.selected} />
        </section>
        {preview && <PreviewPanel preview={preview} />}
      </main>
    </>
  );
}
