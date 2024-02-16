const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createError = require("http-errors");
const { randomInt } = require("crypto");
const AuthMessage = require("./auth.messages");
class AuthService {
  constructor() {
    autoBind(this);
  }

  async sendOTP(mobile) {
    const user = await UserModel.findOne({ mobile }, { mobile: 1, otp: 1 });
    console.log(user);
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 10000,
    };
    if (!user) {
      const newUser = await UserModel.create({ mobile, otp });
      return newUser;
    }
    if (user.otp && user.otp.expiresIn > now) {
      throw createError.BadRequest(AuthMessage.OtpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    return user;
  }
}
module.exports = new AuthService();
