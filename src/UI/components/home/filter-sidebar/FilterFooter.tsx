import { cn } from "@/features/utils/style/cn";

import { Button } from "@/common/button";

export const FilterFooter = ({ activeFiltersCount }: { activeFiltersCount: number }) => (
    <footer className="absolute bottom-0 left-0 right-0 z-99 mb-2 px-6">
      <Button
        type="submit"
        disabled={activeFiltersCount === 0}
        className={cn(
          "h-12 w-full rounded-full bg-blue-uala text-white hover:bg-blue-uala/90 transition-colors",
          activeFiltersCount === 0 && "opacity-50 cursor-not-allowed",
        )}
      >
        Aplicar filtros
      </Button>
    </footer>
  );