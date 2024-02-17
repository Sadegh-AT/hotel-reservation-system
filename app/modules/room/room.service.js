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
  async get(id) {
    const hotel = await HotelModel.findById(id);
    if (!hotel) throw createHttpError.NotFound("هتل پیدا نشد");
    return await RoomModel.find({ hotelId: id }, {});
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
}
module.exports = new RoomService();
