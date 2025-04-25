import { create } from "zustand";
import { Transaction } from "@/types/transactions";
import { endpoints } from "@/features/services/endpoints/transactions";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  isLoading: false,
  error: null,
  setTransactions: (transactions) => set({ transactions }),
  fetchTransactions: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await endpoints.getTransactions();
      set({ transactions: response.data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error al cargar las transacciones";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
