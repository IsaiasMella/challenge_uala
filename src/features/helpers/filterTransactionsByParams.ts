import {
    filterByCards,
    filterByDateRange,
    filterByAmountRange,
    filterByInstallments,
    filterByPaymentMethods
} from "../actions/filterTransactions";
import type { Transaction } from "@/types/transactions";
import moment from "moment";
import "moment/locale/es";
import { URL_PARAMS } from "@/constants/home/filters-sidebar/filters";

export const filterTransactionsByParams = (
    transactions: Transaction[],
    searchParams: URLSearchParams
): Transaction[] => {
    const dateFrom = searchParams.get(URL_PARAMS.DATE_FROM);
    const dateTo = searchParams.get(URL_PARAMS.DATE_TO);
    const amountMin = searchParams.get(URL_PARAMS.AMOUNT_MIN);
    const amountMax = searchParams.get(URL_PARAMS.AMOUNT_MAX);
    const cards = searchParams.get(URL_PARAMS.CARD)?.split(',').filter(Boolean);
    const installments = searchParams.get(URL_PARAMS.INSTALLMENTS)?.split(',').filter(Boolean);
    const paymentMethods = searchParams.get(URL_PARAMS.PAYMENT_METHOD)?.split(',').filter(Boolean);

    let dateRange: { from: Date; to: Date } | undefined;
    if (dateFrom || dateTo) {
        const from = dateFrom ? moment(dateFrom, 'YYYY-MM-DD').toDate() : moment(0).toDate();
        const to = dateTo ? moment(dateTo, 'YYYY-MM-DD').toDate() : moment().toDate();
        
        dateRange = {
            from: dateFrom ? moment(from).startOf('day').toDate() : from,
            to: dateTo ? moment(to).endOf('day').toDate() : to
        };
    }

    let transactionsFiltered = transactions;
    transactionsFiltered = filterByDateRange(transactionsFiltered, dateRange);
    transactionsFiltered = filterByCards(transactionsFiltered, cards);
    transactionsFiltered = filterByInstallments(transactionsFiltered, installments);
    transactionsFiltered = filterByAmountRange(transactionsFiltered, amountMin || amountMax ? {
        min: Number(amountMin),
        max: Number(amountMax)
    } : undefined);
    transactionsFiltered = filterByPaymentMethods(transactionsFiltered, paymentMethods);

    return transactionsFiltered;
};