const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");

class AdminService {
  constructor() {
    autoBind(this);
  }

  async getUsers() {
    return await UserModel.find(
      {},
      { mobile: 1, name: 1, family: 1, rules: 1 }
    );
  }
  async setRule(id, rule) {
    const user = await UserModel.findById(id);
    if (!user) throw createHttpError.NotFound("کاربر پیدا نشد");

    user.rules.push(rule);

    return await user.save();
  }
  async removeRule(id, rule) {
    const user = await UserModel.findById(id);
    if (!user) throw createHttpError.NotFound("کاربر پیدا نشد");
    const index = user.rules.indexOf(rule);
    if (index !== -1) {
      user.rules.splice(index, 1);
    }
    return await user.save();
  }
}
module.exports = new AdminService();
