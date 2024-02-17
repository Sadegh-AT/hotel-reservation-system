const userController = require("./user.controller");

const router = require("express").Router();
router.post("/book", userController.bookRoom);
module.exports = {
  UserRoutes: router,
};
