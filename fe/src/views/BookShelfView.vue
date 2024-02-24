<script>
import TabBar from "../components/layouts/TabBar.vue";
import BookShelf from "../components/user/BookShelf.vue";
import UserService from "@/services/UserService";
import { usePaginator } from "@/hooks/usePaginator";
import Paginator from "../components/layouts/Paginator.vue";
export default {
  components: { TabBar, BookShelf, Paginator },
  name: "BookShelfView",
  setup() {
    const {
      docs: rentBooks,
      changePage,
      links,
      changeQuery,
      onRefresh,
    } = usePaginator({
      fetchData: fetchBooks,
      qs: {
        status: "spending",
      },
    });
    async function fetchBooks(qs) {
      try {
        let data = await UserService.getRentBook(qs);
        return data;
      } catch (error) {}
    }
    const changeStatus = (status) => {
      changeQuery({
        status,
      });
    };
    const deleteRentBook = async ({ _id }) => {
      try {
        let data = await UserService.deleteRentBook({
          _id,
        });
        if (data) {
          onRefresh();
        }
      } catch (error) {}
    };
    return { rentBooks, links, changeStatus, changePage, deleteRentBook };
  },
};
</script>
<template>
  <div class="mb-3 shadow p-3 bg-white bg-opacity-75 rounded-2 min-vh-100">
    <h4 class="text-primary fw-bold">Tủ sách</h4>
    <tab-bar>
      <template #title>
        <button
          class="btn btn-primary active m-2 fw-bold"
          data-bs-target="#nav-spending"
          data-bs-toggle="tab"
          @click="changeStatus('spending')"
        >
          Chờ xác nhận
        </button>
        <button
          class="btn btn-warning m-2 fw-bold"
          data-bs-target="#nav-renting"
          data-bs-toggle="tab"
          @click="changeStatus('renting')"
        >
          Đang mượn
        </button>
        <button
          class="btn btn-success m-2 fw-bold"
          data-bs-target="#nav-completed"
          data-bs-toggle="tab"
          @click="changeStatus('completed')"
        >
          Đã trả
        </button>
        <button
          class="btn btn-danger m-2 fw-bold"
          data-bs-target="#nav-expired"
          data-bs-toggle="tab"
          @click="changeStatus('expired')"
        >
          Quá hạn
        </button>
      </template>
      <template #body>
        <div class="tab-pane fade show active" id="nav-spending">
          <book-shelf
            :rentBooks="rentBooks"
            :status="'spending'"
            @delete="deleteRentBook"
          />
          <paginator :links="links" @changePage="changePage" />
        </div>
        <div class="tab-pane fade" id="nav-renting">
          <book-shelf
            :rentBooks="rentBooks"
            :status="'renting'"
            @delete="deleteRentBook"
          />
          <paginator :links="links" @changePage="changePage" />
        </div>
        <div class="tab-pane fade" id="nav-completed">
          <book-shelf
            :rentBooks="rentBooks"
            :status="'completed'"
            @delete="deleteRentBook"
          />
          <paginator :links="links" @changePage="changePage" />
        </div>
        <div class="tab-pane fade" id="nav-expired">
          <book-shelf
            :rentBooks="rentBooks"
            :status="'expired'"
            @delete="deleteRentBook"
          />
          <paginator :links="links" @changePage="changePage" />
        </div>
      </template>
    </tab-bar>
  </div>
</template>
