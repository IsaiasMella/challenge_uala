import moment from "moment";
import { toast } from "sonner";
import { utils, WorkBook, writeFile } from "xlsx";

import { filterTransactionsByDateRange } from "@/features/helpers/filterTransactionsByDateRange";

import { ToastNoDataForTransactionsExcel } from "@/UI/components/home/list-transactions/ToastNoDataForTransactionsExcel";

import type { DateRange } from "react-day-picker";
import type { Transaction } from "@/types/transactions";


interface ExcelTransaction {
    ID: string;
    Monto: number;
    Tarjeta: string;
    Cuotas: number;
    "Fecha de Creación": string;
    "Fecha de Actualización": string;
    "Método de Pago": string;
}

interface ExcelTransactionHookProps {
    date: DateRange | undefined;
    transactions: Transaction[] | undefined;
    labelToast: string;
}

/**
 * Formats transaction data for Excel export.
 * 
 * Takes an array of transactions and maps them to a format suitable for Excel export,
 * with Spanish column headers and formatted dates.
 *
 * @param {Transaction[]} transactions - Array of transactions to format
 * @returns {ExcelTransaction[]} Array of formatted transactions ready for Excel export
 */
const formatTransactionsForExcel = (transactions: Transaction[]): ExcelTransaction[] => {
    return transactions.map((transaction) => ({
        ID: transaction.id,
        Monto: transaction.amount,
        Tarjeta: transaction.card,
        Cuotas: transaction.installments,
        "Fecha de Creación": moment(transaction.createdAt).format('L'),
        "Fecha de Actualización": moment(transaction.updatedAt).format('L'),
        "Método de Pago": transaction.paymentMethod,
    }));
};

/**
 * Creates and downloads an Excel file containing transaction data.
 * 
 * Takes a workbook and transaction data, creates a sheet named "Transacciones",
 * and triggers the download of the Excel file.
 *
 * @param {WorkBook} book - Excel workbook to add the sheet to
 * @param {ExcelTransaction[]} excelData - Formatted transaction data for the Excel file
 */
const downloadExcelFile = (book: WorkBook, excelData: ExcelTransaction[]) => {
    const sheet = utils.json_to_sheet(excelData);
    utils.book_append_sheet(book, sheet, "Transacciones");
    writeFile(book, "transacciones.xlsx");
  };

  /**
 * A hook that handles the export of transactions to Excel format.
 * 
 * @param {Object} props - The hook's props
 * @param {DateRange | undefined} props.date - The date range to filter transactions
 * @param {Transaction[] | undefined} props.transactions - Array of transactions to be exported
 * @param {string} props.labelToast - Message to display when no transactions are found
 * 
 * @returns {Object} An object containing:
 *   - handleDownload: Function to trigger the Excel file download
 * 
 * @example
 * ```tsx
 * const { handleDownload } = useExcelTransactionExport({
 *   date: selectedDateRange,
 *   transactions: transactionsList,
 *   labelToast: "No transactions found"
 * });
 * ```
 */

export const useExcelTransactionExport = ({date,transactions, labelToast}: ExcelTransactionHookProps) => {
    const handleDownload = () => {
        if (!date?.from || !transactions) return;

        const fromDate = moment(date.from);
        const toDate = moment(date.to || date.from);
        const book = utils.book_new();

        const filteredTransactions = filterTransactionsByDateRange(transactions, fromDate, toDate);

        if (filteredTransactions.length === 0) {
            toast.custom(() => <ToastNoDataForTransactionsExcel message={labelToast} />)
            return;
        }

        const excelData = formatTransactionsForExcel(filteredTransactions);
        downloadExcelFile(book, excelData);
    };

    return { handleDownload };
};