import { DateRange } from "react-day-picker";
import { ComponentType } from "react";

export type FilterId = "date" | "card" | "installments" | "amount" | "paymentMethod";

export interface FilterComponentProps<T> {
  committedFilters: FilterState;                 // filtros actualmente aplicados (confirmados)
  onApply: (newFilters: FilterState) => void;
}

export interface FilterConfig<T = unknown> {
  id: FilterId;
  label: string;
  icon: string;
  component: ComponentType<FilterComponentProps<T>>;
}

export type FilterState = {
  date: DateRange | undefined;
  card: string[];
  installments: string[];
  amount: {
    min: number;
    max: number;
  };
  paymentMethod: string[];
}
