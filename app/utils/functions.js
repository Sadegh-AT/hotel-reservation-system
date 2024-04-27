const createHttpError = require("http-errors");
const moment = require("jalali-moment");
const CookieName = require("../constant/cookie.enum");
const { validationResult } = require("express-validator");

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

function responseFormatter(msg, statusCode, data, req, err = true) {
  return {
    status: statusCode || 500,
    message: msg || `Message`,
    data,
    metadata: {
      url: req.originalUrl,
      timestamp: req.receivedAt,
      total_records: data?.length,
      invalidParams: req.invalidParams,
    },
    error: err,
  };
}

function objectToQueryParams(obj) {
  // Check if the input is an object
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be a valid object");
  }

  // Convert object to query params format string
  const queryParams = Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return queryParams;
}
function checkBody(req, res) {
  const { validatorHandler } = require("./error-handler");
  const error = validationResult(req);
  if (error?.errors?.length > 0) {
    req.invalidParams = validatorHandler(error);
    return res.json(
      responseFormatter("فیلد ها را درست وارد کنید", 401, null, req)
    );
  }
}
module.exports = {
  getDatesBetween,
  timeNow,
  getToken,
  responseFormatter,
  objectToQueryParams,
  checkBody,
};
