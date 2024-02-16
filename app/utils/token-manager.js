const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const AuthMessage = require("../modules/auth/auth.messages");

require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY;

function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: "10s" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw createError.Unauthorized(AuthMessage.LoginAgain);
  }
}
module.exports = {
  signToken,
  verifyToken,
};
