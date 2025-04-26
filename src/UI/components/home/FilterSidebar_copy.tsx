"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";

import { Switch } from "@/common/switch";
import { Button } from "@/common/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/common/sheet";
import { cn } from "../../../features/utils/style/cn";

import { FILTERS, INITIAL_ACTIVE_FILTERS_STATE } from "@/constants/home/filters-sidebar/filters";
import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

/* ------------------------------------------------------------------------- */
/*                                interfaces                                 */
/* ------------------------------------------------------------------------- */

interface FilterSidebarProps {
  /** Filtros confirmados que ya afectan la UI */
  committedFilters: FilterState;
  /** Ejecutar cuando el usuario confirma nuevos filtros */
  onApply: (next: FilterState) => void;
}

/* ------------------------------------------------------------------------- */
/*                            helper functions                               */
/* ------------------------------------------------------------------------- */

const buildInactive = () => ({ ...INITIAL_ACTIVE_FILTERS_STATE });

/* ------------------------------------------------------------------------- */
/*                              FilterSidebar                                */
/* ------------------------------------------------------------------------- */

export const FilterSidebar = ({ committedFilters, onApply }: FilterSidebarProps) => {
  /* drawer open/close */
  const [open, setOpen] = useState(false);

  /* draft */
  const [draftValues, setDraftValues] = useState<FilterState>(committedFilters);
  const [draftActive, setDraftActive] = useState<Record<FilterId, boolean>>(buildInactive());

  /* --------------------------- open / close ------------------------------ */
  const handleOpenChange = (next: boolean) => {
    if (next) {
      // al abrir: copia del estado comprometido
      setDraftValues(committedFilters);
      setDraftActive(buildInactive());
    }
    setOpen(next);
  };

  /* --------------------------- utilidades -------------------------------- */
  const draftActiveCount = useMemo(
    () => Object.values(draftActive).filter(Boolean).length,
    [draftActive]
  );

  /* --------------------------- handlers ---------------------------------- */
  const switchToggle = useCallback((id: FilterId) => {
    setDraftActive(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleDraftChange = useCallback((id: FilterId, value: unknown) => {
    setDraftValues(prev => ({ ...prev, [id]: value }));
  }, []);

  const clearDraft = useCallback(() => {
    setDraftActive(buildInactive());
    // Si quieres resetear valores también:
    // setDraftValues(INITIAL_FILTER_VALUES);
  }, []);

  const applyDraft = () => {
    onApply(draftValues);   // ⬅️  “commit”
    setOpen(false);
  };

  /* ---------------------------------------------------------------------- */
  /*                                   UI                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {/* ----------------- Trigger + badge ----------------- */}
      <SheetTrigger asChild>
        <div className="relative">
          <Image src="/common/filters.svg" width={24} height={24} alt="Abrir filtros" className="cursor-pointer" />
          {draftActiveCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-uala text-xs text-white">
              {draftActiveCount}
            </span>
          )}
        </div>
      </SheetTrigger>

      {/* ----------------- Drawer ----------------- */}
      <SheetContent side="right" className="w-full p-0 sm:w-[400px] border-l-0">
        <div className="flex h-full flex-col">
          {/* ---------- Header ---------- */}
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
                onClick={clearDraft}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                Limpiar
              </Button>
            </SheetHeader>
          </header>

          {/* ---------- Contenido ---------- */}
          <main className="flex-1 space-y-6 px-8 pt-3 overflow-y-auto mb-24">
            {FILTERS.map(({ id, label, icon, component: FilterComponent }) => (
              <section key={id} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={icon} width={20} height={20} alt={`${label} icon`} />
                    <span className="font-semibold">{label}</span>
                  </div>

                  <Switch
                    checked={draftActive[id]}
                    onCheckedChange={() => switchToggle(id)}
                    className="data-[state=checked]:bg-blue-uala data-[state=unchecked]:bg-slate-500"
                  />
                </div>

                {draftActive[id] && (
                  <FilterComponent
                    value={draftValues[id]}
                    onChange={(v: unknown) => handleDraftChange(id, v)}
                  />
                )}
              </section>
            ))}
          </main>

          {/* ---------- Footer / CTA ---------- */}
          <footer className="absolute bottom-0 left-0 right-0 z-99 mb-2 px-6">
            <Button
              disabled={draftActiveCount === 0}
              onClick={applyDraft}
              className={cn(
                "h-12 w-full rounded-full bg-blue-uala text-white hover:bg-blue-uala/90 transition-colors",
                draftActiveCount === 0 && "opacity-50 cursor-not-allowed"
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
