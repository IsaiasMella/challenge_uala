import Image from "next/image";

import { Button } from "@/common/button";
import { SheetClose, SheetHeader, SheetTitle } from "@/common/sheet";

export const FilterHeader = ({ onClearFilters }: { onClearFilters: () => void }) => (
    <header className="px-6 pt-12 pb-4">
      <div className="mb-8 flex items-center gap-2">
        <SheetClose asChild>
          <Button variant="ghost" size="icon">
            <Image
              src="/common/arrow.svg"
              width={8}
              height={14.5}
              alt="Volver"
            />
          </Button>
        </SheetClose>
        <SheetTitle className="ml-1 font-semibold">Filtros</SheetTitle>
      </div>
  
      <SheetHeader className="flex flex-row items-center justify-between">
        <p className="font-semibold">Todos los filtros</p>
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          Limpiar
        </Button>
      </SheetHeader>
    </header>
  );