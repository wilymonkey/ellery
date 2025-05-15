import { useLocation, useNavigate, useParams } from "@solidjs/router";
import { onMount } from "solid-js";
import { ChatHeader } from "~/components/chat/Header";
import { ChatSendBox } from "~/components/chat/SendBox";
import { ChatHistory } from "~/components/chat/History";

function phoneNumberInvalid(phone: string) {
  // +614XXXXXXXX Only.
  const ausMobileRegex = /^\+614\d{8}$/;
  const cleanedPhone = phone.replace(/\s/g, '');
  return !ausMobileRegex.test(cleanedPhone);
};

export default function Messaging() {
  const navigate = useNavigate();

  onMount(() => {
    const params = useParams();
    if (phoneNumberInvalid(params.number)) {
      navigate("/", { replace: true })
    }
  });

  return (
    <div class="flex flex-col w-full">
      <ChatHeader />
      <ChatHistory />
      <ChatSendBox />
    </div>
  )
}
