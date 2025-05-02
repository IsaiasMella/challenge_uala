"use client";

import { useCallback, useState, useMemo, useEffect } from "react";

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
import moment from "moment";
import "moment/locale/es";

export const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterValues, setFilterValues] = useState<FilterState>(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Función helper para parsear el DateRange
    const parseDateRange = (params: URLSearchParams): DateRange | undefined => {
      const from = params.get(URL_PARAMS.DATE_FROM);
      const to = params.get(URL_PARAMS.DATE_TO);
      
      if (!from && !to) return undefined;
      
      try {
        return {
          from: from ? moment(from, 'YYYY-MM-DD').toDate() : undefined,
          to: to ? moment(to, 'YYYY-MM-DD').toDate() : undefined
        };
      } catch {
        return undefined;
      }
    };

    const initialState: FilterState = {
      date: parseDateRange(params),
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
      date: params.has(URL_PARAMS.DATE_FROM) || params.has(URL_PARAMS.DATE_TO),
      card: (params.get(URL_PARAMS.CARD) || '').split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      installments: (params.get(URL_PARAMS.INSTALLMENTS) || '').split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      amount: params.has(URL_PARAMS.AMOUNT_MIN) || params.has(URL_PARAMS.AMOUNT_MAX),
      paymentMethod: !!params.get(URL_PARAMS.PAYMENT_METHOD),
    };
  });

  const [pendingUrlUpdate, setPendingUrlUpdate] = useState<{ params: URLSearchParams; id: FilterId } | null>(null);

  const switchToggle = useCallback((id: FilterId) => {
    setActiveFilters(prev => {
      const newActiveFilters = {
        ...prev,
        [id]: !prev[id]
      };

      // Si se está apagando el switch, preparar la actualización de la URL
      if (!newActiveFilters[id]) {
        const params = new URLSearchParams(searchParams.toString());

        switch (id) {
          case 'date':
            params.delete(URL_PARAMS.DATE_FROM);
            params.delete(URL_PARAMS.DATE_TO);
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

        setPendingUrlUpdate({ params, id });
      }

      return newActiveFilters;
    });
  }, [searchParams]);

  useEffect(() => {
    if (pendingUrlUpdate) {
      router.push(`?${pendingUrlUpdate.params.toString()}`, { scroll: false });
      setPendingUrlUpdate(null);
    }
  }, [pendingUrlUpdate, router]);

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

    // Manejo de fechas
    if (!filterValues.date?.from && !filterValues.date?.to) {
      params.delete(URL_PARAMS.DATE_FROM);
      params.delete(URL_PARAMS.DATE_TO);
    } else {
      if (filterValues.date.from) {
        params.set(URL_PARAMS.DATE_FROM, moment(filterValues.date.from).format('YYYY-MM-DD'));
      } else {
        params.delete(URL_PARAMS.DATE_FROM);
      }
      
      if (filterValues.date.to) {
        params.set(URL_PARAMS.DATE_TO, moment(filterValues.date.to).format('YYYY-MM-DD'));
      } else {
        params.delete(URL_PARAMS.DATE_TO);
      }

      setActiveFilters(prev => ({
        ...prev,
        date: true
      }));
    }

    // Manejo de tarjetas
    if (filterValues.card.length > 0) {
      params.set(URL_PARAMS.CARD, filterValues.card.join(SEPARATORS.ARRAY));
      setActiveFilters(prev => ({ ...prev, card: true }));
    } else {
      params.delete(URL_PARAMS.CARD);
    }

    // Manejo de cuotas
    if (filterValues.installments.length > 0) {
      params.set(URL_PARAMS.INSTALLMENTS, filterValues.installments.join(SEPARATORS.ARRAY));
      setActiveFilters(prev => ({ ...prev, installments: true }));
    } else {
      params.delete(URL_PARAMS.INSTALLMENTS);
    }

    // Manejo de montos
    if (filterValues.amount.min >= DEFAULT_AMOUNT_VALUES.AMOUNT.MIN || filterValues.amount.max <= DEFAULT_AMOUNT_VALUES.AMOUNT.MAX) {
      params.set(URL_PARAMS.AMOUNT_MIN, filterValues.amount.min.toString());
      params.set(URL_PARAMS.AMOUNT_MAX, filterValues.amount.max.toString());
      setActiveFilters(prev => ({ ...prev, amount: true }));
    } else {
      params.delete(URL_PARAMS.AMOUNT_MIN);
      params.delete(URL_PARAMS.AMOUNT_MAX);
    }

    // Manejo de métodos de pago
    if (filterValues.paymentMethod.length > 0) {
      params.set(URL_PARAMS.PAYMENT_METHOD, filterValues.paymentMethod.join(SEPARATORS.ARRAY));
      setActiveFilters(prev => ({ ...prev, paymentMethod: true }));
    } else {
      params.delete(URL_PARAMS.PAYMENT_METHOD);
    }

    // Actualizar la URL sin recargar la página
    router.push(`?${params.toString()}`, { scroll: false });
  }, [filterValues, router, searchParams]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative ">
          <Image src="/common/filters.svg" width={24} height={24} alt="Abrir filtros" className="cursor-pointer" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-uala text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="w-full p-0 sm:w-[400px] border-l-0 pt-8">
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
