import { useNavigate } from "@solidjs/router";
import { Component, createSignal, Setter } from "solid-js";

export const ChatCreate: Component<{ setHidden: Setter<boolean> }> = (props) => {
  const [phoneNumber, setPhoneNumber] = createSignal("");
  const [isValid, setIsValid] = createSignal(false);
  const navigate = useNavigate();

  function handleInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    setPhoneNumber(value);
    setIsValid(validatePhoneNumber(value));
  }

  function submitNumber(e: Event) {
    e.preventDefault();
    if (isValid()) {
      let number = phoneNumber();
      if (number.startsWith('0')) {
        number = '+61' + number.substring(1);
      }
      props.setHidden((_) => true);
      navigate(`/${number}`, { replace: true });
    }
  }

  function validatePhoneNumber(phone: string) {
    // Formats: 04XX XXX XXX, 04XXXXXXXX, +614XX XXX XXX, +614XXXXXXXX
    const ausMobileRegex = /^(?:\+61|0)4\d{8}$/;
    // Remove all whitespace for validation
    const cleanedPhone = phone.replace(/\s/g, '');
    return ausMobileRegex.test(cleanedPhone);
  };


  return (
    <form onsubmit={submitNumber} class="flex flex-col justify-center h-full gap-4">
      <div>
        <label class="font-alumni font-bold text-xl" for="phone">PHONE NUMBER:</label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber()}
          onInput={handleInput}
          class="border-2 border-zinc-200 rounded-md p-2 outline-none"
        />
      </div>
      <button
        class="disabled:bg-zinc-800 rounded-md p-4 cursor-pointer bg-green-800 font-alumni font-bold text-xl"
        disabled={!isValid()}
      >
        CREATE CHAT
      </button>
    </form>
  )
}
