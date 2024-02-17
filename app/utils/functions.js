const createHttpError = require("http-errors");
const moment = require("jalali-moment");

function getDatesBetween(startDate, endDate) {
  const dates = [];
  let start = moment(startDate, "YYYY-MM-DD");
  let end = moment(endDate, "YYYY-MM-DD");

  if (end <= start) throw createHttpError.BadRequest("تاریخ را درست وارد کنید");

  let currentDate = moment(startDate, "YYYY-MM-DD");

  while (currentDate <= moment(endDate, "YYYY-MM-DD")) {
    dates.push(currentDate.format("YYYY/MM/DD"));
    currentDate.add(1, "days");
  }

  return dates;
}
function timeNow() {
  return moment().format("YYYY-MM-DD");
}
module.exports = {
  getDatesBetween,
  timeNow,
};
