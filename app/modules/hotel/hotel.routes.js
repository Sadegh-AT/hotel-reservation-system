const { AuthorizationGuard } = require("../../middleware/authorization.guard");
const { RuleGuard } = require("../../middleware/rule.guard");
const hotelController = require("./hotel.controller");

const router = require("express").Router();

router.get("/", hotelController.allHotels);
router.get("/:id", hotelController.getHotel);
router.post("/add", AuthorizationGuard, hotelController.createHotel);
router.delete("/remove/:id", RuleGuard("hi"), hotelController.removeHotel);

module.exports = {
  HotelRoutes: router,
};
