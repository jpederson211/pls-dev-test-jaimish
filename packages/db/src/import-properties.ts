import { readFileSync } from "node:fs";
import { and, eq } from "drizzle-orm";
import { db, sqlClient } from "./client.js";
import { owners, properties } from "./schema.js";

// Usage: pnpm import:properties <path-to-csv> [tenantId]
// Expected columns: apn,address,city,zip,units,year_built,owner_name,mailing_address,tier,last_sale_date

const file = process.argv[2] ?? "../../data/properties_export.csv";
const tenantId = process.argv[3] ?? "prescott";

const lines = readFileSync(file, "utf8").split(/\r?\n/).filter((l) => l.length > 0);
const rows = lines.slice(1).map((l) => l.split(","));

const ownerCache = new Map<string, string>();
async function ownerId(name: string, mailing: string): Promise<string | null> {
  if (!name) return null;
  if (ownerCache.has(name)) return ownerCache.get(name)!;
  const found = await db.select().from(owners).where(and(eq(owners.tenantId, tenantId), eq(owners.name, name)));
  const id = found[0]?.id ?? (await db.insert(owners).values({ tenantId, name, mailingAddress: mailing }).returning())[0].id;
  ownerCache.set(name, id);
  return id;
}

for (const r of rows) {
  const [apn, address, city, zip, units, yearBuilt, ownerName, mailing, tier, lastSale] = r;
  if (!apn) continue;
  const sale = new Date(lastSale);
  const values = {
    tenantId,
    apn,
    address,
    city,
    zip,
    units: Number.isNaN(parseInt(units)) ? null : parseInt(units),
    yearBuilt: Number.isNaN(parseInt(yearBuilt)) ? null : parseInt(yearBuilt),
    tier: tier ? tier.toUpperCase() : null,
    ownerId: await ownerId(ownerName, mailing),
    lastSaleDate: Number.isNaN(sale.getTime()) ? null : sale.toISOString().slice(0, 10),
  };
  await db
    .insert(properties)
    .values(values)
    .onConflictDoUpdate({ target: [properties.tenantId, properties.apn], set: values });
}

console.log("Import finished.");
await sqlClient.end();
