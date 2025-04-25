import { Skeleton } from "@/common/skeleton";

export const SkeletonCollection = () => {
  return (
    <div className="flex gap-3 mx-1 mt-4">
      <Skeleton className="max-w-[40px] w-full h-10 rounded-2xl" />
      <Skeleton className="w-10/12 h-10 rounded-2xl" />
    </div>
  );
};
