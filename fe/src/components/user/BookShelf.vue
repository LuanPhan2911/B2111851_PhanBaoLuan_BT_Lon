<script>
import { asset } from "@/helpers";
import { computed } from "vue";
import defaultImage from "@/assets/images/default_book.png";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "vue-router";
export default {
  name: "BookShelf",
  props: ["rentBooks", "status"],
  emits: ["delete"],
  setup(props, { emit }) {
    const router = useRouter();
    const status = computed(() => props.status);
    const statusMessage = computed(() => {
      if (props.status == "spending") {
        return "Chờ xác nhận";
      }
      if (props.status == "renting") {
        return "Đang mượn";
      }
      if (props.status == "completed") {
        return "Đã trả";
      }
      if (props.status == "expired") {
        return "Quá hạn";
      }
      return "Chờ xác nhận";
    });
    const rentBooks = computed(() => {
      return props.rentBooks?.map((item) => {
        return {
          ...item,
          book: {
            ...item?.book,
            image: item?.book?.image ? asset(item?.book?.image) : defaultImage,
          },
          createdAt: moment(item?.createdAt).format("DD-MM-YYYY"),
          expiredAt: moment(item?.expire_at).format("DD-MM-YYYY"),
          daysRent: Math.round(
            moment(item?.expire_at).diff(item?.createdAt, "d", true)
          ),
        };
      });
    });
    const hasRentBooks = computed(() => props.rentBooks?.length > 0);
    const showBookDetail = ({ _id, slug }) => {
      router.push({
        name: "bookDetail",
        params: {
          slug,
        },
        query: {
          _id,
        },
      });
    };
    const deleteRentBook = async ({ _id }) => emit("delete", { _id });
    return {
      rentBooks,
      status,
      statusMessage,
      hasRentBooks,
      showBookDetail,
      deleteRentBook,
    };
  },
};
</script>
<template>
  <div class="table-responsive">
    <table
      className="table table-bordered table-striped table-hover"
      v-if="hasRentBooks"
    >
      <thead class="table-primary">
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Số ngày mượn</th>
          <th>Số lượng</th>
          <th>Trạnh thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rentBooks" :key="item._id">
          <td class="d-flex justify-content-center">
            <img :src="item?.book?.image" class="avatar" />
          </td>
          <td class="col-3">{{ item?.book?.name }}</td>
          <td>{{ item?.createdAt }}</td>
          <td>{{ item?.expiredAt }}</td>
          <td>{{ item?.daysRent }}</td>
          <td>{{ item?.quantity }}</td>
          <td>{{ statusMessage }}</td>
          <td>
            <button
              class="btn btn-success m-2"
              @click="
                showBookDetail({ slug: item?.book?.slug, _id: item?.book?._id })
              "
            >
              <i class="bi bi-cast"></i>
            </button>
            <button
              class="btn btn-danger m-2"
              v-if="status == 'spending'"
              @click="deleteRentBook({ _id: item?._id })"
            >
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
