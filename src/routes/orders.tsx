import { MetaProvider, Title } from "@solidjs/meta";

export default function Orders() {
  return (
    <MetaProvider>
      <Title>Ellery - Orders</Title>
      <main class="flex gap-4 w-full p-4">
        <div class="flex flex-col gap-4 grow">
          <div class="bg-zinc-800 p-2 rounded-md text-center font-alumni text-2xl font-bold">Ordered</div>
          <div class="border-2 border-zinc-200 rounded-md grow"></div>
        </div>
        <div class="flex flex-col gap-4 grow">
          <div class="bg-zinc-800 p-2 rounded-md text-center font-alumni text-2xl font-bold">Received</div>
          <div class="border-2 border-zinc-200 rounded-md grow"></div>
        </div>
        <div class="flex flex-col gap-4 grow">
          <div class="bg-zinc-800 p-2 rounded-md text-center font-alumni text-2xl font-bold">Completed</div>
          <div class="border-2 border-zinc-200 rounded-md grow"></div>
        </div>
      </main>
    </MetaProvider>
  );
}
