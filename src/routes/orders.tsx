import { MetaProvider, Title } from "@solidjs/meta";

export default function Orders() {
  return (
    <MetaProvider>
      <Title>Ellery - Orders</Title>
      <main class="flex items-center justify-center w-full">
        <p class="text-3xl">Dream of the Possibilities...</p>
      </main>
    </MetaProvider>
  );
}
