import { FilterComponentProps } from "@/types/sections/home/filterSidebar";
import { Toggle } from "@/common/toggle";

const PAYMENT_METHODS = ["Link de pago", "Código QR", "mPOS", "POS Pro"]

export const PaymentMethodFilter: React.FC<FilterComponentProps<string[]>> = ({ value = [], onChange }) => {
  const handlePress = (filterId: string) => {
    const newValue = value.includes(filterId)
      ? value.filter((id: string) => id !== filterId)
      : [...value, filterId];
    onChange(newValue);
  };

  return (
    <div className="flex gap-2 mt-3">
      {PAYMENT_METHODS.map((method) => (
        <Toggle
          key={method}
          variant="default"
          pressed={value.includes(method)}
          onPressedChange={() => handlePress(method)}
          className={`px-3 flex items-center justify-center gap-1 rounded-full border border-blue-uala text-blue-uala ${value.includes(method) && "bg-blue-uala-ligther"}`}
        >
          <p className="text-[0.6rem]">{method}</p>
          {value.includes(method) && <p>×</p>}
        </Toggle>
      ))}
    </div>
  );
}