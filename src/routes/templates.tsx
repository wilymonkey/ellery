import { MetaProvider, Title } from "@solidjs/meta";
import { ElleryLogo } from "~/components/ElleryLogo";

export default function Templates() {
  return (
    <MetaProvider>
      <Title>Ellery - Templates</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-slate-800 p-4">
          <div class="flex gap-2 bg-slate-700 rounded-md h-min p-2 items-center">
            <div class="px-12 bold">Templates</div>
          </div>
        </div>
        <ElleryLogo />
      </main>
    </MetaProvider>
  );
}
