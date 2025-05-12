import { MetaProvider, Title } from "@solidjs/meta";
import { ChatList } from "~/components/ChatList";
import { ChatSearch } from "~/components/ChatSearch";
import { ElleryLogo } from "~/components/ElleryLogo";

export default function Home() {
  return (
    <MetaProvider>
      <Title>Ellery - SMS</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-zinc-900 p-4 max-w-xs">
          <ChatSearch />
          <ChatList />
        </div>
        <ElleryLogo />
      </main>
    </MetaProvider>
  );
}
