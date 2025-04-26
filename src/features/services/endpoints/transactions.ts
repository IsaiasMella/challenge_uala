import { Transaction } from "@/types/transactions";
import { api } from "../api/api";

export const transactions = {
  async getTransactions(): Promise<{ data: Transaction[] }> {
    const response = await api.get<Transaction[]>("");
    return response;
  },
};
