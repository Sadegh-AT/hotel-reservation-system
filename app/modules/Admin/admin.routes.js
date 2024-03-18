const adminController = require("./admin.controller");

const router = require("express").Router();

router.get("/users", adminController.users);
router.put("/set-rule", adminController.setRule);
module.exports = {
  AdminRoutes: router,
};
