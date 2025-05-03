import { DateRange } from "react-day-picker";
import { ComponentType } from "react";

export type FilterId =
  | "date"
  | "card"
  | "installments"
  | "amount"
  | "paymentMethod";

export interface FilterComponentProps {
  committedFilters: FilterState;
  onApply: (_newFilters: FilterState) => void;
}

export interface FilterConfig {
  id: FilterId;
  label: string;
  icon: string;
  component: ComponentType<FilterComponentProps>;
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
};
