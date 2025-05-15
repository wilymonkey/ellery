import { action, reload, useAction, useParams, useSubmission } from "@solidjs/router";
import { createEffect, createSignal, Setter } from "solid-js";
import { insertMessageInstance, twilioClient } from "~/db/db";
import { myNumber } from "~/db/env";

const sendSMS = action(async (to: string, body: string) => {
  "use server"
  try {
    const result = await twilioClient.messages.create({
      from: myNumber,
      to: to,
      body: body,
    });
    insertMessageInstance(result);
  } catch (e) {
    return Error("error")
  }
  return new Response("success", { status: 200 });
})

export function ChatSendBox() {
  const [body, setBody] = createSignal("");

  function handleInput(e: Event) {
    setBody((e.target as HTMLInputElement).value);
  }
  function isValid() {
    return body().length > 1;
  }
  const submission = useSubmission(sendSMS);
  createEffect(() => {
    if (!submission.pending && submission.result) {
      setBody("");
    }
  });


  return (
    <form action={sendSMS.with(useParams().number, body())} method="post" class="flex gap-2 p-4 w-full">
      <input
        type="text"
        id="body"
        value={body()}
        onInput={handleInput}
        placeholder="Message"
        class="bg-zinc-800 rounded-md p-2 outline-none w-full"
      />
      <button
        class="disabled:bg-zinc-800 rounded-md p-2 cursor-pointer bg-yellow-600 font-alumni font-bold text-xl"
        type="submit"
        disabled={!isValid() || submission.pending}
      >
        <svg class="size-5">
          <use href="/sprites.svg#paper-airplane"></use>
        </svg>
      </button>
    </form>
  )
}
