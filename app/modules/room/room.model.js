const { Schema, Types, model } = require("mongoose");

const RoomSchema = new Schema(
  {
    room_number: { type: String, required: false, default: "" },
    room_name: { type: String, required: false, default: "" },
    capacity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 0 },
    availability: { type: Boolean, required: false, default: true },
    reservation_date: { type: [String], required: false, default: [] },
    images: { type: [String], required: false, default: "" },
    hotelId: { type: Types.ObjectId, ref: "hotel", required: true },
  },
  {
    timestamps: true,
  }
);
const RoomModel = model("room", RoomSchema);
module.exports = RoomModel;
