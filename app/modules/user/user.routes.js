const userController = require("./user.controller");

const router = require("express").Router();

router.get("/reserved-room", userController.reservedRoom);
module.exports = {
  UserRoutes: router,
};
