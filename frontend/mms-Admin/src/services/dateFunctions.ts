const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getShortDate = function (dt: Date) {
  return months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
};

const getShortTime = function (dt: Date) {
  let hours = dt.getHours();
  const minutes = dt.getMinutes();
  let timePart = hours < 12 ? "am" : "pm";
  if (hours < 1) hours = 12;

  return `${hours > 12 ? hours - 12 : hours}:${minutes
    .toString()
    .padStart(2, "0")} ${timePart}`;
};

const addMinutes = function (dt: Date, minutes: number) {
  return new Date(dt.getTime() + minutes * 60000);
};

function getOrdinalNumber(n: number) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

function getShortYear(date: Date) {
  return date.getFullYear().toString().slice(2, 4);
}

function getOrdinalizeDates(
  dateFrom: Date | undefined,
  dateTo: Date | undefined
) {
  if (dateFrom === undefined && dateTo === undefined) return undefined;

  if (dateFrom === undefined) {
    dateTo = dateTo??new Date();
    return `Unclear date to ${getOrdinalNumber(dateTo.getDate())}, ${
      months[dateTo.getMonth()]
    } ${getShortYear(dateTo)}`;
  }

  if (dateTo === undefined)
 {
  return `${getOrdinalNumber(dateFrom.getDate())}, ${
      months[dateFrom.getMonth()]
    } ${getShortYear(dateFrom)} - Unclear date`;
  }

  if (
    dateFrom.getFullYear() === dateTo.getFullYear() &&
    dateFrom.getMonth() === dateTo.getMonth()
  )
    return `${getOrdinalNumber(dateFrom.getDate())} - ${getOrdinalNumber(
      dateTo.getDate()
    )} ${months[dateFrom.getMonth()]} ${getShortYear(dateFrom)}`;

  if (dateFrom.getFullYear() === dateTo.getFullYear())
    return `${getOrdinalNumber(dateFrom.getDate())}, ${
      months[dateFrom.getMonth()]
    } - ${getOrdinalNumber(dateTo.getDate())}, ${
      months[dateTo.getMonth()]
    } ${getShortYear(dateFrom)}`;

  return `${getOrdinalNumber(dateFrom.getDate())}, ${
    months[dateFrom.getMonth()]
  } ${getShortYear(dateFrom)} - ${getOrdinalNumber(dateTo.getDate())}, ${
    months[dateTo.getMonth()]
  } ${getShortYear(dateTo)}`;
}

export {
  getShortDate,
  getShortTime,
  addMinutes,
  getOrdinalNumber,
  getOrdinalizeDates,
};
