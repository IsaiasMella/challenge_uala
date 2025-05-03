import Image from "next/image";

import { Switch } from "@/common/switch";
import { FILTERS } from "@/constants/home/filters-sidebar/filters";
import { FilterId, FilterState, FilterConfig } from "@/types/sections/home/filterSidebar";

export 
const FilterList = ({
  activeFilters,
  filterValues,
  onSwitchToggle,
  onChangeFilters,
}: {
  activeFilters: Record<string, boolean>;
  filterValues: FilterState;
  onSwitchToggle: (_id: FilterId) => void;
  onChangeFilters: (_id: FilterId, _value: unknown) => void;
}) => (
  <main className="flex-1 space-y-6 px-8 pt-3 overflow-y-auto mb-24">
    {FILTERS.map(({ id, label, icon, component: FilterComponent }: FilterConfig) => (
      <section key={id} className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={icon}
              width={20}
              height={20}
              alt={`${label} icon`}
            />
            <span className="font-semibold">{label}</span>
          </div>

          <Switch
            checked={activeFilters[id]}
            onCheckedChange={() => onSwitchToggle(id)}
            className="data-[state=checked]:bg-blue-uala data-[state=unchecked]:bg-slate-500"
          />
        </div>

        {activeFilters[id] && (
          <FilterComponent
            committedFilters={filterValues}
            onApply={(newFilters: FilterState) => {
              onChangeFilters(id, newFilters[id]);
            }}
          />
        )}
      </section>
    ))}
  </main>
);
