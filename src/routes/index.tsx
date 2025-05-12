import { MetaProvider, Title } from "@solidjs/meta";
import { ChatList } from "~/components/ChatList";
import { ElleryLogo } from "~/components/ElleryLogo";


export default function Home() {
  return (
    <MetaProvider>
      <Title>Ellery - SMS</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-slate-800 p-4">
          <Search />
          <ChatList />
        </div>
        <ElleryLogo />
      </main>
    </MetaProvider>
  );
}

function Search() {
  return (
    <div class="flex gap-2 bg-slate-700 rounded-md h-min p-2 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      <input class="outline-none" type="search" id="chat-search" name="q" placeholder="Search" />
    </div>
  )
}
