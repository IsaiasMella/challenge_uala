import { FilterComponentProps } from "@/types/sections/home/filterSidebar";
import { Toggle } from "@/common/toggle";
import { useFilterSelection } from "@/hooks/useFilterSelection";
import { TYPE_PAYMENT_METHOD } from "@/constants/home/home";
import type { PaymentMethod } from "@/types/transactions";

// Orden específico de los métodos de pago
const PAYMENT_METHOD_ORDER: PaymentMethod[] = ['link', 'qr', 'mpos', 'pospro'];

export const PaymentMethodFilter: React.FC<FilterComponentProps<PaymentMethod[]>> = ({ 
  committedFilters,
  onApply 
}) => {
  const currentSelection = (committedFilters.paymentMethod || []) as PaymentMethod[];

  const { handleSelection, isSelected } = useFilterSelection<PaymentMethod>({
    options: PAYMENT_METHOD_ORDER,
    currentSelection,
    onSelectionChange: (newSelection) => {
      onApply({
        ...committedFilters,
        paymentMethod: newSelection
      });
    }
  });

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {PAYMENT_METHOD_ORDER.map((key) => (
        <Toggle
          key={key}
          variant="default"
          pressed={isSelected(key)}
          onPressedChange={() => handleSelection(key)}
          className={`
            px-3 flex items-center justify-center gap-1 
            rounded-full border border-blue-uala text-blue-uala
            ${isSelected(key) ? "bg-blue-uala-ligther" : ""}
          `}
        >
          <p className="text-[0.6rem]">{TYPE_PAYMENT_METHOD[key]}</p>
          {isSelected(key) && <p>×</p>}
        </Toggle>
      ))}
    </div>
  );
};