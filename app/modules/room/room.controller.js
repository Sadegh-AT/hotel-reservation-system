const autoBind = require("auto-bind");
const roomService = require("./room.service");

class RoomController {
  constructor() {
    autoBind(this);
  }
  async createRoom(req, res, next) {
    try {
      const { room_number, room_name, capacity, price, images, hotelId } =
        req.body;
      const resault = await roomService.create({
        room_number,
        room_name,
        capacity,
        price,
        images,
        hotelId,
      });
      res.json(resault);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoomController();
