const autoBind = require("auto-bind");
const hotelService = require("./hotel.service");

class HotelController {
  constructor() {
    autoBind(this);
  }
  async createHotel(req, res, next) {
    try {
      const {
        name,
        address,
        phone,
        email,
        website,
        rates,
        price,
        services,
        images,
      } = req.body;
      const hotel = await hotelService.create({
        name,
        address,
        phone,
        email,
        website,
        rates,
        price,
        services,
        images,
      });
      res.json(hotel);
    } catch (error) {
      next(error);
    }
  }

  async allHotels(req, res, next) {
    try {
      const hotels = await hotelService.getAllHotels();
      res.json(hotels);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HotelController();
