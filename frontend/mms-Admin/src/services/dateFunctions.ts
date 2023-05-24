const getShortDate = function (dt: Date) {
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
  return `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
};

const getMonthDay = function (dt: Date) {
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
  return  `${dt.getDate()} ${months[dt.getMonth()]}` ;
};

const getShortTime = function (dt: Date) {
  let hours = dt.getHours();
  const minutes = dt.getMinutes();
  let timePart = hours < 12 ? "am" : "pm";
  if (hours < 1) hours = 12;

  return `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2,'0')} ${timePart}`;
};

export { getShortDate, getShortTime , getMonthDay};
