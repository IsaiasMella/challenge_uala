import { SheetTrigger } from "@/common/sheet";
import Image from "next/image";

export const FilterTrigger = ({ activeFiltersCount }: { activeFiltersCount: number }) => (
    <SheetTrigger asChild>
      <div className="relative">
        <Image
          src="/common/filters.svg"
          width={24}
          height={24}
          alt="Abrir filtros"
          className="cursor-pointer"
        />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-uala text-xs text-white">
            {activeFiltersCount}
          </span>
        )}
      </div>
    </SheetTrigger>
  );