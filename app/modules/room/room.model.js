const { Schema, Types, model } = require("mongoose");

const RoomSchema = new Schema(
  {
    room_number: { type: String, required: false, default: "" },
    room_type: { type: String, required: false, default: "" },
    capacity: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    availability: { type: Boolean, required: true, default: true },
    images: { type: [String], required: false, default: "" },
  },
  {
    timestamps: true,
  }
);
const RoomModel = model("room", RoomSchema);
module.exports = RoomModel;
