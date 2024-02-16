const autoBind = require("auto-bind");

class RoomController {
  constructor() {
    autoBind(this);
  }
  async createRoom(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoomController();
