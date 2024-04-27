const { body } = require("express-validator");

crateHotelValidation = () => [
  body("name").isString().notEmpty().withMessage("نام را به درستی وارد کنید"),

  // Address validation
  body("address")
    .isString()
    .notEmpty()
    .withMessage("آدرس را به درستی وارد کنید"),

  // Phone validation
  body("phone")
    .isString()
    .matches(/^09[0-9]{9}$/)
    .notEmpty()
    .withMessage("شماره موبایل رو به درستی وارد کنید"),

  // Email validation (optional)
  body("email").optional().isEmail().withMessage("ایمیل را به درستی وارد کنید"),

  // Website validation (optional)
  body("website")
    .optional()
    .isURL()
    .withMessage("وب سایت را به درستی وارد کنید"),

  // Rates validation (optional)
  body("rates")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("امتیاز باید بین ۰ و ۵ باشد"),

  // Price validation
  body("price")
    .isNumeric()
    .notEmpty()
    .withMessage("مبلغ را به درستی وارد کنید"),

  // Services validation (optional)
  body("services")
    .optional()
    .isArray()
    .withMessage("سرویس های هتل را به صورت آرایه وارد کنید"),

  // Images validation (optional)
  body("images").optional().isArray().withMessage("Images must be an array"),
];

module.exports = {
  sendOtpValidation,
  checkOtpValidation,
};
