const adminController = require("./admin.controller");

const router = require("express").Router();

router.get("/users", adminController.users);
router.put("/set-rule", adminController.setRule);
router.delete("/remove-rule", adminController.removeRule);
module.exports = {
  AdminRoutes: router,
};
