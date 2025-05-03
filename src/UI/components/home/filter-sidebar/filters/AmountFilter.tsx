import { Input } from "@/common/input";
import { Slider } from "@/common/slider";

import type { FilterComponentProps } from "@/types/sections/home/filterSidebar";

export const AmountFilter: React.FC<FilterComponentProps> = ({ committedFilters, onApply }) => {
  const handleSliderChange = (newValue: number[]) => {
    onApply({
      ...committedFilters,
      amount: { min: newValue[0], max: newValue[1] },
    });
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    onApply({
      ...committedFilters,
      amount: { ...committedFilters.amount, min: newMin },
    });
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onApply({
      ...committedFilters,
      amount: { ...committedFilters.amount, max: newMax },
    });
  };

  return (
    <div className="mt-4 space-y-6">
      <Slider
        defaultValue={[0, 500]}
        max={2000}
        min={0}
        step={10}
        value={[
          committedFilters.amount?.min || 0,
          committedFilters.amount?.max || 500,
        ]}
        onValueChange={handleSliderChange}
        className="pt-5"
      />
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex flex-col border border-blue-uala rounded-xl px-4 w-fit">
          <small className="whitespace-nowrap">Monto mínimo</small>
          <div className="flex items-center">
            <small className="text-black">$</small>
            <Input
              type="number"
              placeholder="0"
              value={committedFilters.amount?.min}
              onChange={handleMinInputChange}
              className="w-[60px] min-w-0 bg-transparent border-none px-1 h-1 my-0 text-black"
            />
          </div>
        </div>
        <div className="flex flex-col border border-blue-uala rounded-xl px-4 w-fit">
          <small className="whitespace-nowrap">Monto máximo</small>
          <div className="flex items-center">
            <small className="text-black">$</small>
            <Input
              type="number"
              placeholder="2000"
              value={committedFilters.amount?.max}
              onChange={handleMaxInputChange}
              className="w-[60px] min-w-0 bg-transparent border-none px-1 h-1 my-0 text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
