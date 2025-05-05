import { Collections } from "@/UI/sections/home/Collections";
import { TransactionHistory } from "@/UI/sections/home/TransactionHistory";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Collections />
      <TransactionHistory />
    </main>
  );
}
