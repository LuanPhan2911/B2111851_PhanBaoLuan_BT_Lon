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
}
export default new AdminService();
