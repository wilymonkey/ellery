import { useLocation } from "@solidjs/router";
import { JSX } from "solid-js";

export default function Nav() {

  return (
    <nav class="bg-slate-900 shadow-xs shadow-black">
      <ul class="flex flex-col justify-center p-4 text-gray-200 gap-4 h-full">
        <NavItem link="/" icon="chat-bubble">SMS</NavItem>
        <NavItem link="/orders" icon="box">Orders</NavItem>
        <NavItem link="/templates" icon="template">Templates</NavItem>
        <NavItem link="/contacts" icon="user">Contacts</NavItem>
        <div class="grow"></div>
        <NavItem link="/settings" icon="cog">Settings</NavItem>
      </ul>
    </nav>
  );
}

function NavItem(props: { link: string, icon: string, children?: JSX.Element }) {
  const location = useLocation();
  const active = (path: string) => path == location.pathname ? "bg-slate-700" : "";

  return (
    <a href={props.link}>
      <li class={`${active(props.link)} p-4 rounded-md hover:bg-slate-700 relative group`}>
        <svg><use href={`sprites.svg#${props.icon}`}></use></svg>
        <div class="hidden group-hover:flex items-center absolute top-0 left-0 z-10 h-full">
          <div class="w-[56px]"></div>
          <div class="mx-2 bg-slate-600 p-2 rounded-md">
            {props.children}
          </div>
        </div>
      </li>
    </a>
  )
}
