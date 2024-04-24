const autoBind = require("auto-bind");
const hotelService = require("./hotel.service");
const createError = require("http-errors");
const path = require("path");
const { responseFormatter } = require("../../utils/functions");

class HotelController {
  constructor() {
    autoBind(this);
  }
  async createHotel(req, res, next) {
    try {
      const { name, address, phone, email, website, rates, price, services } =
        req.body;
      const images = req?.files?.map((image) =>
        path.normalize(image?.path?.slice(7))
      );

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
      res.json(responseFormatter("", 200, hotel, req, false));
    } catch (error) {
      next(error);
    }
  }

  async allHotels(req, res, next) {
    try {
      const { name } = req.query;
      const { id } = req.params;

      if (name) {
        const hotels = await hotelService.find(
          name.toString().replace("+", " ").trim()
        );
        res.json(hotels);
      } else {
        const hotels = await hotelService.getAllHotels();

        res.json(
          responseFormatter(
            "اطلاعات هتل ها با موفقیت اماده شد",
            200,
            hotels,
            req,
            false
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
  async getHotel(req, res, next) {
    try {
      const { id } = req.params;
      const result = await hotelService.get(id);
      res.json(responseFormatter("", 200, result, req, false));
    } catch (error) {
      next(error);
    }
  }
  async removeHotel(req, res, next) {
    try {
      const { id } = req.params;
      const result = await hotelService.remove(id);
      res.json(responseFormatter("", 200, result, req, false));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HotelController();
