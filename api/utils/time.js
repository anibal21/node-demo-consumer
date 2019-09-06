const getMonth = month => {
  if (month / 10 < 1) {
    return "0".concat(month);
  }
  return month;
};

const getDay = day => {
  if (day / 10 < 1) {
    return "0".concat(day);
  }
  return day;
};

export const today = () => {
  const today_date = new Date();
  const date =
    getDay(today_date.getDate()) +
    "-" +
    getMonth(today_date.getMonth() + 1) +
    "-" +
    today_date.getFullYear();
  return date;
};

export const getUTCTimestamp = () => {
  const date = new Date();
  return date.getTime();
};
