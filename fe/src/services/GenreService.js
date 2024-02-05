import createClient from "../axios";
class GenreService {
  constructor() {
    this._api = createClient("/api/genres");
  }
  async createMany(data) {
    try {
      let res = await this._api.post("/create_many", data);
      if (res.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async getAll() {
    try {
      let res = await this._api.get("/");
      if (res.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async delete({ _id }) {
    try {
      let res = await this._api.delete(`/${_id}/delete`);
      if (res.success) {
        return true;
      }
      return false;
    } catch (error) {}
  }
}
export default new GenreService();
