import moment from "moment";

export const disabledCalendarDays = {
    from: moment().add(1, 'days').toDate(),
    to: moment("2026-01-01").toDate(), //Todas las fechas pertenecen a 2025, tambien lo indica el PDF
};