const autoBind = require("auto-bind");
const HotelModel = require("./hotel.model");

class RoomService {
  constructor() {
    autoBind(this);
  }

  async create(dto) {
    const hotel = await HotelModel.create(dto);
    return hotel;
  }
}
module.exports = new RoomService();
