import { utils, writeFile } from "xlsx";
import moment from "moment";
import { toast } from "sonner";
import { ExcelTransaction, Transaction } from "./types";

export const filterTransactionsByDateRange = (
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

export const mapTransactionsToExcelFormat = (transactions: Transaction[]): ExcelTransaction[] => {
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

export const createExcelFile = (excelData: ExcelTransaction[]) => {
  const book = utils.book_new();
  const sheet = utils.json_to_sheet(excelData);
  utils.book_append_sheet(book, sheet, "Transacciones");
  writeFile(book, "transacciones.xlsx");
};

export const showNoTransactionsToast = () => {
  toast.error("No hay movimientos en las fechas seleccionadas para descargar");
}; 