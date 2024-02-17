const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");

class UserService {
  constructor() {
    autoBind(this);
  }

  async rooms(id) {
    console.log(id);
    const user = await UserModel.findById(id).populate("reserved_room");
    console.log(user);
    return user;
  }
}
module.exports = new UserService();
