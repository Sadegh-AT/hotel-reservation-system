const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const RoomModel = require("./room.model");
const HotelModel = require("../hotel/hotel.model");
const createHttpError = require("http-errors");
const { timeNow } = require("../../utils/functions");

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
  async getAvailbleRoom(id) {
    const hotel = await HotelModel.findById(id);
    if (!hotel) throw createHttpError.NotFound("هتل پیدا نشد");
    const now = timeNow();
    return await RoomModel.find(
      { $and: [{ hotelId: id }, { availability: true }] },
      {}
    );
  }
  async bookRoom(id, dates) {
    const room = await RoomModel.findById({ _id: id });
    console.log(dates);
    if (!room) throw createHttpError.NotFound("اتاق پیدا نشد");
    room.reservation_date.push(...dates);
    room.availability = false;
    await room.save();
    return room;
  }
}
module.exports = new RoomService();
