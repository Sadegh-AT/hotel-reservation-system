const { Schema, Types, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, required: false, default: "" },
  expiresIn: { type: Number, required: false, default: 0 },
});
const UserSchema = new Schema(
  {
    name: { type: String, required: false, default: "" },
    family: { type: String, required: false, default: "" },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OTPSchema },
    birthday_date: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);
const UserModel = model("user", UserSchema);
module.exports = UserModel;
