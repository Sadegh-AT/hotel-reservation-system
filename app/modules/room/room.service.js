const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");

class RoomService {
  constructor() {
    autoBind(this);
  }

  async sendOTP(mobile) {}
}
module.exports = new RoomService();
