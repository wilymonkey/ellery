import { createAsync, query } from "@solidjs/router";
import { isNotNull } from "drizzle-orm";
import { For } from "solid-js";
import { db } from "~/db/db";
import { contacts } from "~/db/schema";

const getContacts = query(async () => {
  "use server"
  return db.query.contacts.findMany({
    where: isNotNull(contacts.last_message_excerpt)
  });
}, "numbers")

export function ChatList() {
  const messages = createAsync(() => getContacts());

  return (
    <For each={messages()}>
      {(item) => {
        const name = item.name || item.number;

        return (
          <div class="rounded-md hover:bg-slate-600 p-4">
            <div class="">
              {name}
            </div>
            <div class="">
              {item.last_message_excerpt}
            </div>
          </div>
        );
      }}
    </For>
  )
}
