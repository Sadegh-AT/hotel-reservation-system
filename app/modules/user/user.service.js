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
  async cancel(roomId, userId) {
    const user = await UserModel.findById(userId);
    const cancledRoomDates = user.reserved_room.find(
      (room) => room.roomId == roomId
    ).reserved_date;
    console.log(cancledRoomDates);
    await RoomModel.updateOne(
      { _id: roomId },
      { $pull: { reservation_date: { $in: cancledRoomDates } } }
    );
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { reserved_room: { roomId } } }
    );

    return { message: `رزور اتاق مورد نظر لغو شد` };
  }
}
module.exports = new UserService();
