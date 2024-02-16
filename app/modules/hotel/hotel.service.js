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
  async getAllHotels() {
    const hotel = await HotelModel.find(
      {},
      { _id: 1, name: 1, address: 1, rates: 1, price: 1 }
    );
    return hotel;
  }
  async remove(id) {
    return await HotelModel.deleteOne({ _id: id });
    // return await HotelModel.deleteMany({});
  }
}
module.exports = new RoomService();
