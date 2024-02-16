const autoBind = require("auto-bind");
const hotelService = require("./hotel.service");
const createError = require("http-errors");

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
      const { name } = req.query;
      console.log(name);
      if (name) {
        const hotels = await hotelService.find(
          name.toString().replace("+", " ").trim()
        );
        res.json(hotels);
      } else {
        const hotels = await hotelService.getAllHotels();
        res.json(hotels);
      }
    } catch (error) {
      next(error);
    }
  }
  async removeHotel(req, res, next) {
    try {
      const { id } = req.params;
      const result = await hotelService.remove(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HotelController();
