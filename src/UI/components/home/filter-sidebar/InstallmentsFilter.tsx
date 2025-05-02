import { Toggle } from "@/common/toggle";
import type { FilterComponentProps } from "@/types/sections/home/filterSidebar";
import { useFilterSelection } from "@/hooks/useFilterSelection";

const ALL_INSTALLMENTS = "Todas" as const;
const INSTALLMENTS = [ALL_INSTALLMENTS, "1", "2", "3", "6", "12"] as const;

type InstallmentOption = typeof INSTALLMENTS[number];

export const InstallmentsFilter: React.FC<FilterComponentProps<string[]>> = ({ 
  committedFilters, 
  onApply 
}) => {
  const currentSelection = (committedFilters.installments || [])
    .map(installment => installment.charAt(0).toUpperCase() + installment.slice(1)) as InstallmentOption[];

  const { handleSelection, isSelected } = useFilterSelection({
    options: INSTALLMENTS,
    allOption: ALL_INSTALLMENTS,
    currentSelection,
    onSelectionChange: (newSelection) => {
      onApply({
        ...committedFilters,
        installments: newSelection.map(installment => installment.toLowerCase())
      });
    }
  });

  return (
    <div className="flex gap-2 mt-3">
      {INSTALLMENTS.map((installment) => (
        <Toggle
          key={installment}
          variant="default"
          pressed={isSelected(installment)}
          onPressedChange={() => handleSelection(installment)}
          className={`
            px-3 flex items-center justify-center gap-1 
            rounded-full border border-blue-uala text-blue-uala
            ${isSelected(installment) ? "bg-blue-uala-ligther" : ""}
          `}
        >
          <p className="text-[0.65rem]">{installment}</p>
          {isSelected(installment) && <p>×</p>}
        </Toggle>
      ))}
    </div>
  );
};