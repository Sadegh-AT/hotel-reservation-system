const roomController = require("./room.controller");

const router = require("express").Router();

router.post("/add", roomController.createRoom);
router.get("/:id", roomController.getAllRooms);
router.get("/avaibale/:id", roomController.getAvailbleRoom);
module.exports = {
  RoomRoutes: router,
};
