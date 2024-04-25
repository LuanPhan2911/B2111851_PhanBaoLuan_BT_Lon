import { filterObjectByKeys } from "@/helpers";
import * as yup from "yup";
export function useUserSchema() {
  const obj = {
    name: yup
      .string()
      .required("Tên bắt buộc phải điền")
      .max(50, "Tên tối đa 50 ký tự"),
    email: yup
      .string()
      .required("Email bắt buộc phải điền")
      .email("Email không hợp lệ")
      .max(50, "Email tối đa 50 ký tự"),
    password: yup
      .string()
      .required("Mật khẩu bắt buộc phải điền")
      .min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirm_password: yup
      .string()
      .required("Nhập lại mật khẩu bắt buộc phải điền")
      .oneOf([yup.ref("password"), null], "Nhập lại mật khẩu không khớp"),
    birthday: yup
      .number()
      .min(1900, "Năm sinh không không lệ")
      .max(new Date().getFullYear(), "Năm sinh không hơp lệ")
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
    phone_number: yup
      .string()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ")
      .required("Số điện thoại bắt buộc phải điền"),
    gender: yup.number().oneOf([1, 0], "Giới tính không hợp lệ"),
    address: yup.string().required("Địa chỉ bắt buộc phải điền"),
  };
  const userSchema = yup.object().shape(obj);
  const getSchema = (keys) => {
    let objFilter = filterObjectByKeys(obj, keys);
    return yup.object().shape(objFilter);
  };
  return { userSchema, getSchema };
}
