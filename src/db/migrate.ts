import { Database } from "bun:sqlite";
import { db } from "./db";
import { schemaVersion, TableSchema } from "./schema";

export async function migrateTables(
  targetSchemas: TableSchema[],
): Promise<void> {
  if (MigrationNotNeeded()) {
    console.log("No migration needed");
    return;
  }
  console.log("Migrating tables");
  db.exec("BEGIN TRANSACTION");

  try {
    for (const { tableName, schema, indexes } of targetSchemas) {
      await migrateTable(db, tableName, schema, indexes);
    }
    db.exec("COMMIT");
    // TODO: Remove once API has settled.
    // db.prepare(`PRAGMA user_version = ${schemaVersion}`).run();
  } catch (error) {
    console.error(`Unable to migrate: ${error}`);
    db.exec("ROLLBACK");
  }
}

async function migrateTable(
  db: Database,
  tableName: string,
  targetSchema: string,
  targetIndexes: string[] = [],
): Promise<void> {
  const tableExists = db
    .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
    .get(tableName);

  if (!tableExists) {
    console.log(`Table "${tableName}" not found, creating from schema`);
    db.exec(targetSchema);
    createIndexes(tableName, targetIndexes);
    return;
  }

  console.log(`Migrating table "${tableName}" to new schema`);
  const tempTableName = `${tableName}_new`;
  db.exec(`DROP TABLE IF EXISTS ${tempTableName}`);
  db.exec(targetSchema.replace(tableName, tempTableName));

  const oldColumns = getTableColumns(db, tableName);
  console.log(`From: ${oldColumns}`);
  const newColumns = getTableColumns(db, tempTableName);
  console.log(`  To: ${newColumns}`);

  const columnsToTransfer = newColumns.filter((col) => oldColumns.includes(col));

  if (columnsToTransfer.length > 0) {
    console.log("Transfering matched columns");
    db.exec(`
      INSERT INTO ${tempTableName} (${columnsToTransfer.join(", ")})
      SELECT ${columnsToTransfer.join(", ")} FROM ${tableName}
    `);
  }

  console.log("Dropping old table");
  db.exec(`DROP TABLE ${tableName}`);
  db.exec(`ALTER TABLE ${tempTableName} RENAME TO ${tableName}`);

  createIndexes(tableName, targetIndexes);
}

function getTableColumns(db: Database, tableName: string): string[] {
  const columns = db
    .prepare(`PRAGMA table_info(${tableName})`)
    .all() as Array<{ name: string }>;
  return columns.map((c) => c.name);
}

function createIndexes(
  tableName: string,
  indexQueries: string[],
): void {
  const existingIndexes = db
    .prepare(
      `SELECT name FROM sqlite_master 
       WHERE type='index' AND tbl_name=? AND sql IS NOT NULL`,
    )
    .all(tableName) as Array<{ name: string }>;

  for (const { name } of existingIndexes) {
    db.exec(`DROP INDEX IF EXISTS ${name}`);
  }

  for (const indexQuery of indexQueries) {
    db.exec(indexQuery);
  }
}

function MigrationNotNeeded(): Boolean {
  const result = db.prepare("PRAGMA user_version").get() as {
    user_version: number;
  };
  console.log(
    `Old Schema v${result.user_version}; New Schema v${schemaVersion}`,
  );
  return schemaVersion === result.user_version;
}
