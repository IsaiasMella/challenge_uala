"use client";

import { Toaster } from "@/common/Toaster";

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <>
      {children}
      <Toaster
        richColors
        closeButton={false}
        className="!w-full sm:!max-w-[600px]"
      />
    </>
  );
