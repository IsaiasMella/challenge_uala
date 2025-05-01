import { create } from "zustand";
import { Transaction } from "@/types/transactions";
import { transactions } from "@/features/services/endpoints/transactions";
import moment from "moment";

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
      const response = await transactions.getTransactions();
      
      // Filtrar transacciones hasta el día de hoy
      const today = moment().endOf('day');
      const filteredTransactions = response.data.filter(transaction => 
        moment(transaction.createdAt).isSameOrBefore(today)
      );
      
      set({ transactions: filteredTransactions, isLoading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error al cargar las transacciones";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
