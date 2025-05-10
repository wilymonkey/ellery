import { index, int, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().default(""),
  number: int().notNull(),
  last_message_excerpt: text(),
  last_message_is_read: integer({ mode: "boolean" }).default(true),
}, (contact) => [
    uniqueIndex("number_idx").on(contact.number)
]);

export const messages = sqliteTable("messages", {
  id: int().primaryKey({ autoIncrement: true }),
  contact_id: int().references(() => contacts.id, { onDelete: "cascade" }).notNull(),
  body: text().notNull(),
  timestamp: integer({ mode: "timestamp" }).notNull(),
  // If the message was either sent from the contact or to the contact, i.e. send direction.
  from_contact: integer({ mode: "boolean" }).default(false),
  is_read: integer({ mode: "boolean" }).default(true),
  verified:  integer({ mode: "boolean" }).default(false),
});

export type Message = typeof messages.$inferInsert;
export type Contact = typeof contacts.$inferInsert;
