import { AmountFilter } from "@/UI/components/home/filter-sidebar/AmountFilter";
import { CardFilter } from "@/UI/components/home/filter-sidebar/CardFilter";
import { DateFilter } from "@/UI/components/home/filter-sidebar/DateFilter";
import { InstallmentsFilter } from "@/UI/components/home/filter-sidebar/InstallmentsFilter";
import { PaymentMethodFilter } from "@/UI/components/home/filter-sidebar/PaymentMethodFilter";

import type { FilterConfig, FilterId } from "@/types/sections/home/filterSidebar";

export const FILTERS: FilterConfig<any>[] = [
    { id: "date", label: "Fecha", icon: "/calendar.svg", component: DateFilter },
    // { id: "card", label: "Tarjeta", icon: "/credit_card.svg", component: CardFilter },
    // { id: "installments", label: "Cuotas", icon: "/cuotas.svg", component: InstallmentsFilter },
    // { id: "amount", label: "Monto", icon: "/cash.svg", component: AmountFilter },
    // { id: "method", label: "Método de cobro", icon: "/folder.svg", component: PaymentMethodFilter },
];

export const INITIAL_ACTIVE_FILTERS_STATE = FILTERS.reduce(
    (acc, { id }) => ({ ...acc, [id]: false }),
    {} as Record<FilterId, boolean>
);