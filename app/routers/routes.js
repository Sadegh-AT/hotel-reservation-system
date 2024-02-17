const { AuthorizationGuard } = require("../middleware/authorization.guard");
const { AuthRoutes } = require("../modules/auth/auth.routes");
const { HotelRoutes } = require("../modules/hotel/hotel.routes");
const { RoomRoutes } = require("../modules/room/room.routes");
const { UserRoutes } = require("../modules/user/user.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/room", AuthorizationGuard, RoomRoutes);
router.use("/hotel", HotelRoutes);
router.use("/user", UserRoutes);

router.get("/", (req, res) => {
  res.json("Hello");
});
module.exports = {
  AllRoutes: router,
};
