const userController = require("./user.controller");

const router = require("express").Router();

router.get("/reserved-room", userController.reservedRoom);
router.delete("/cancel-reservation/:id", userController.cancelReservation);
module.exports = {
  UserRoutes: router,
};
