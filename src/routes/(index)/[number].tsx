import { ChatSendSMS } from "~/components/ChatSendSMS";
import { MessageHistory } from "~/components/MessageHistory";

export default function Messaging() {
  return (
    <div class="flex flex-col w-full">
      <MessageHistory />
      <ChatSendSMS />
    </div>
  )
}
