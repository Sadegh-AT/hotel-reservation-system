const hotelController = require("./hotel.controller");

const router = require("express").Router();

router.post("/add", hotelController.createHotel);
module.exports = {
  HotelRoutes: router,
};
