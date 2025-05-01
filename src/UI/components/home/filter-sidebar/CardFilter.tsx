import { Toggle } from "@/common/toggle";
import type { FilterComponentProps } from "@/types/sections/home/filterSidebar";
import { useFilterSelection } from "@/UI/hooks/useFilterSelection";

const ALL = "Todas" as const;
const PAYMENT_CARDS = ["Visa", "Mastercard", "Amex"] as const;
const AVAILABLE_CARDS = [ALL, ...PAYMENT_CARDS] as const;

type CardOption = typeof AVAILABLE_CARDS[number];

export const CardFilter: React.FC<FilterComponentProps<string[]>> = ({
  committedFilters,
  onApply
}) => {
  const currentSelection = (committedFilters.card || [])
    .map(card => card.charAt(0).toUpperCase() + card.slice(1)) as CardOption[];

  const { handleSelection, isSelected } = useFilterSelection({
    options: AVAILABLE_CARDS,
    allOption: ALL,
    currentSelection,
    onSelectionChange: (newSelection) => {
      onApply({
        ...committedFilters,
        card: newSelection.map(card => card.toLowerCase())
      });
    }
  });

  return (
    <div className="flex gap-2 mt-3">
      {AVAILABLE_CARDS.map((card) => (
        <Toggle
          key={card}
          variant="default"
          pressed={isSelected(card)}
          onPressedChange={() => handleSelection(card)}
          className={`
            px-3 flex items-center justify-center gap-1 
            rounded-full border border-blue-uala text-blue-uala
            ${isSelected(card) ? "bg-blue-uala-ligther" : ""}
          `}
        >
          <p className="text-[0.65rem]">{card}</p>
          {isSelected(card) && <p>×</p>}
        </Toggle>
      ))}
    </div>
  );
};