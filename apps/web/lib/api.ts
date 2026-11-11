import { PropertyPreview, PropertyRow, TenantSummary } from "@pls/types";
import { z } from "zod";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

async function get<T>(path: string, tenantId: string | null, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: tenantId ? { "x-tenant-id": tenantId } : {},
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return schema.parse(await res.json());
}

export const api = {
  tenants: () => get("/tenants", null, z.array(TenantSummary)),
  properties: (tenantId: string, query: URLSearchParams) =>
    get(`/properties?${query.toString()}`, tenantId, z.array(PropertyRow)),
  preview: (tenantId: string, id: string) => get(`/properties/${id}/preview`, tenantId, PropertyPreview),
};
