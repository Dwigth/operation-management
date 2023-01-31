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
    ensureDatabaseExists: true,
    defaultDatabase: "postgres",
  }

  return await migrate(dbConfig, "libs/database/src/lib/migrations")
}

run().then((migrations) => {
    migrations.forEach(m => {
        console.log(`${m.fileName} has ran perfect.`);
    })
    console.debug("[MIGRATIONS SUCCESSFULLY RAN]");
    process.exit();
})