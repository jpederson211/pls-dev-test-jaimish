import { and, eq, type SQL } from "drizzle-orm";
import type { PgColumn } from "drizzle-orm/pg-core";

/**
 * The tenant query helper. Every tenant-owned query must build its WHERE
 * clause through this function. Never write a raw `where tenant_id = ...`.
 */
export function tenantWhere(
  table: { tenantId: PgColumn },
  tenantId: string,
  ...conditions: (SQL | undefined)[]
): SQL {
  return and(eq(table.tenantId, tenantId), ...conditions) as SQL;
}
