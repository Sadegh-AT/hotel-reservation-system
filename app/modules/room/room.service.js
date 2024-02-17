const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const RoomModel = require("./room.model");
const HotelModel = require("../hotel/hotel.model");
const createHttpError = require("http-errors");

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
}
module.exports = new RoomService();
