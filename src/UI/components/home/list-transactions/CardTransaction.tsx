'use client'

import { getPaymentMethod } from "@/features/helpers/getPaymentMethod"
import { Transaction } from "@/types/transactions"
import moment from "moment"
import Image from "next/image"
import { useCallback } from "react"

interface Props {
    transaction: Transaction
}

const money = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format;

export const CardTransaction = ({ transaction }: Props) => {
    const formatDate = useCallback((date: string | Date) => moment(date).format("DD/MM/YYYY"), []);

    return (
        <div
            key={transaction.id}
            className="py-2 flex border-b border-gray-200 items-center gap-3 mx-1"
        >
            <div className="max-w-[40px] w-full h-10 flex items-center justify-center">
                <Image
                    src={`/category-stores-in.svg`}
                    height={24}
                    width={24}
                    alt={`${transaction.paymentMethod} icon`}
                />
            </div>
            <div className="w-10/12 h-10  flex items-center justify-between px-4">
                <div className="flex flex-col">
                    <p>{getPaymentMethod(transaction.paymentMethod)}</p>
                    <p>Venta</p>
                </div>
                <div className="flex flex-col items-end">
                    <p>+{money(transaction.amount)}</p>
                    <small>{formatDate(transaction.createdAt)}</small>
                </div>
            </div>
        </div>
    )
}