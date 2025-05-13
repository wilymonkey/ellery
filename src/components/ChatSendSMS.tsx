import { createSignal } from "solid-js";

export function ChatSendSMS() {
  const [body, setBody] = createSignal("");
  function sendSMS() { }
  function handleInput(e: Event) {
    setBody((e.target as HTMLInputElement).value);
  }
  function isValid() {
    return body().length > 1;
  }

  return (
    <form onsubmit={sendSMS} class="flex gap-2 p-4 w-full">
      <input
        type="tel"
        id="phone"
        value={body()}
        onInput={handleInput}
        placeholder="Message"
        class="bg-zinc-800 rounded-md p-2 outline-none w-full"
      />
      <button
        class="disabled:bg-zinc-800 rounded-md p-2 cursor-pointer bg-yellow-600 font-alumni font-bold text-xl"
        disabled={!isValid()}
      >
        <svg class="size-5">
          <use href="/sprites.svg#paper-airplane"></use>
        </svg>
      </button>
    </form>
  )
}
