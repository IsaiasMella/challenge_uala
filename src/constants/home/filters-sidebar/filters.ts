import { CardFilter } from "@/UI/components/home/filter-sidebar/filters/CardFilter";
import { DateFilter } from "@/UI/components/home/filter-sidebar/filters/DateFilter";
import { AmountFilter } from "@/UI/components/home/filter-sidebar/filters/AmountFilter";
import { InstallmentsFilter } from "@/UI/components/home/filter-sidebar/filters/InstallmentsFilter";
import { PaymentMethodFilter } from "@/UI/components/home/filter-sidebar/filters/PaymentMethodFilter";

import type {
  FilterConfig,
  FilterId,
  FilterState,
} from "@/types/sections/home/filterSidebar";

export const FILTERS: FilterConfig[] = [
  { id: "date", label: "Fecha", icon: "/calendar.svg", component: DateFilter },
  {
    id: "card",
    label: "Tarjeta",
    icon: "/credit_card.svg",
    component: CardFilter,
  },
  {
    id: "installments",
    label: "Cuotas",
    icon: "/cuotas.svg",
    component: InstallmentsFilter,
  },
  { id: "amount", label: "Monto", icon: "/cash.svg", component: AmountFilter },
  {
    id: "paymentMethod",
    label: "Método de cobro",
    icon: "/folder.svg",
    component: PaymentMethodFilter,
  },
];

export const ALL = "Todas" as const;

export const URL_PARAMS = {
  DATE_FROM: "date_from",
  DATE_TO: "date_to",
  CARD: "card",
  INSTALLMENTS: "installments",
  AMOUNT_MIN: "amountMin",
  AMOUNT_MAX: "amountMax",
  PAYMENT_METHOD: "paymentMethod",
} as const;

export const DEFAULT_AMOUNT_VALUES = {
  AMOUNT: {
    MIN: 0,
    MAX: 500,
  },
} as const;

export const SEPARATORS = {
  DATE_RANGE: "_",
  ARRAY: ",",
} as const;

export const INITIAL_FILTERS_STATE: FilterState = {
  date: undefined,
  card: [],
  installments: [],
  amount: { min: 0, max: 500 },
  paymentMethod: [],
};

export const INITIAL_ACTIVE_FILTERS_STATE = FILTERS.reduce(
  (acc, { id }) => ({ ...acc, [id]: false }),
  {} as Record<FilterId, boolean>,
);
