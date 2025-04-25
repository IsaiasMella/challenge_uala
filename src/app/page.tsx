import { Collections } from "@/UI/sections/home/collections";
import { TransactionHistory } from "@/UI/sections/home/transaction-history";

export default function Home() {
  return (
    <main>
      <Collections />
      <TransactionHistory />
    </main>
  );
}
