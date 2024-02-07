import createClient from "../axios";
class BookService {
  constructor() {
    this._api = createClient("/api/books");
  }
  async getAll(query) {
    try {
      let res = await this._api.get("/", {
        params: query,
      });
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async getToSelect() {
    try {
      let res = await this._api.get("/select");
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async create(data) {
    try {
      let res = await this._api.post("/create", data);
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async show({ _id }) {
    try {
      let res = await this._api.get(`/${_id}/show`);
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async update({ _id, data }) {
    try {
      let res = await this._api.put(`/${_id}/edit`, data);
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async updateImage({ _id, data }) {
    try {
      let res = await this._api.put(`/${_id}/edit/image`, data);
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async destroy({ _id }) {
    try {
      let res = await this._api.delete(`/${_id}/delete`);
      if (res?.success) {
        return true;
      }
      return false;
    } catch (error) {}
  }
}
export default new BookService();
