import { MetaProvider, Title } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
import { ChatList } from "~/components/ChatList";
import { ChatSearch } from "~/components/ChatSearch";
import { ElleryLogo } from "~/components/ElleryLogo";

export default function SMSLayout(props: RouteSectionProps) {
  return (
    <MetaProvider>
      <Title>Ellery - SMS</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-zinc-900 p-4 w-xs">
          <ChatSearch />
          <ChatList />
        </div>
        {props.children}
      </main>
    </MetaProvider>
  );
}
