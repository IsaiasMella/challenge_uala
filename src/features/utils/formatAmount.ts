interface FormatAmount {
  integer: string;
  decimal: string;
}

/**
 * Formats an amount into a string with the integer and decimal parts.
 * @param amount - The amount to format.
 * @returns An object with the integer and decimal parts of the amount.
 */

export const formatAmount = (amount: number): FormatAmount => {
  if (!amount) return { integer: "0", decimal: "00" };

  const [integer, decimal = "00"] = amount.toFixed(2).split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return { integer: formattedInteger, decimal };
};
