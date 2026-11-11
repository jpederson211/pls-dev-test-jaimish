import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const url = process.env.DATABASE_URL ?? "postgres://pls:pls@localhost:5432/pls";

export const sqlClient = postgres(url, { max: 5 });
export const db = drizzle(sqlClient, { schema });
export type Db = typeof db;
