import { MetaProvider, Title } from "@solidjs/meta";
import { ElleryLogo } from "~/components/ElleryLogo";

export default function Orders() {
  return (
    <MetaProvider>
      <Title>Ellery - Contacts</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-zinc-900 p-4 w-xs">
          <div class="flex gap-2 bg-zinc-800 rounded-md h-min p-2 items-center">
            <svg class="size-5">
              <use href="/sprites.svg#magnifying-glass"></use>
            </svg>
            <input
              class="outline-none w-full"
              type="search"
              id="chat-search"
              name="q"
              placeholder="Search"
            />
          </div>
          <div class="">
          </div>
        </div>
        <ElleryLogo />
      </main>
    </MetaProvider>
  );
}
