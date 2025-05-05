import Image from "next/image";

import { Button } from "@/common/button";
import { TemporalityCollections } from "@/UI/components/home/collections/TemporalityCollections";

export const Collections = () => (
    <header className="w-10/12 m-auto space-y-6">
      <p className="text-lg font-semibold text-gray-800">Tus cobros</p>
      <h1 className="sr-only">Cobros</h1>

      <TemporalityCollections />

      <Button
        variant="ghost"
        className="flex cursor-pointer items-center justify-center gap-2 text-blue-uala w-full"
      >
        <Image
          src="/common/metrics.svg"
          width={16}
          height={16}
          alt="metrics icon"
        />
        <small className="text-sm">Ver métricas</small>
      </Button>
    </header>
  );
