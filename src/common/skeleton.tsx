import { cn } from "@/features/utils/style/cn";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-testid="skeleton"
    className={cn("animate-pulse rounded-md bg-tertiary", className)}
    {...props}
  />
)

export { Skeleton };
