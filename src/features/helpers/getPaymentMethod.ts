import { TYPE_PAYMENT_METHOD } from "@/constants/home/home";

/**
 * Gets the formatted payment method name from a payment method code
 * @param method - The payment method code to format
 * @returns The formatted payment method name or the original code if no mapping exists
 */
export const getPaymentMethod = (method: string) => (
    TYPE_PAYMENT_METHOD[method as keyof typeof TYPE_PAYMENT_METHOD] || method
  );
