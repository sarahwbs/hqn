/**
 * Get the number of days in any particular month
 * @param  {int} m The month (valid: 0-11)
 * @param  {int} y The year
 * @return {int}   The number of days in the month
 */
const daysInMonth = (m, y) => {
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
};

/**
 * Check if a date is valid
 * @param  {[type]}  d The day
 * @param  {[type]}  m The month
 * @param  {[type]}  y The year
 * @return {bool}   Returns true if valid
 */
const isValidDate = (d, m, y) => {
  m = parseInt(m, 10) - 1;
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

/**
 * Get a month's number
 * @param  {[string]} month name
 * @return {int} month number
 */
const getMonthNumber = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months.indexOf(month) + 1;
};
