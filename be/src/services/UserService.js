const User = require("../models/User");

class UserService {
  static async emailExist(email) {
    let user = await User.findOne({
      email,
    });
    return user;
  }
}
module.exports = UserService;
