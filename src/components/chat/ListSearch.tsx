export function ChatListSearch() {
  return (
    <div class="flex gap-2 bg-zinc-800 rounded-md h-min px-4 py-2 items-center">
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
  );
}
