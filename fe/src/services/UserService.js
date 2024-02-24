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
  async getAll({ query }) {
    try {
      let res = await this._api.get("/", {
        params: query,
      });
      if (res.success) {
        return res.data;
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
  async updateLockUser({ _id, data }) {
    try {
      let res = await this._api.put(`/${_id}/locking`, data);
      if (res.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async rentBook({ data }) {
    try {
      let res = await this._api.post("/renting_books/create", data);
      if (res.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async getRentBook(qs) {
    try {
      let res = await this._api.get("/renting_books", {
        params: qs,
      });
      if (res.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async deleteRentBook({ _id }) {
    try {
      let res = await this._api.delete(`/renting_books/${_id}/delete`);
      if (res.success) {
        return true;
      }
      return null;
    } catch (error) {}
  }
}
export default new UserService();
