const { AuthorizationGuard } = require("../middleware/authorization.guard");
const { AdminRoutes } = require("../modules/Admin/admin.routes");
const { AuthRoutes } = require("../modules/auth/auth.routes");
const { HotelRoutes } = require("../modules/hotel/hotel.routes");
const { RoomRoutes } = require("../modules/room/room.routes");
const { UserRoutes } = require("../modules/user/user.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/room", RoomRoutes);
router.use("/hotel", HotelRoutes);
router.use("/admin", AdminRoutes);
router.use("/user", AuthorizationGuard, UserRoutes);

router.get("/", (req, res) => {
  res.json("Hello");
});
module.exports = {
  AllRoutes: router,
};
