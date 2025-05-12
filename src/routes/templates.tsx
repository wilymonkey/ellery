import { MetaProvider, Title } from "@solidjs/meta";
import { ElleryLogo } from "~/components/ElleryLogo";

export default function Templates() {
  return (
    <MetaProvider>
      <Title>Ellery - Templates</Title>
      <main class="flex w-full">
        <div class="flex flex-col gap-2 bg-zinc-900 p-4 min-w-xs">
          <div class="bg-zinc-800 rounded-md h-min p-2 w-full">
            <div class="text-center">Templates</div>
          </div>
        </div>
        <ElleryLogo />
      </main>
    </MetaProvider>
  );
}
