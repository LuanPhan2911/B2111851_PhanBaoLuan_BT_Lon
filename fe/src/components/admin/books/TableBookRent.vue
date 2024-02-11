<script>
import { computed } from "vue";
import moment from "moment";
import AdminService from "@/services/AdminService";
export default {
  emits: ["showModal", "selectRentBook", "refreshRentBook"],
  props: ["rentBooks", "status", "nextStatus"],
  name: "TableBookRent",
  setup(props, { emit }) {
    const rentBooks = computed(() => {
      return props?.rentBooks?.map((item) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
          gender: item.gender === 1 ? "Male" : "Female",
          expire_at: moment(item.expire_at).format("DD-MM-YYYY"),
          toExpired: moment(item.expire_at).from(item.createdAt),
          hasExpire: moment(item.expire_at).isBefore(moment()),
          valid: moment(item.expire_at).isBefore(moment())
            ? "expired"
            : "available",
        };
      });
    });
    const status = computed(() => props.status);
    const nextStatus = computed(() => props.nextStatus);
    const hasBook = computed(() => props.rentBooks?.length > 0);
    const showDetail = ({ modalId, _id }) => {
      emit("showModal", modalId);
      emit("selectRentBook", _id);
    };
    const updateStatus = async ({ _id, status }) => {
      if (confirm(`Do you change to new status: ${status}`)) {
        let data = await AdminService.updateStatusRentBook({
          _id,
          data: {
            status,
          },
        });
        if (data) {
          emit("refreshRentBook");
        }
      }
    };
    const deleteRentBook = async ({ _id }) => {
      if (confirm("Do you change to delete")) {
        let data = await AdminService.deleteRentBook({
          _id,
        });
        if (data) {
          emit("refreshRentBook");
        }
      }
    };
    return {
      rentBooks,
      hasBook,
      status,
      nextStatus,
      showDetail,
      updateStatus,
      deleteRentBook,
    };
  },
};
</script>
<template>
  <table
    class="table table-hover caption-top shadow table-responsive-lg table-bordered"
    v-if="hasBook"
  >
    <caption>
      <h3 class="text-primary text-capitalize">{{ status }}</h3>
    </caption>
    <thead class="table-primary">
      <tr>
        <th>UserName</th>
        <th>PhoneNumber</th>
        <th>BookName</th>
        <th>Quantity</th>
        <th>CreateAt</th>
        <th>ExpiredAt</th>
        <th>ToExpired</th>
        <th>Valid</th>
        <th><i class="bi bi-arrow-down-up"></i> Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in rentBooks"
        :key="item._id"
        :class="[item?.hasExpire ? 'table-danger' : 'table-success']"
      >
        <td>{{ item?.user?.name }}</td>
        <td>{{ item?.user?.phone_number }}</td>
        <td class="col-2">{{ item?.book?.name }}</td>
        <td>{{ item?.quantity }}</td>
        <td>{{ item?.createdAt }}</td>
        <td>{{ item?.expire_at }}</td>
        <td class="fw-bold text-capitalize">{{ item?.toExpired }}</td>
        <td
          class="fw-bold text-capitalize"
          :class="[item?.hasExpire ? 'text-danger' : 'text-primary']"
        >
          {{ item?.valid }}
        </td>
        <td class="col-2">
          <button
            class="btn btn-success my-2 me-2"
            @click="
              showDetail({
                modalId: 'detail',
                _id: item._id,
              })
            "
          >
            <i class="bi bi-cast"></i>
          </button>
          <button
            class="btn btn-primary my-2 me-2"
            @click="
              updateStatus({
                _id: item._id,
                status: nextStatus,
              })
            "
            v-if="nextStatus != null"
          >
            <i class="bi bi-pen"></i>
          </button>
          <button
            class="btn btn-danger"
            v-if="status !== 'renting'"
            @click="deleteRentBook({ _id: item._id })"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="container fs-3 text-primary d-flex justify-content-center align-items-center block text-capitalize"
    v-else
  >
    Empty {{ status }} renting book
  </div>
</template>
<style scoped>
.block {
  height: 200px;
}
</style>
