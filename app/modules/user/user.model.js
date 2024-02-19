const { Schema, Types, model } = require("mongoose");

const OTPSchema = new Schema(
  {
    code: { type: String, required: false, default: "" },
    expiresIn: { type: Number, required: false, default: 0 },
  },
  {
    _id: false,
  }
);
const ReserverdRoomSchema = new Schema(
  {
    roomId: { type: Types.ObjectId, ref: "room", required: false },
    reserved_date: { type: [String], required: false, default: [] },
  },
  {
    _id: false,
  }
);
const UserSchema = new Schema(
  {
    name: { type: String, required: false, default: "" },
    family: { type: String, required: false, default: "" },
    mobile: { type: String, unique: true, required: true },
    verifiedMobile: { type: Boolean, required: true, default: false },
    otp: { type: OTPSchema },
    birthday_date: { type: String, required: false, default: "" },
    reserved_room: {
      type: [ReserverdRoomSchema],
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
const UserModel = model("user", UserSchema);
module.exports = UserModel;
