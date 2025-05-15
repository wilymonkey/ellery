import { MetaProvider, Title } from "@solidjs/meta";

export default function Orders() {
  return (
    <MetaProvider>
      <Title>Ellery - Settings</Title>
      <main class="flex items-center justify-center w-full">
        <p class="text-7xl font-alumni">Settings</p>
      </main>
    </MetaProvider>
  );
}
