import createClient from "../axios";
class AdminService {
  constructor() {
    this._api = createClient("/api/admin");
  }
  async createRentBook(data) {
    try {
      let res = await this._api.post("/renting_books/create", data);
      if (res.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async updateStatusRentBook({ _id, data }) {
    try {
      let res = await this._api.put(`/renting_books/${_id}/edit`, data);
      if (res.success) {
        return res;
      }
      return null;
    } catch (error) {}
  }
  async deleteRentBook({ _id }) {
    try {
      let res = await this._api.delete(`/renting_books/${_id}/delete`);
      if (res.success) {
        return res;
      }
      return null;
    } catch (error) {}
  }
  async getRentBooks(query) {
    try {
      let res = await this._api.get("/books/renting", {
        params: query,
      });
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async getRentBookDetail({ _id }) {
    try {
      let res = await this._api.get(`/books/${_id}/renting`);
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
}
export default new AdminService();
