import { filterObjectByKeys } from "@/helpers";
import * as yup from "yup";
export function useBookSchema() {
  const obj = {
    name: yup.string().required("Tên bắt buộc phải điền"),
    description: yup.string().required("Giới thiệu bắt buộc phải điền"),
    author_name: yup.string().required("Tên tác giả bắt buộc phải điền"),
    year_publish: yup.string().required("Năm phát hành bắt buộc phải điền"),
    total_quantity: yup
      .number()
      .required("Tổng số lượng bắt buộc phải điền")
      .min(1, "Số lượng tối thiểu là 1"),
    remain_quantity: yup
      .number()
      .min(1, "Số lượng tối thiểu là 1")
      .max(yup.ref("total_quantity"), "Số lượng không hợp lệ"),
  };
  const bookSchema = yup.object().shape(obj);
  const getSchema = (keys) => {
    let objFilter = filterObjectByKeys(obj, keys);
    return yup.object().shape(objFilter);
  };
  return { bookSchema, getSchema };
}
