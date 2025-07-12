import { lastDayOfMonth, sub, toDate } from "date-fns";

export const getStartOfMonth = (subtractMonths = 0) => {
  const currentDate =  toDate( new Date().setUTCHours(0,0,0,0)).setUTCDate(1)
  return sub(currentDate, { months: subtractMonths});
};

export const getEndOfMonth = (subtractMonths = 0) => {
  const currentDate = toDate( new Date().setUTCHours(23,59,59,999))
  const date = sub(currentDate, { months: subtractMonths});
  return lastDayOfMonth(date);
};
