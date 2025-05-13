import { MetaProvider, Title } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
import { createContext, createSignal, Show } from "solid-js";
import { ChatList } from "~/components/ChatList";
import { ChatSearch } from "~/components/ChatSearch";
import { ChatCreate } from "~/components/ChatCreate";
import { ElleryLogo } from "~/components/ElleryLogo";

export default function SMSLayout(props: RouteSectionProps) {
  const [newSMSHidden, setNewSMS] = createSignal(true);

  return (
    <MetaProvider>
      <Title>Ellery - SMS</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-zinc-900 p-4 w-xs">
          <div class="flex items-center justify-between">
            <div class="font-alumni text-3xl font-bold">
              Chats
            </div>
            <button class="p-2 cursor-pointer" onClick={() => setNewSMS((prev) => !prev)}>
              <Show
                when={newSMSHidden()}
                fallback={
                  <svg class="text-red-400"><use href="sprites.svg#x-circle"></use></svg>
                }>
                <svg><use href="sprites.svg#pencil-square"></use></svg>
              </Show>
            </button>
          </div>
          <Show when={newSMSHidden()} fallback={<ChatCreate setHidden={setNewSMS} />}>
            <ChatSearch />
            <ChatList />
          </Show>
        </div>
        {props.children}
      </main>
    </MetaProvider>
  );
}
