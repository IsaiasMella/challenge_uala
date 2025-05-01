"use client";

import { useCallback, useState, useMemo } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { DateRange } from "react-day-picker";

import { Switch } from "@/common/switch";
import { Button } from "@/common/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose, SheetTitle } from "@/common/sheet";

import { cn } from "../../../features/utils/style/cn";

import {
  FILTERS,
  SEPARATORS,
  URL_PARAMS,
  DEFAULT_AMOUNT_VALUES,
  INITIAL_FILTERS_STATE,
  INITIAL_ACTIVE_FILTERS_STATE
} from "@/constants/home/filters-sidebar/filters";

import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

export const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterValues, setFilterValues] = useState<FilterState>(() => {
    // Inicializar desde los parámetros de URL si existen
    const params = new URLSearchParams(searchParams.toString());

    // Función helper para parsear el DateRange
    const parseDateRange = (dateStr: string | null): DateRange | undefined => {
      if (!dateStr) return undefined;
      try {
        const [from, to] = dateStr.split(SEPARATORS.DATE_RANGE).map(d => new Date(d));
        return { from, to };
      } catch {
        return undefined;
      }
    };

    const initialState: FilterState = {
      date: parseDateRange(params.get(URL_PARAMS.DATE)),
      card: params.get(URL_PARAMS.CARD)?.split(SEPARATORS.ARRAY).filter(Boolean) || [],
      installments: params.get(URL_PARAMS.INSTALLMENTS)?.split(SEPARATORS.ARRAY).filter(Boolean) || [],
      amount: {
        min: Number(params.get(URL_PARAMS.AMOUNT_MIN)) || DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
        max: Number(params.get(URL_PARAMS.AMOUNT_MAX)) || DEFAULT_AMOUNT_VALUES.AMOUNT.MAX
      },
      paymentMethod: params.get(URL_PARAMS.PAYMENT_METHOD)?.split(SEPARATORS.ARRAY).filter(Boolean) || [],
    };

    return initialState;
  });

  // Inicializar activeFilters basado en los valores de la URL
  const [activeFilters, setActiveFilters] = useState<Record<FilterId, boolean>>(() => {
    const params = new URLSearchParams(searchParams.toString());

    return {
      date: !!params.get(URL_PARAMS.DATE),
      card: (params.get(URL_PARAMS.CARD) || '').split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      installments: (params.get(URL_PARAMS.INSTALLMENTS) || '').split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      amount: params.has(URL_PARAMS.AMOUNT_MIN) || params.has(URL_PARAMS.AMOUNT_MAX),
      paymentMethod: !!params.get(URL_PARAMS.PAYMENT_METHOD),
    };
  });

  const switchToggle = useCallback((id: FilterId) => {
    setActiveFilters(prev => {
      const newActiveFilters = {
        ...prev,
        [id]: !prev[id]
      };

      // Si se está apagando el switch, actualizar la URL y resetear el valor del filtro
      if (!newActiveFilters[id]) {
        const params = new URLSearchParams(searchParams.toString());

        switch (id) {
          case 'date':
            params.delete(URL_PARAMS.DATE);
            setFilterValues(prev => ({ ...prev, date: undefined }));
            break;
          case 'card':
            params.delete(URL_PARAMS.CARD);
            setFilterValues(prev => ({ ...prev, card: [] }));
            break;
          case 'installments':
            params.delete(URL_PARAMS.INSTALLMENTS);
            setFilterValues(prev => ({ ...prev, installments: [] }));
            break;
          case 'amount':
            params.delete(URL_PARAMS.AMOUNT_MIN);
            params.delete(URL_PARAMS.AMOUNT_MAX);
            setFilterValues(prev => ({
              ...prev,
              amount: {
                min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
                max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX
              }
            }));
            break;
          case 'paymentMethod':
            params.delete(URL_PARAMS.PAYMENT_METHOD);
            setFilterValues(prev => ({ ...prev, paymentMethod: [] }));
            break;
        }

        // Actualizar la URL sin recargar la página
        router.push(`?${params.toString()}`, { scroll: false });
      }

      return newActiveFilters;
    });
  }, [router, searchParams]);

  const activeFiltersCount = useMemo(() => {
    return Object.values(activeFilters).filter(Boolean).length;
  }, [activeFilters]);

  const onChangeFilters = useCallback((id: FilterId, value: unknown) => {
    setFilterValues(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(INITIAL_ACTIVE_FILTERS_STATE);
    setFilterValues(INITIAL_FILTERS_STATE);
  }, []);

  const onSubmitFilters = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    // Actualizar o eliminar parámetros según los valores de los filtros
    if (filterValues.date?.from && filterValues.date?.to) {
      const dateStr = `${filterValues.date.from.toISOString()}${SEPARATORS.DATE_RANGE}${filterValues.date.to.toISOString()}`;
      params.set(URL_PARAMS.DATE, dateStr);
    } else {
      params.delete(URL_PARAMS.DATE);
    }

    if (filterValues.card.length > 0) {
      params.set(URL_PARAMS.CARD, filterValues.card.join(SEPARATORS.ARRAY));
    } else {
      params.delete(URL_PARAMS.CARD);
    }

    if (filterValues.installments.length > 0) {
      params.set(URL_PARAMS.INSTALLMENTS, filterValues.installments.join(SEPARATORS.ARRAY));
    } else {
      params.delete(URL_PARAMS.INSTALLMENTS);
    }

    if (filterValues.amount.min > DEFAULT_AMOUNT_VALUES.AMOUNT.MIN || filterValues.amount.max < DEFAULT_AMOUNT_VALUES.AMOUNT.MAX) {
      params.set(URL_PARAMS.AMOUNT_MIN, filterValues.amount.min.toString());
      params.set(URL_PARAMS.AMOUNT_MAX, filterValues.amount.max.toString());
    } else {
      params.delete(URL_PARAMS.AMOUNT_MIN);
      params.delete(URL_PARAMS.AMOUNT_MAX);
    }

    if (filterValues.paymentMethod.length > 0) {
      params.set(URL_PARAMS.PAYMENT_METHOD, filterValues.paymentMethod.join(SEPARATORS.ARRAY));
    } else {
      params.delete(URL_PARAMS.PAYMENT_METHOD);
    }

    // Actualizar la URL sin recargar la página
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filterValues, router, searchParams]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Image src="/common/filters.svg" width={24} height={24} alt="Abrir filtros" className="cursor-pointer" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-uala text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="w-full p-0 sm:w-[400px] border-l-0">
        <form className="flex h-full flex-col" onSubmit={onSubmitFilters}>
          <header className="px-6 pt-12 pb-4">
            <div className="mb-8 flex items-center gap-2">
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <Image src="/common/arrow.svg" width={8} height={14.5} alt="Volver" />
                </Button>
              </SheetClose>
              <SheetTitle className="ml-1 font-semibold">Filtros</SheetTitle>
            </div>

            <SheetHeader className="flex flex-row items-center justify-between">
              <p className="font-semibold">Todos los filtros</p>
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                Limpiar
              </Button>
            </SheetHeader>
          </header>

          <main className="flex-1 space-y-6 px-8 pt-3 overflow-y-auto mb-24">
            {FILTERS.map(({ id, label, icon, component: FilterComponent }) => (
              <section key={id} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={icon} width={20} height={20} alt={`${label} icon`} />
                    <span className="font-semibold">{label}</span>
                  </div>

                  <Switch
                    checked={activeFilters[id]}
                    onCheckedChange={() => switchToggle(id)}
                    className="data-[state=checked]:bg-blue-uala data-[state=unchecked]:bg-slate-500"
                  />
                </div>

                {activeFilters[id] && (
                  <FilterComponent
                    committedFilters={filterValues}
                    onApply={(newFilters) => {
                      onChangeFilters(id, newFilters[id]);
                    }}
                  />
                )}
              </section>
            ))}
          </main>

          <footer className="absolute bottom-0 left-0 right-0 z-99 mb-2 px-6">
            <Button
              type="submit"
              disabled={activeFiltersCount === 0}
              className={cn(
                "h-12 w-full rounded-full bg-blue-uala text-white hover:bg-blue-uala/90 transition-colors",
                activeFiltersCount === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              Aplicar filtros
            </Button>
          </footer>
        </form>
      </SheetContent>
    </Sheet>
  );
};
