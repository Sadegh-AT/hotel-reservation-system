const { body } = require("express-validator");

sendOtpValidation = () => [
  body("mobile")
    .notEmpty()
    .matches(/^09[0-9]{9}$/)
    .withMessage("فرمت شماره موبایل درست نیست"),
];

checkOtpValidation = () => [
  body("mobile")
    .notEmpty()
    .matches(/^09[0-9]{9}$/)
    .withMessage("فرمت شماره موبایل درست نیست"),
  body("code")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 5, max: 5 })
    .withMessage("فرمت کد درست نیست"),
];
module.exports = {
  sendOtpValidation,
  checkOtpValidation,
};
