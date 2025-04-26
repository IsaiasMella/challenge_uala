import { Toggle } from "@/common/toggle";

import type { FilterComponentProps } from "@/types/sections/home/filterSidebar";

const CARDS = [ "Todas", "Visa", "Mastercard", "Amex" ]

export const CardFilter: React.FC<FilterComponentProps<string[]>> = ({ value = [], onChange }) => {
    const handlePress = (filterId: string) => {
      const newValue = value.includes(filterId)
        ? value.filter((id: string) => id !== filterId)
        : [...value, filterId];
      onChange(newValue);
    };
  
    return (
      <div className="flex gap-2 mt-3">
        {CARDS.map((card) => (
          <Toggle
            key={card}
            variant="default"
            pressed={value.includes(card)}
            onPressedChange={() => handlePress(card)}
            className={`px-3 flex items-center justify-center gap-1 rounded-full border border-blue-uala text-blue-uala ${value.includes(card) && "bg-blue-uala-ligther"}`}
          >
            <p className="text-[0.65rem]">{card}</p>
            {value.includes(card) && <p>×</p>}
          </Toggle>
        ))}
      </div>
    );
  };