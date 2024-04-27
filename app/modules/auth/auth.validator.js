const { body } = require("express-validator");

sendOtpValidation = () => [
  body("mobile")
    .matches(/^09[0-9]{9}$/)
    .withMessage("فرمت شماره موبایل درست نیست"),
];

module.exports = {
  sendOtpValidation,
};
