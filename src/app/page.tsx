import { Collections } from "@/UI/sections/home/Collections";
import { TransactionHistory } from "@/UI/sections/home/TransactionHistory";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Collections />
      <Suspense fallback={null}>
        <TransactionHistory />
      </Suspense>
    </main>
  );
}
