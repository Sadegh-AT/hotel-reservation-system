const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const RoomModel = require("./room.model");
const HotelModel = require("../hotel/hotel.model");
const createHttpError = require("http-errors");
const { timeNow } = require("../../utils/functions");
const { Types, isValidObjectId, isObjectIdOrHexString } = require("mongoose");

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

  async bookRoom(id, dates, userId) {
    const room = await RoomModel.findById(id);
    const user = await UserModel.findById(userId);

    if (!room) throw createHttpError.NotFound("اتاق پیدا نشد");
    const rooms = await RoomModel.find({
      reservation_date: {
        $in: dates,
      },
    });
    const reservedRoom = rooms.filter((room) => room._id.equals(id));

    if (reservedRoom.length != 0)
      throw createHttpError.BadRequest(
        "این اتاق را نمیتوانید در این زمان رزرو کنید"
      );
    const roomObj = {
      roomId: id,
      reserved_date: dates,
    };

    room.reservation_date.push(...dates);
    room.availability = false;
    user.reserved_room.push(roomObj);

    await room.save();
    await user.save();
    return {
      message: `رزرو اتاق ${room.room_name} با موفقیت انجام شد`,
    };
  }
}
module.exports = new RoomService();
