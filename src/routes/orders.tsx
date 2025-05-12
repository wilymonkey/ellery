import { MetaProvider, Title } from "@solidjs/meta";

export default function Orders() {
  return (
    <MetaProvider>
      <Title>Ellery - Orders</Title>
      <main class="flex gap-4 w-full p-4">
        <div class="flex flex-col gap-4 grow">
          <div class="bg-slate-700 p-4 rounded-md text-center">Ordered</div>
          <div class="border-2 border-slate-200 rounded-md grow"></div>
        </div>
        <div class="flex flex-col gap-4 grow">
          <div class="bg-slate-700 p-4 rounded-md text-center">Received</div>
          <div class="border-2 border-slate-200 rounded-md grow"></div>
        </div>
        <div class="flex flex-col gap-4 grow">
          <div class="bg-slate-700 p-4 rounded-md text-center">Completed</div>
          <div class="border-2 border-slate-200 rounded-md grow"></div>
        </div>
      </main>
    </MetaProvider>
  );
}
