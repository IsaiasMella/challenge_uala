"use client";

import { Button } from "@/common/button";
import { TIME_RANGES } from "@/constants/home/home";
import { useRangeStore } from "@/store/rangeStore";

export const TimeRangeSelector = () => {
  const { selectedRange, setSelectedRange } = useRangeStore();

  return (
    <nav className="w-full">
      <ol className="flex justify-between items-center px-1">
        {Object.values(TIME_RANGES).map((range) => (
          <li key={range}>
            <Button
              variant="ghost"
              onClick={() => setSelectedRange(range)}
              className={`text-sm transition-all duration-300 ease-in-out transform ${
                range === selectedRange ? "font-medium -translate-y-1" : "text-[#666666] translate-y-0"
              }`}
            >
              {range}
            </Button>
            <div className={`m-auto mt-2 h-2 w-2 bg-blue-uala rounded-full transition-opacity duration-300 ease-in-out ${
                range === selectedRange ? "opacity-100" : "opacity-0"
              }`}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}; 