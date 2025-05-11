import { Database } from "bun:sqlite";
import { db } from "./db";

type TableSchema = {
  tableName: string;
  schema: string;
  indexes?: string[];
};

export async function migrateTables(
  targetSchemas: TableSchema[]
): Promise<void> {
  console.log("Migrating tables")
  db.exec("BEGIN TRANSACTION");

  try {
    for (const { tableName, schema, indexes = [] } of targetSchemas) {
      await migrateTable(db, tableName, schema, indexes);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

async function migrateTable(
  db: Database,
  tableName: string,
  targetSchema: string,
  targetIndexes: string[] = []
): Promise<void> {
  // Check if table exists
  const tableExists = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?`
    )
    .get(tableName);

  if (!tableExists) {
    // Create fresh table if it doesn't exist
    db.exec(targetSchema);
    createIndexes(db, tableName, targetIndexes);
    return;
  }

  // Create temporary new table
  const tempTableName = `${tableName}_new`;
  db.exec(`DROP TABLE IF EXISTS ${tempTableName}`);
  db.exec(targetSchema.replace(tableName, tempTableName));

  // Get columns from both tables
  const oldColumns = getTableColumns(db, tableName);
  const newColumns = getTableColumns(db, tempTableName);

  // Build the column mapping for data transfer
  const columnsToTransfer = newColumns.filter((col) =>
    oldColumns.includes(col)
  );

  // Transfer data if columns exist in both tables
  if (columnsToTransfer.length > 0) {
    const transferQuery = `
      INSERT INTO ${tempTableName} (${columnsToTransfer.join(", ")})
      SELECT ${columnsToTransfer.join(", ")} FROM ${tableName}
    `;
    db.exec(transferQuery);
  }

  // Replace the old table
  db.exec(`DROP TABLE ${tableName}`);
  db.exec(`ALTER TABLE ${tempTableName} RENAME TO ${tableName}`);

  // Recreate indexes
  createIndexes(db, tableName, targetIndexes);
}

function getTableColumns(db: Database, tableName: string): string[] {
  const columns = db
    .prepare(`PRAGMA table_info(${tableName})`)
    .all() as Array<{ name: string }>;
  return columns.map((c) => c.name);
}

function createIndexes(
  db: Database,
  tableName: string,
  indexQueries: string[]
): void {
  // Drop existing indexes for this table
  const existingIndexes = db
    .prepare(
      `SELECT name FROM sqlite_master 
       WHERE type='index' AND tbl_name=? AND sql IS NOT NULL`
    )
    .all(tableName) as Array<{ name: string }>;

  for (const { name } of existingIndexes) {
    db.exec(`DROP INDEX IF EXISTS ${name}`);
  }

  // Create new indexes
  for (const indexQuery of indexQueries) {
    db.exec(indexQuery);
  }
}
