import { create } from "zustand";
import { TIME_RANGES } from "@/constants/home/home";
import { ValueOf } from "next/dist/shared/lib/constants";

interface RangeState {
  selectedRange: ValueOf<typeof TIME_RANGES>;
  setSelectedRange: (range: ValueOf<typeof TIME_RANGES>) => void;
}

export const useRangeStore = create<RangeState>((set) => ({
  selectedRange: TIME_RANGES.SEMANAL,
  setSelectedRange: (range) => set({ selectedRange: range }),
}));
