import { createAsync, query, useParams } from "@solidjs/router";
import { createResource, For } from "solid-js";
import { db } from "~/db/db";

async function getConversation(number: string) {
  "use server";
  const conversation = db.query(`
    SELECT * FROM messages
    WHERE number = ?
    ORDER BY timestamp ASC, is_sent ASC
  `).all(number) as { id: string, number: string; body: string; timestamp: string, is_sent: string, is_read: boolean, verified: boolean }[];
  return conversation;
};

export function MessageHistory() {
  const params = useParams();
  const conversation = createAsync(() => getConversation(params.number));
  const flex_reverse = (is_sent: boolean) => is_sent ? "flex-row-reverse" : "";

  return (
    <div class="flex flex-col gap-4 p-4">
      <For each={conversation()}>
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
