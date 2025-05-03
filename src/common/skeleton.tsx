import { cn } from "@/features/utils/style/cn";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn("animate-pulse rounded-md bg-tertiary", className)}
      {...props}
    />
  )

export { Skeleton };
