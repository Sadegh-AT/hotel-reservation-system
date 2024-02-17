const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");

class UserService {
  constructor() {
    autoBind(this);
  }

  async create(dto) {}
}
module.exports = new UserService();
