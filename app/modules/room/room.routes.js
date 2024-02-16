const roomController = require("./room.controller");

const router = require("express").Router();

router.post("/add", roomController.createRoom);
module.exports = {
  RoomRoutes: router,
};
