import axios from "axios";
import { useToast } from "vue-toast-notification";

const createClient = (url) => {
  const $toast = useToast();
  const instance = axios.create({
    baseURL: url,
  });
  instance.interceptors.request.use((request) => {
    request.headers.Authorization = localStorage.getItem("token") || "";
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      let { message } = response?.data;
      $toast.success(message || "Response success without message");
      return response.data;
    },
    (error) => {
      let { message } = error?.response?.data;
      // validate error
      let statusCode = error?.response?.status;
      if (statusCode === 403) {
        message = getMessage(error?.response?.data?.errors);
      }
      $toast.error(message || "Error have not handled");
    }
  );
  return instance;
};
function getMessage(errors) {
  if (errors) {
    let keys = Object.keys(errors);
    if (keys?.length > 0) {
      return errors[keys[0]];
    }
  }
  return null;
}
export default createClient;
