const autoBind = require("auto-bind");
const roomService = require("./room.service");
const { getDatesBetween } = require("../../utils/functions");
const RoomModel = require("./room.model");
const createHttpError = require("http-errors");

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
  async getRooms(req, res, next) {
    try {
      const { hotelId, startDate, endDate } = req.body;
      if (!startDate || !endDate)
        throw createHttpError.BadRequest("تاریخ را وارد کنید");
      const dates = getDatesBetween(startDate, endDate);
      const rooms = await roomService.get(hotelId, dates);
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  }

  async bookRoom(req, res, next) {
    try {
      const { roomId, startDate, endDate } = req.body;

      const reservationDate = getDatesBetween(startDate, endDate);
      const resault = await roomService.bookRoom(
        roomId,
        reservationDate,
        req.user._id
      );
      res.json(resault);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoomController();
