const RulesName = require("../../constant/rules.enum");
const { AuthorizationGuard } = require("../../middleware/authorization.guard");

const { RuleGuard } = require("../../middleware/rule.guard");
const { upload } = require("../../utils/multer");
const hotelController = require("./hotel.controller");

const router = require("express").Router();

router.get("/", hotelController.allHotels);
router.get("/:id", hotelController.getHotel);
router.post(
  "/add",
  AuthorizationGuard,
  RuleGuard(RulesName.Admin),
  upload.array("images", 10),
  hotelController.createHotel
);
router.delete(
  "/remove/:id",
  AuthorizationGuard,
  RuleGuard(RulesName.Admin),
  hotelController.removeHotel
);

module.exports = {
  HotelRoutes: router,
};
