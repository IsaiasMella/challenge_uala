import Image from "next/image";

import { TemporalityCollections } from "@/UI/components/home/temporality-collections";
import { Button } from "@/common/button";

export const Collections = () => {
  return (
    <header className="w-10/12 m-auto space-y-6">
      <p className="text-lg font-medium">Tus cobros</p>
      <h1 className="sr-only">Cobros</h1>

      <TemporalityCollections />

      <Button variant="ghost" className="flex cursor-pointer items-center justify-center gap-2 text-blue-uala w-full">
        <Image src="/common/metrics.svg" width={16} height={16} alt="metrics icon" />
        <small className="text-sm">Ver métricas</small>
      </Button>
    </header>
  );
};
