import { Database } from "bun:sqlite";
import { migrateTables } from "~/db/migrate";

export function initSchema() {
  // Define your target schemas
  const targetSchemas = [
    {
      tableName: "messages",
      schema: `
        CREATE TABLE messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone_number TEXT NOT NULL,
          message_text TEXT NOT NULL,
          is_sent BOOLEAN NOT NULL,
          timestamp DATETIME NOT NULL,
          status TEXT,
          read_status BOOLEAN DEFAULT FALSE,
          thread_id INTEGER,
          mms BOOLEAN DEFAULT FALSE
        )
      `,
      indexes: [
        `CREATE INDEX idx_messages_phone_number ON messages(phone_number)`,
        `CREATE INDEX idx_messages_timestamp ON messages(timestamp)`,
        `CREATE INDEX idx_messages_thread_id ON messages(thread_id)`
      ]
    },
    {
      tableName: "contacts",
      schema: `
        CREATE TABLE contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone_number TEXT UNIQUE NOT NULL,
          last_contacted DATETIME,
          is_favorite BOOLEAN DEFAULT FALSE
        )
      `,
      indexes: [
        `CREATE INDEX idx_contacts_phone_number ON contacts(phone_number)`,
        `CREATE INDEX idx_contacts_name ON contacts(name)`
      ]
    }
  ];
  
  migrateTables(targetSchemas);
}
