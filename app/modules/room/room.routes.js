const roomController = require("./room.controller");

const router = require("express").Router();

router.post("/add", roomController.createRoom);
router.get("/", roomController.getRooms);
router.put("/book", roomController.bookRoom);
module.exports = {
  RoomRoutes: router,
};
