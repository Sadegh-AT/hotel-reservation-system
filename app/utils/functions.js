const createHttpError = require("http-errors");
const moment = require("jalali-moment");
const CookieName = require("../constant/cookie.enum");

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

function getToken(req) {
  try {
    const token =
      req?.headers["authorization"] || req?.cookies[CookieName.AccessToken];

    return token.split("Bearer")[1].trim();
  } catch (error) {
    throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
}
module.exports = {
  getDatesBetween,
  timeNow,
  getToken,
};
