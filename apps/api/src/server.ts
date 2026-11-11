import Fastify from "fastify";
import { db, tenants } from "@pls/db";
import { eq } from "drizzle-orm";
import { registerPropertyRoutes } from "./properties.js";

const app = Fastify({ logger: true });

// Tenant middleware. In production the tenant comes from the Clerk session.
// In this test project the web app sends it in the x-tenant-id header.
app.decorateRequest("tenantId", "");
app.addHook("preHandler", async (req, reply) => {
  if (req.url === "/tenants" || req.url === "/health") return;
  const tenantId = req.headers["x-tenant-id"];
  if (typeof tenantId !== "string" || !tenantId) {
    return reply.code(401).send({ error: "Missing tenant" });
  }
  const found = await db.select().from(tenants).where(eq(tenants.id, tenantId));
  if (!found.length) return reply.code(403).send({ error: "Unknown tenant" });
  req.tenantId = tenantId;
});

app.get("/health", async () => ({ ok: true }));
app.get("/tenants", async () => db.select().from(tenants));

registerPropertyRoutes(app);

const port = Number(process.env.API_PORT ?? 4000);
await app.listen({ port, host: "0.0.0.0" });

declare module "fastify" {
  interface FastifyRequest {
    tenantId: string;
  }
}
