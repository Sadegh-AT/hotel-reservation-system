const { AuthRoutes } = require("../modules/auth/auth.routes");
const { HotelRoutes } = require("../modules/hotel/hotel.routes");
const { RoomRoutes } = require("../modules/room/room.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);
router.use("/room", RoomRoutes);
router.use("/hotel", HotelRoutes);

router.get("/", (req, res) => {
  res.json("Hello");
});
module.exports = {
  AllRoutes: router,
};
