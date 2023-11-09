import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, "db.json");
const routesFile = join(__dirname, "routes.json");
const db = new Low(new JSONFile(dbFile));
const routes = new Low(new JSONFile(routesFile));

export { db, routes };