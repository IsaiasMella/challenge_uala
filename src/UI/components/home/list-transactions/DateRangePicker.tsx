"use client";

import { useState } from "react";

import Image from "next/image";

import "moment/locale/es";

import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { useTransactionStore } from "@/store/transactionStore";
import { disabledCalendarDays } from "@/features/helpers/calendar/disabledCalendarDays";

import { Button } from "@/common/button";
import { Calendar } from "@/common/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/popover";

import { useExcelTransactionExport } from "@/hooks/useExcelTransactionExport";
import { calendarFormatters } from "@/features/helpers/calendar/calendarFormatters";

export function DateRangePicker() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const { transactions } = useTransactionStore();

  const labelToast = "No hay movimientos en las fechas seleccionadas para descargar";
  const { handleDownload } = useExcelTransactionExport({date, transactions, labelToast});

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Image src="/common/download.svg" height={24} width={24} alt="filters icon" className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        className="bg-white -translate-y-1/4 translate-x-[2.5%] sm:translate-y-0"
        side="bottom"
        avoidCollisions={false}
        align="end"
      >
        <div className="flex flex-col">
          <div className="flex px-4 items-center gap-4">
            <Image src="/calendar.svg" width={20} height={20} alt="calendar icon" />
            <p className="font-semibold text-black w-2/3">Elegí las fechas que querés descargar</p>
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
            formatters={calendarFormatters}
            classNames={{
              day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
              day_today: "bg-gray-100 text-gray-900",
              day_outside: "invisible",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium capitalize"
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
            <Button className="bg-blue-uala text-white rounded-3xl hover:bg-blue-700" onClick={handleDownload}>
              Descargar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
