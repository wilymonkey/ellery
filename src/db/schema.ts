import { migrateTables } from "~/db/migrate";

export type TableSchema = {
  tableName: string;
  schema: string;
  indexes?: string[];
};

export const schemaVersion = 1;

export const schemas = [
  {
    tableName: "messages",
    schema: `
      CREATE TABLE messages (
        id TEXT PRIMARY KEY,
        number TEXT NOT NULL,
        body TEXT NOT NULL,
        timestamp DATETIME NOT NULL,
        is_sent BOOLEAN NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        verified BOOLEAN DEFAULT FALSE
      )
    `,
    indexes: [
      "CREATE INDEX idx_messages_by_number ON messages(number, timestamp DESC, is_sent DESC);",
    ],
  },
  {
    tableName: "contacts",
    schema: `
      CREATE TABLE contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone_number TEXT UNIQUE NOT NULL
      )
    `,
  },
];
