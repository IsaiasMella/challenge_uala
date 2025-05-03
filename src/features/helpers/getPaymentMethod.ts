import { TYPE_PAYMENT_METHOD } from "@/constants/home/home";

export const getPaymentMethod = (method: string) => (
    TYPE_PAYMENT_METHOD[method as keyof typeof TYPE_PAYMENT_METHOD] || method
  );
