const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const AuthMessage = require("../modules/auth/auth.messages");

require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "100s" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw createError.Unauthorized("لطفا دوباره وارد حساب کاربری خود شوید");
  }
}
module.exports = {
  signToken,
  verifyToken,
};
