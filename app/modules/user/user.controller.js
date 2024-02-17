const autoBind = require("auto-bind");

class UserController {
  constructor() {
    autoBind(this);
  }
  async bookRoom(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
