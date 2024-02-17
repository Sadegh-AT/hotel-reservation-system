const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const RoomModel = require("./room.model");
const HotelModel = require("../hotel/hotel.model");
const createHttpError = require("http-errors");
const { timeNow } = require("../../utils/functions");
const { Types } = require("mongoose");

class RoomService {
  constructor() {
    autoBind(this);
  }

  async create(dto) {
    const hotel = await HotelModel.findById(dto.hotelId);
    if (!hotel) throw createHttpError.NotFound("هتل پیدا نشد");
    const room = await RoomModel.create(dto);
    hotel.rooms.push(room._id);
    hotel.save();
    return room;
  }
  async get(id, dates) {
    const hotel = await HotelModel.findById(id);
    if (!hotel) throw createHttpError.NotFound("هتل پیدا نشد");
    const rooms = await RoomModel.find({
      reservation_date: {
        $nin: dates,
      },
    });
    return rooms;
  }

  async bookRoom(id, dates) {
    const room = await RoomModel.findById({ _id: id });

    if (!room) throw createHttpError.NotFound("اتاق پیدا نشد");
    const rooms = await RoomModel.find({
      reservation_date: {
        $in: dates,
      },
    });
    const reservedRoom = rooms.filter((room) => room._id.equals(id));
    console.log(reservedRoom.length);
    if (reservedRoom.length != 0)
      throw createHttpError.BadRequest(
        "این اتاق را نمیتوانید در این زمان رزرو کنید"
      );
    room.reservation_date.push(...dates);
    room.availability = false;
    await room.save();
    return {
      message: `رزرو اتاق ${room.room_name} با موفقیت انجام شد`,
    };
  }
}
module.exports = new RoomService();
