const { Schema, Types, model } = require("mongoose");

const HotelSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    website: { type: String, required: false },
    rates: {
      type: Number,
      enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      required: false,
      default: 0,
    },
    price: { type: Number, required: true, default: "" },
    services: { type: [String], required: false, default: "" },
    images: { type: [String], required: false, default: "" },
    rooms: { type: [Types.ObjectId], ref: "room", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const HotelModel = model("hotel", HotelSchema);
module.exports = HotelModel;
