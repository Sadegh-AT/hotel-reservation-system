const autoBind = require("auto-bind");
const userService = require("./user.service");

class UserController {
  constructor() {
    autoBind(this);
  }
  async reservedRoom(req, res, next) {
    try {
      const rooms = await userService.rooms(req.user._id);
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  }
  async cancelReservation(req, res, next) {
    try {
      const { id } = req.params;
      const resault = await userService.cancel(id, req.user._id);
      res.json(resault);
    } catch (error) {
      next(error);
    }
  }
  async profile(req, res, next) {
    try {
      const id = req.user._id;
      const resault = await userService.getUser(id);
      res.json(resault);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
