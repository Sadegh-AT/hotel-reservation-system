const createHttpError = require("http-errors");
const { AccessToken } = require("../constant/cookie.enum");
const { verifyToken } = require("../utils/token-manager");
const UserModel = require("../modules/user/user.model");
const { splitBarearToken, getToken } = require("../utils/functions");
const RedisDB = require("../utils/redis-connection");
const RedisKey = require("../constant/redis.key");

const AuthorizationGuard = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token)
      throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");

    if (await RedisDB.sismember(RedisKey.LoggedOutTokens, token)) {
      throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
    }

    const payload = await verifyToken(token);

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
