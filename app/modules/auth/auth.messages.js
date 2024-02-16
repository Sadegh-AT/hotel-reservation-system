const AuthMessage = Object.freeze({
  SendOtpSuccessfully: "کد ارسال شد",
  OtpCodeNotExpired: "کد قبلا ارسال شده است!",
  OtpCodeExpired: "کد منقضی شده است",
  OtpCodeIncorrect: "کد اشتباه است",
  UserNotFound: "کاربری با این شماره تلفن پیدا نشد",
});
module.exports = AuthMessage;
