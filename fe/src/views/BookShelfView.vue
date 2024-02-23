<script>
import { computed, ref } from "vue";
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
    return { rentBooks, links, changeStatus, changePage };
  },
};
</script>
<template>
  <div class="mb-3 shadow p-3 bg-white bg-opacity-75 rounded-2 min-vh-100">
    <h4 class="text-primary fw-bold">Tủ sách</h4>
    <tab-bar>
      <template #title>
        <button
          class="nav-item btn btn-primary active"
          data-bs-target="#nav-spending"
          data-bs-toggle="tab"
          @click="changeStatus('spending')"
        >
          Chờ xác nhận
        </button>
        <button
          class="nav-item btn btn-warning"
          data-bs-target="#nav-renting"
          data-bs-toggle="tab"
          @click="changeStatus('renting')"
        >
          Đang mượn
        </button>
        <button
          class="nav-item btn btn-success"
          data-bs-target="#nav-completed"
          data-bs-toggle="tab"
          @click="changeStatus('completed')"
        >
          Đã trả
        </button>
        <button
          class="nav-item btn btn-danger"
          data-bs-target="#nav-expired"
          data-bs-toggle="tab"
          @click="changeStatus('expired')"
        >
          Quá hạn
        </button>
      </template>
      <template #body>
        <div class="tab-pane fade show active" id="nav-spending">
          <book-shelf :rentBooks="rentBooks" :status="'Chờ xác nhận'" />
          <paginator :links="links" @changePage="changePage" />
        </div>
        <div class="tab-pane fade" id="nav-renting">
          <book-shelf :rentBooks="rentBooks" :status="'Đang mượn'" />
          <paginator :links="links" @changePage="changePage" />
        </div>
        <div class="tab-pane fade" id="nav-completed">
          <book-shelf :rentBooks="rentBooks" :status="'Đã trả'" />
          <paginator :links="links" @changePage="changePage" />
        </div>
        <div class="tab-pane fade" id="nav-expired">
          <book-shelf :rentBooks="rentBooks" :status="'Quá hạn'" />
          <paginator :links="links" @changePage="changePage" />
        </div>
      </template>
    </tab-bar>
  </div>
</template>
