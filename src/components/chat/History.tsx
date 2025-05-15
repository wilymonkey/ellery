import { createAsync, query, useParams } from "@solidjs/router";
import { createResource, For } from "solid-js";
import { db } from "~/db/db";

type Message = { id: string, number: string; body: string; timestamp: string, is_sent: string, is_read: boolean, verified: boolean }

const getHistory = query(
  (number: string) => {
    "use server";
    return db.query(`
    SELECT * FROM messages
    WHERE number = ?
    ORDER BY timestamp ASC, is_sent ASC
  `).all(number) as Message[];
  },
  "getHistory"
);

export function ChatHistory() {
  const params = useParams();
  const history = createAsync(async () => getHistory(params.number));
  const flex_reverse = (is_sent: boolean) => is_sent ? "flex-row-reverse" : "";

  return (
    <div class="flex flex-col gap-4 p-4 grow">
      <For each={history()}>
        {(message) => {
          const is_sent = message.is_sent === "TRUE";
          return (
            <div class={`flex ${flex_reverse(is_sent)}`}>
              <div class="rounded-xl p-4 bg-zinc-800">
                {message.body}
              </div>
              <div class="w-[20%] grow"></div>
            </div>
          );
        }}
      </For>
    </div>
  );
}
