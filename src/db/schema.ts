import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  number: int().notNull(),
});

