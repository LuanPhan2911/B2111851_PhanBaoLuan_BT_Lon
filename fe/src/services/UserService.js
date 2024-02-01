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
  async update(data) {
    try {
      let res = await this._api.put("/edit", data);
      if (res.success) {
      }
      return null;
    } catch (error) {}
  }
  async updateImage(data) {
    try {
      let res = await this._api.put("/edit/avatar", data);
      if (res.success) {
      }
      return null;
    } catch (error) {}
  }
}
export default new UserService();
