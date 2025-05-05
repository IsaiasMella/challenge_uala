"use client";

import { useMemo, useState, useRef } from "react";

import "moment/locale/es";

import { useFilterToggle } from "@/hooks/home/filter-sidebar/useFilterToggle";
import { useFilterValuesFromUrl } from "@/hooks/home/filter-sidebar/useFilterValuesFromUrl";
import { useFilterUrlManagement } from "@/hooks/home/filter-sidebar/useFilterUrlManagement";
import { useActiveFiltersFromUrl } from "@/hooks/home/filter-sidebar/useActiveFiltersFromUrl";
import { useFilterStateManagement } from "@/hooks/home/filter-sidebar/useFilterStateManagement";

import { Sheet, SheetContent } from '@/common/sheet';

import { FilterList } from "@/UI/components/home/filter-sidebar/FilterList";
import { FilterHeader } from "@/UI/components/home/filter-sidebar/FilterHeader";
import { FilterFooter } from "@/UI/components/home/filter-sidebar/FilterFooter";
import { FilterTrigger } from "@/UI/components/home/filter-sidebar/FilterTrigger";

export const FilterSidebar = () => {
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);

  const { filterValues, setFilterValues } = useFilterValuesFromUrl();
  const { activeFilters, setActiveFilters } = useActiveFiltersFromUrl();

  const { switchToggle } = useFilterToggle(setFilterValues, setActiveFilters);
  const { onChangeFilters, clearFilters } = useFilterStateManagement(setFilterValues, setActiveFilters);

  const { onSubmitFilters } = useFilterUrlManagement(filterValues, setActiveFilters, activeFilters);

  const handleOpenChange = (value: boolean) => {
    openRef.current = value;
    setOpen(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpenChange(false);
    onSubmitFilters();
  };

  const activeFiltersCount = useMemo(
    () => Object.values(activeFilters).filter(Boolean).length,
    [activeFilters]
  );

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <FilterTrigger activeFiltersCount={activeFiltersCount} />

      <SheetContent
        side="right"
        className="w-full p-0 sm:w-[400px] border-l-0 pt-8"
      >
        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <FilterHeader onClearFilters={clearFilters} />

          <FilterList
            activeFilters={activeFilters}
            filterValues={filterValues}
            onSwitchToggle={switchToggle}
            onChangeFilters={onChangeFilters}
          />

          <FilterFooter activeFiltersCount={activeFiltersCount} />
        </form>
      </SheetContent>
    </Sheet>
  );
};
