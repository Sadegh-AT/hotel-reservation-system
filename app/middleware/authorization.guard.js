const createHttpError = require("http-errors");
const { AccessToken } = require("../constant/cookie.enum");
const { verifyToken } = require("../utils/token-manager");
const UserModel = require("../modules/user/user.model");
const ConnectToRedis = require("../utils/redis-connection");

const AuthorizationGuard = async (req, res, next) => {
  try {
    const token = req?.cookies[AccessToken];
    if (!token)
      throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");

    const payload = await verifyToken(token);
    console.log(payload);
    if (!payload.id)
      throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
    const user = await UserModel.findById(payload.id).lean();
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = { AuthorizationGuard };
