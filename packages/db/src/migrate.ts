import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, sqlClient } from "./client.js";

await migrate(db, { migrationsFolder: new URL("../drizzle", import.meta.url).pathname });
console.log("Migrations applied.");
await sqlClient.end();
