import { TYPE_PAYMENT_METHOD } from "@/constants/home/home";

export const getPaymentMethod = (method: string) => {
    return TYPE_PAYMENT_METHOD[method as keyof typeof TYPE_PAYMENT_METHOD] || method;
};