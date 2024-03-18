const autoBind = require("auto-bind");
const adminService = require("./admin.service");

class AdminController {
  constructor() {
    autoBind(this);
  }
  async users(req, res, next) {
    try {
      const users = await adminService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async setRule(req, res, next) {
    try {
      const { id, rule } = req.body;
      const a = await adminService.setRule(id, rule);
      res.json(a);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
