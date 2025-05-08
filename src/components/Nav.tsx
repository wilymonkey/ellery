import { useLocation } from "@solidjs/router";
import { JSX } from "solid-js";

export default function Nav() {

  return (
    <nav class="bg-slate-900 shadow-xs shadow-black">
      <ul class="flex flex-col justify-center p-4 text-gray-200 gap-4">
        <NavItem link="/">SMS</NavItem>
        <NavItem link="/orders">Orders</NavItem>
      </ul>
    </nav>
  );
}

function NavItem(props: { link: string, children?: JSX.Element }) {
  const location = useLocation();
  const active = (path: string) => path == location.pathname ? "bg-slate-700" : "";

  return (
    <a href={props.link}>
      <li class={`${active(props.link)} p-4 rounded-md w-36 hover:bg-slate-700`}>
        {props.children}
      </li>
    </a>
  )
}
