import { Toggle } from "@/common/toggle";

import type { FilterComponentProps } from "@/types/sections/home/filterSidebar";

const INSTALLMENTS = ["Todas", "1", "2", "3", "6", "12"]

export const InstallmentsFilter: React.FC<FilterComponentProps<string[]>> = ({ value = [], onChange }) => {
  const handlePress = (filterId: string) => {
    const newValue = value.includes(filterId)
      ? value.filter((id: string) => id !== filterId)
      : [...value, filterId];
    onChange(newValue);
  };

  return (
    <div className="flex gap-2 mt-3">
      {INSTALLMENTS.map((installment) => (
        <Toggle
          key={installment}
          variant="default"
          pressed={value.includes(installment)}
          onPressedChange={() => handlePress(installment)}
          className={`px-3 flex items-center justify-center gap-1 rounded-full border border-blue-uala text-blue-uala ${value.includes(installment) && "bg-blue-uala-ligther"}`}
        >
          <p className="text-[0.65rem]">{installment}</p>
          {value.includes(installment) && <p>×</p>}
        </Toggle>
      ))}
    </div>
  );
};