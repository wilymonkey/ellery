import { createAsync, query, useLocation } from "@solidjs/router";
import { For } from "solid-js";
import { db } from "~/db/db";
import { simpleNumber } from "~/utils";

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
          ORDER BY timestamp DESC, is_sent DESC
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
  const location = useLocation();
  const active = (number: string) => `/chats/${number}` == location.pathname ? "bg-zinc-800" : "";
  const chatList = createAsync(() => getChats());

  return (
    <For each={chatList()}>
      {(chat) => {
        return (
          <a href={`/chats/${chat.number}`}>
            <div class={`rounded-md hover:bg-zinc-800 p-4 ${active(chat.number)}`}>
              <div class="font-bold">{simpleNumber(chat.number)}</div>
              <div class="line-clamp-[2] text-zinc-400">{chat.body}</div>
            </div>
          </a>
        );
      }}
    </For>
  );
}
