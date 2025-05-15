import { useParams } from "@solidjs/router";
import { simpleNumber } from "~/utils";

export function ChatHeader() {
  const params = useParams();

  return (
    <div class="w-full bg-zinc-800 p-4 font-bold">
      {simpleNumber(params.number)}
    </div>
  )
}
