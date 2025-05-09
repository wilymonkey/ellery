import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  number: int().notNull(),
});

export const messages = sqliteTable("messages", {
  id: int().primaryKey({ autoIncrement: true }),
  contact_id: int().notNull(),
  body: text().notNull(),
  timestamp: integer({ mode: 'timestamp' }).notNull(),
});
