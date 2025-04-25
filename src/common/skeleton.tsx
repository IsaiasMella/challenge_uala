import { cn } from "@/features/utils/style/cn";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-tertiary", className)} {...props} />;
}

export { Skeleton };
