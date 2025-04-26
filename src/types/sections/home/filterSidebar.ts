import { DateRange } from "react-day-picker";
import { ComponentType } from "react";

export type FilterId = "date" | "card" | "installments" | "amount" | "paymentMethod" | "method";

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

// export type FilterValue = {
//   date: DateRange | undefined;
//   card: string[];
//   installments: string[];
//   amount: {
//     min: number;
//     max: number;
//   };
//   paymentMethod: string;
//   method: string[];
// }

export interface FilterState {
  categories: string[];   // categorías seleccionadas para filtrar (array vacío = sin filtro de categoría)
  dateFrom?: string;      // fecha de inicio (ISO string) para filtrar por fecha (undefined si no filtrado)
  dateTo?: string;        // fecha de fin para filtrar por fecha (undefined si no filtrado)
  // ... se pueden añadir más campos de filtro en el futuro ...
}