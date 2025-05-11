import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";
import { db } from "~/db/db";
import { contacts } from "~/db/schema";

const getContacts = query(async () => {
  "use server"
  return [];
}, "numbers")

export function ChatList() {
  const messages = createAsync(() => getContacts());

  return (
    <For each={messages()}>
      {(item) => {

        return (
          <div class="rounded-md hover:bg-slate-600 p-4">
            <div class="">
            </div>
            <div class="">
            </div>
          </div>
        );
      }}
    </For>
  )
}
