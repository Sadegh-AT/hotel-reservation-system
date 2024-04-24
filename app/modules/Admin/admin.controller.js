const autoBind = require("auto-bind");
const adminService = require("./admin.service");

class AdminController {
  constructor() {
    autoBind(this);
  }
  async users(req, res, next) {
    try {
      const users = await adminService.getUsers();
      res.json(
        responseFormatter("اطلاعات کاربران گرفته شد", 200, users, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
  async setRule(req, res, next) {
    try {
      const { id, rule } = req.body;
      const a = await adminService.setRule(id, rule);
      res.json(
        responseFormatter("سطح دسترسی برای کاربر اضافه شد", 200, a, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
  async removeRule(req, res, next) {
    try {
      const { id, rule } = req.body;
      const a = await adminService.removeRule(id, rule);
      res.json(
        responseFormatter("سطح دسترسی از کاربر گرفته شد", 200, a, req, false)
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
