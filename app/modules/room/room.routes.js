const RulesName = require("../../constant/rules.enum");
const { AuthorizationGuard } = require("../../middleware/authorization.guard");
const { RuleGuard } = require("../../middleware/rule.guard");
const roomController = require("./room.controller");

const router = require("express").Router();

router.post(
  "/add",
  AuthorizationGuard,
  RuleGuard(RulesName.Admin),
  roomController.createRoom
);
router.get("/", roomController.getRooms);
router.put("/book", AuthorizationGuard, roomController.bookRoom);
module.exports = {
  RoomRoutes: router,
};
