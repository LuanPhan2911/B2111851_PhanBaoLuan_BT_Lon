import createClient from "../axios";
class CommentService {
  constructor() {
    this._api = createClient("/api/comments");
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
  async getAll(qs) {
    try {
      let res = await this._api.get("/", {
        params: qs,
      });
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
  async getReplies({ _id }) {
    try {
      let res = await this._api.get(`/${_id}/replies`);
      if (res?.success) {
        return res.data;
      }
      return null;
    } catch (error) {}
  }
}
export default new CommentService();
