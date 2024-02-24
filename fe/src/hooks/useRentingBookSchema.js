import { filterObjectByKeys } from "@/helpers";
import * as yup from "yup";
export function useRentingBookSchema() {
  const obj = {
    name: yup
      .string()
      .required("Tên bắt buộc phải điền")
      .max(50, "Tên tối đa 50 ký tự"),
    birthday: yup
      .number()
      .required("Năm sinh bắt buộc phải điền")
      .min(1900, "Năm sinh không không lệ")
      .max(new Date().getFullYear(), "Năm sinh không hơp lệ"),
    phone_number: yup
      .string()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ")
      .required("Số điện thoại bắt buộc phải điền"),
    gender: yup.number().oneOf([1, 0], "Giới tính không hợp lệ"),
    address: yup.string().required("Địa chỉ bắt buộc phải điền"),
    remain_quantity: yup.number().required(),
    renting_quantity: yup
      .number()
      .required("Số lượng bắt buộc phải điền")
      .min(1, "Số lượng tối thiểu là 1")
      .max(yup.ref("remain_quantity"), "Số lượng không hợp lệ"),
    days_after_expire: yup
      .number()
      .required("Số ngày mượn bắt buộc phải điền")
      .min(1, "Số ngày mượn tối thiểu là 1"),
  };
  const rentingBookSchema = yup.object().shape(obj);
  const getSchema = (keys) => yup.object().shape(filterObjectByKeys(obj, keys));

  return { rentingBookSchema, getSchema };
}
