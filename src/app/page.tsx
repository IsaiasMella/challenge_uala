import { Collections } from "@/UI/sections/home/Collections";
import { TransactionHistory } from "@/UI/sections/home/TransactionHistory";

export default function Home() {
  return (
    <main>
      <Collections />
      <TransactionHistory />
    </main>
  );
}
