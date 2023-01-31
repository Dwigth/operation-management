import {migrate, MigrateDBConfig} from "postgres-migrations"
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

async function run () {
  const dbConfig: MigrateDBConfig = {
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: parseInt(<string><unknown>DB_PORT),

    // Default: false for backwards-compatibility
    // This might change!
    ensureDatabaseExists: true,

    // Default: "postgres"
    // Used when checking/creating "database-name"
    defaultDatabase: "postgres"
  }

  await migrate(dbConfig, "libs/database/src/lib/migrations")
}

run().then(() => {
  console.debug("[MIGRATIONS SUCCESSFULLY RAN]");
})