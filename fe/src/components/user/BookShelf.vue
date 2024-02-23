<script>
import { asset } from "@/helpers";
import { computed } from "vue";
import defaultImage from "@/assets/images/default_book.png";
import _ from "lodash";
export default {
  name: "BookShelf",
  props: ["rentBooks", "status"],
  setup(props) {
    const status = computed(() => props.status);
    const books = computed(() => {
      return props.rentBooks?.map((item) => {
        let book = item?.book;
        return {
          ...book,
          image: book?.image ? asset(book?.image) : defaultImage,
          genre: _.first(book?.genres),
          quantity: item?.quantity,
        };
      });
    });

    const hasBooks = computed(() => props.rentBooks?.length > 0);
    return { books, status, hasBooks };
  },
};
</script>
<template>
  <div class="my-3">
    <table
      className="table table-bordered table-striped table-hover table-responsive"
      v-if="hasBooks"
    >
      <thead class="table-primary">
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sách</th>
          <th>Tên tác giả</th>
          <th>Nhà xuất bản</th>
          <th>Năm xuất bản</th>
          <th>Thể loại</th>
          <th>Số lượng</th>
          <th>Trạnh thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in books" :key="item._id">
          <td class="d-flex justify-content-center">
            <img :src="item.image" class="avatar" />
          </td>
          <td class="col-3">{{ item?.name }}</td>
          <td>{{ item?.author_name }}</td>
          <td class="col-2">{{ item?.publisher?.name }}</td>
          <td>{{ item?.year_publish }}</td>
          <td>{{ item?.genre?.name }}</td>
          <td>{{ item?.quantity }}</td>
          <td class="col-2">{{ status }}</td>
          <td>
            <button class="btn btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="container fs-4 text-primary d-flex justify-content-center align-items-center block text-capitalize p-5"
      v-else
    >
      Tủ sách trống
    </div>
  </div>
</template>
