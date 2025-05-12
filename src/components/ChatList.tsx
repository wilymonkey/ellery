import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";
import { db } from "~/db/db";

const getChats = query(async () => {
  "use server";
  const chats = db.query(`
    WITH ranked_messages AS (
      SELECT 
        number,
        body,
        is_read,
        timestamp,
        -- First sort by timestamp (newest first), then prefer sent messages
        ROW_NUMBER() OVER (
          PARTITION BY number 
          ORDER BY timestamp DESC, is_sent DESC, id DESC
        ) as rank
      FROM messages
    )
    SELECT number, body, is_read
    FROM ranked_messages
    WHERE rank = 1
    ORDER BY timestamp DESC;
  `).all() as { number: string; body: string; is_read: boolean }[];
  return chats;
}, "numbers");

export function ChatList() {
  const messages = createAsync(() => getChats());

  return (
    <For each={messages()}>
      {(item) => {
        return (
          <div class="rounded-md hover:bg-zinc-800 p-4">
            <div class="">
              {item.number}
            </div>
            <div class="line-clamp-[2]">
              {item.body}
            </div>
          </div>
        );
      }}
    </For>
  );
}
