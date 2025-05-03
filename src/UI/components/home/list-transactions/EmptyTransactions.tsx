import { FC } from "react"
import Image from "next/image"

export const EmptyTransactions: FC = () => {
    return (
        <div className="m-auto flex flex-col items-center justify-center gap-4 sm:py-12 py-6 sm:w-5/12 ">
            <Image src="/magnifier.svg" alt="magnifier" width={72} height={72} />
            <p className="text-center text-slate-500">
                No hay resultados que mostrar. Podés probar usando los filtros.
            </p>
        </div>
    )
}