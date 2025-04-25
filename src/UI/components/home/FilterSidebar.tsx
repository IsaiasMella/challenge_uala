"use client";

import { useCallback, useState } from "react";
import Image from "next/image";

import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/common/sheet";
import { Switch } from "@/common/switch";
import { Button } from "@/common/button";
import { Calendar } from "@/common/calendar";
import { cn } from "../../../features/utils/style/cn";

type FilterId = "date" | "card" | "installments" | "amount" | "paymentMethod";

interface FilterConfig {
  id: FilterId;
  label: string;
  icon: string;
}

const FILTERS: FilterConfig[] = [
  { id: "date", label: "Fecha", icon: "/calendar.svg" },
  { id: "card", label: "Tarjeta", icon: "/credit_card.svg" },
  { id: "installments", label: "Cuotas", icon: "/cuotas.svg" },
  { id: "amount", label: "Monto", icon: "/cash.svg" },
  { id: "paymentMethod", label: "Método de cobro", icon: "/folder.svg" },
];

const EMPTY_STATE = FILTERS.reduce<Record<FilterId, boolean>>((acc, { id }) => ({ ...acc, [id]: false }), {} as Record<FilterId, boolean>);

export const FilterSidebar = () => {
  const [active, setActive] = useState<Record<FilterId, boolean>>(EMPTY_STATE);

  /* Helpers */
  const toggle = useCallback((id: FilterId) => setActive((prev) => ({ ...prev, [id]: !prev[id] })), []);

  const clear = () => setActive(EMPTY_STATE);

  const noneChecked = Object.values(active).every((v) => !v);

  /* Render */
  return (
    <Sheet>
      {/* Trigger */}
      <SheetTrigger asChild>
        <Image src="/common/filters.svg" width={24} height={24} alt="Abrir filtros" className="cursor-pointer" />
      </SheetTrigger>

      {/* Sidebar */}
      <SheetContent side="right" className="w-full p-0 sm:w-[400px] border-l-0">
        <div className="flex h-full flex-col bg-white">
          {/* Header */}
          <header className="px-6 pt-12">
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
              <button onClick={clear} className="text-gray-400 hover:text-gray-600">
                Limpiar
              </button>
            </SheetHeader>
          </header>

          {/* Filters */}
          <main className="flex-1 space-y-6 px-8 pt-8">
            {FILTERS.map(({ id, label, icon }) => (
              <section key={id} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={icon} width={20} height={20} alt={`${label} icon`} />
                    <span className="font-semibold">{label}</span>
                  </div>

                  <Switch
                    checked={active[id]}
                    onCheckedChange={() => toggle(id)}
                    className="data-[state=checked]:bg-blue-uala data-[state=unchecked]:bg-slate-500"
                  />
                </div>

                {id === "date" && active[id] && (
                  <div className="mt-4">
                    <Calendar />
                  </div>
                )}
              </section>
            ))}
          </main>

          {/* Footer */}
          <footer className="mb-2 px-6">
            <SheetClose asChild>
              <Button
                disabled={noneChecked}
                className={cn("h-12 w-full rounded-full bg-blue-uala text-white hover:bg-blue-uala/90", noneChecked && "opacity-50")}
              >
                Aplicar filtros
              </Button>
            </SheetClose>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
};
