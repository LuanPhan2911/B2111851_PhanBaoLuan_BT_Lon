import createClient from "../axios";
class UserService {
  constructor() {
    this._api = createClient("/api/users");
  }
  async edit() {
    try {
      let res = await this._api.get("/edit");
      if (res.success) {
        return res.data.user;
      }
      return null;
    } catch (error) {}
  }
}
export default new UserService();
