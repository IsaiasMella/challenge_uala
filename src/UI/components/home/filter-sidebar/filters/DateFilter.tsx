import { es } from "date-fns/locale";
import { Calendar } from "@/common/calendar";

import { FilterComponentProps } from "@/types/sections/home/filterSidebar";
import { disabledCalendarDays } from "@/features/helpers/calendar/disabledCalendarDays";
import { Button } from "@/common/button";
import { useDateFilter } from "@/hooks/useDateFilter";

export const DateFilter: React.FC<FilterComponentProps> = ({ committedFilters, onApply }) => {
  const {
    selectedDate,
    handleDateSelect,
    handleClearSelection,
    formatWeekdayName,
  } = useDateFilter({ committedFilters, onApply });

  return (
    <div className="m-auto w-fit bg-white shadow-md flex flex-col mt-4 pt-1 pb-4 px-3 rounded-md border">
      <Calendar
        mode="range"
        locale={es}
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={disabledCalendarDays}
        classNames={{
          day_selected:
            "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
          day_today: "bg-gray-100 text-black",
          day_outside: "invisible",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium capitalize",
        }}
        hideHead={false}
        showOutsideDays={true}
        formatters={{
          formatWeekdayName,
        }}
      />
      <div className="w-full flex justify-end px-4">
        <Button
          variant="ghost"
          disabled={!selectedDate}
          className={`w-1/3 bg-transparent border border-blue-uala rounded-3xl text-blue-uala hover:bg-blue-uala hover:text-white ${!selectedDate ? "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-blue-uala" : ""}`}
          onClick={handleClearSelection}
        >
          Borrar
        </Button>
      </div>
    </div>
  );
};
