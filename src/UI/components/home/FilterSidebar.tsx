"use client";

import { useCallback, useState, useMemo } from "react";
import Image from "next/image";

import { Switch } from "@/common/switch";
import { Button } from "@/common/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/common/sheet";

import { cn } from "../../../features/utils/style/cn";

import { FILTERS, INITIAL_ACTIVE_FILTERS_STATE } from "@/constants/home/filters-sidebar/filters";

import type { FilterId } from "@/types/sections/home/filterSidebar";

// const INITIAL_STATE: FilterState = {
//   date: undefined,
//   card: [],
//   installments: [],
//   amount: { min: 0, max: 500 },
//   paymentMethod: "",
//   method: []
// };

export const FilterSidebar = () => {
  // Estado que almacena los valores actuales de cada filtro
  // const [filterValues, setFilterValues] = useState<FilterState>(INITIAL_STATE);

  // <------------------------- SE ENCARGAN de saber si hay algun filtro activo y cuantos filtros están activos ------------------------->
  const [activeFilters, setActiveFilters] = useState<Record<FilterId, boolean>>(INITIAL_ACTIVE_FILTERS_STATE);
  
  const switchToggle = useCallback((id: FilterId) => {
    setActiveFilters(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const activeFiltersCount = useMemo(() => {
    return Object.values(activeFilters).filter(Boolean).length;
  }, [activeFilters]);

  const clearFilters = useCallback(() => {
    setActiveFilters(INITIAL_ACTIVE_FILTERS_STATE);
    // setFilterValues(INITIAL_STATE);
  }, []);

  // <------------------------- SE ENCARGAN de saber si hay algun filtro activo y cuantos filtros están activos ------------------------->
  
  // Función que actualiza el valor seleccionado de un filtro (por ejemplo, la fecha o el rango de monto)
  // const handleFilterChange = useCallback((id: FilterId, value: any) => {
  //   setFilterValues(prev => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // }, []);

  // useEffect(() => {
  //   console.log(active);
  // }, [active]);

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
        <div className="flex h-full flex-col ">
          <header className="px-6 pt-12 pb-4">
            <div className="mb-8 flex items-center gap-2">
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <Image src="/common/arrow.svg" width={8} height={14.5} alt="Volver" />
                </Button>
              </SheetClose>
              <p className="ml-1 font-semibold">Filtros</p>
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
                    // value={filterValues[id]}
                    // onChange={(value) => {}}
                  />
                )}
              </section>
            ))}
          </main>

          <footer className="absolute bottom-0 left-0 right-0 z-99 mb-2 px-6">
            <Button
              disabled={activeFiltersCount === 0}
              className={cn(
                "h-12 w-full rounded-full bg-blue-uala text-white hover:bg-blue-uala/90 transition-colors",
                activeFiltersCount === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              Aplicar filtros
            </Button>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
};
