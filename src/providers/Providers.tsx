"use client";

import { Toaster } from "@/common/Toaster";
import { QueryProvider } from "./QueryProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors closeButton={false} className="!w-full sm:!max-w-[600px]" />
    </QueryProvider>
  );
};
