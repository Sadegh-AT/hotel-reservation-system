const hotelController = require("./hotel.controller");

const router = require("express").Router();

router.get("/", hotelController.allHotels);
router.post("/add", hotelController.createHotel);
module.exports = {
  HotelRoutes: router,
};
