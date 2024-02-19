const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const RoomModel = require("../room/room.model");
const createHttpError = require("http-errors");

class UserService {
  constructor() {
    autoBind(this);
  }

  async rooms(id) {
    console.log(id);
    const user = await UserModel.findById(id, {
      "reserved_room.roomId.reservation_date": 0,
    }).populate({
      path: "reserved_room.roomId",
      select: "_id room_name hotelId",
      populate: {
        path: "hotelId",
        select: "_id name address",
      },
    });

    console.log(user);
    return user;
  }
  async cancel(id) {
    const room = await RoomModel.findById(id);
    if (!room) throw createHttpError.NotFound("اتاق پیدا نشد");
  }
}
module.exports = new UserService();
