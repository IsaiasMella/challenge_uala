"use client";

import { useState } from "react";
import Image from "next/image";
import { utils, writeFile } from "xlsx";
import { DateRange } from "react-day-picker";
import { es } from "date-fns/locale";
import moment from "moment";
import "moment/locale/es";

import { Popover, PopoverContent, PopoverTrigger } from "@/common/popover";
import { Button } from "@/common/button";
import { Calendar } from "@/common/calendar";
import { useTransactionStore } from "@/store/transactionStore";
import { toast } from "sonner";
import { disabledCalendarDays } from "@/features/helpers/disabledCalendarDays";
import { Transaction } from "@/types/transactions";

interface ExcelTransaction {
  ID: string;
  Monto: number;
  Tarjeta: string;
  Cuotas: number;
  "Fecha de Creación": string;
  "Fecha de Actualización": string;
  "Método de Pago": string;
}

const filterTransactionsByDateRange = (
  transactions: Transaction[],
  fromDate: moment.Moment,
  toDate: moment.Moment
) => {
  return transactions.filter((transaction) => {
    const transactionDate = moment(transaction.createdAt);
    const adjustedToDate = moment(toDate).endOf("day");
    return transactionDate.isBetween(fromDate, adjustedToDate, undefined, "[]");
  });
};

const mapTransactionsToExcelFormat = (transactions: Transaction[]): ExcelTransaction[] => {
  return transactions.map((transaction) => ({
    ID: transaction.id,
    Monto: transaction.amount,
    Tarjeta: transaction.card,
    Cuotas: transaction.installments,
    "Fecha de Creación": moment(transaction.createdAt).format("L"),
    "Fecha de Actualización": moment(transaction.updatedAt).format("L"),
    "Método de Pago": transaction.paymentMethod,
  }));
};

const createExcelFile = (excelData: ExcelTransaction[]) => {
  const book = utils.book_new();
  const sheet = utils.json_to_sheet(excelData);
  utils.book_append_sheet(book, sheet, "Transacciones");
  writeFile(book, "transacciones.xlsx");
};

const showNoTransactionsToast = () => {
  toast.custom(() => (
    <div className="bg-blue-uala-dark text-white px-4 py-3 rounded-md">
      <p>No hay movimientos en las fechas seleccionadas para descargar</p>
    </div>
  ));
};

export const DateRangePicker = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const { transactions } = useTransactionStore();

  const handleDownload = () => {
    if (!date?.from || !transactions) return;

    const fromDate = moment(date.from);
    const toDate = moment(date.to || date.from);

    const filteredTransactions = filterTransactionsByDateRange(
      transactions,
      fromDate,
      toDate
    );

    if (filteredTransactions.length === 0) {
      showNoTransactionsToast();
      return;
    }

    const excelData = mapTransactionsToExcelFormat(filteredTransactions);
    createExcelFile(excelData);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Image
          src="/common/download.svg"
          height={24}
          width={24}
          alt="filters icon"
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent
        className="bg-white -translate-y-1/4 translate-x-[2.5%] sm:translate-y-0"
        side="bottom"
        avoidCollisions={false}
        align="end"
      >
        <div className="flex flex-col">
          <div className="flex px-4 items-center gap-4">
            <Image
              src="/calendar.svg"
              width={20}
              height={20}
              alt="calendar icon"
            />
            <p className="font-semibold text-black w-2/3">
              Elegí las fechas que querés descargar
            </p>
          </div>
          <Calendar
            mode="range"
            locale={es}
            selected={date}
            onSelect={setDate}
            disabled={disabledCalendarDays}
            weekStartsOn={0}
            hideHead={false}
            showOutsideDays={true}
            formatters={{
              formatWeekdayName: (weekday) => {
                const dayName = weekday.toLocaleString("es", {
                  weekday: "short",
                });
                return dayName.charAt(0).toUpperCase() + dayName.slice(1);
              },
            }}
            classNames={{
              day_selected:
                "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
              day_today: "bg-gray-100 text-gray-900",
              day_outside: "invisible",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium capitalize",
            }}
          />
          <div className="flex justify-end gap-4">
            <Button
              className="bg-transparent border border-blue-uala rounded-3xl text-blue-uala hover:bg-blue-uala hover:text-white"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </Button>
            <Button
              className="bg-blue-uala text-white rounded-3xl hover:bg-blue-700"
              onClick={handleDownload}
            >
              Descargar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
