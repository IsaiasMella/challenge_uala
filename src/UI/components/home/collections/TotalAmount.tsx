import { Skeleton } from "@/common/skeleton";

interface TotalAmountProps {
    totalAmount: {
        integer: string;
        decimal: string;
    };
    isLoading: boolean;
    error: string | null;
}

export const TotalAmount = ({ totalAmount, isLoading, error }: TotalAmountProps) => {
    if (isLoading)
        return <Skeleton className="w-4/5 m-auto h-10 rounded-2xl" role="status" />

    return (
        <div className="flex w-full text-black font-normal m-auto justify-center">
            <p className="text-[34px] leading-none">
                {!error && "+"}${totalAmount.integer},
            </p>
            <p className="text-[22px] self-end leading-none">
                {totalAmount.decimal}
            </p>
        </div>
    );
}; 