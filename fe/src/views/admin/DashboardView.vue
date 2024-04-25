<script>
import { onMounted, ref, watch } from "vue";
import Modal from "../../components/layouts/Modal.vue";
import BookRentCreate from "../../components/admin/books/BookRentCreate.vue";
import TabBar from "../../components/layouts/TabBar.vue";
import TableBookRent from "../../components/admin/books/TableBookRent.vue";
import { usePaginator } from "@/hooks/usePaginator";
import AdminService from "@/services/AdminService";
import Paginator from "../../components/layouts/Paginator.vue";
import { useModal } from "@/hooks/useModal";
import BookRentDetail from "@/components/admin/books/BookRentDetail.vue";
export default {
  components: {
    Modal,
    BookRentCreate,
    TabBar,
    TableBookRent,
    Paginator,
    BookRentDetail,
  },
  name: "adminDashboardView",
  setup() {
    const modalData = [
      {
        id: "create",
        title: "Renting Book",
        active: true,
      },
      {
        id: "detail",
        title: "Renting Book Detail",
        active: false,
      },
    ];
    const { modalContent, setModalContent, onShow, onHide } =
      useModal(modalData);
    const status = ref("spending");
    const {
      docs: rentBooks,
      links,
      changePage,
      changeQuery,
      onRefresh,
    } = usePaginator({
      fetchData: fetchRentBooks,
      qs: {
        status: status.value,
      },
    });

    const rentBookDetail = ref({});
    const rentBookId = ref("");
    onMounted(() => {
      document.title = "Admin - Dashboard";
    });
    watch(rentBookId, async (_id) => {
      if (_id) {
        fetchRentBookDetail(_id);
      }
    });
    watch(status, (newStatus) => {
      changeQuery({
        status: newStatus,
      });
    });
    async function fetchRentBooks(query) {
      let data = await AdminService.getRentBooks(query);
      return data;
    }
    async function fetchRentBookDetail(_id) {
      let data = await AdminService.getRentBookDetail({
        _id,
      });
      if (data) {
        rentBookDetail.value = data;
      }
    }
    const showModal = (id) => {
      setModalContent(id);
      onShow();
    };
    const selectRentBook = (_id) => {
      rentBookId.value = _id;
    };
    const hideModal = () => onHide();
    const refreshRentBook = () => onRefresh();
    const changeStatus = (value) => {
      status.value = value;
    };
    return {
      links,
      modalContent,
      rentBooks,
      rentBookDetail,
      setModalContent,
      changePage,
      showModal,
      hideModal,
      selectRentBook,
      changeStatus,
      refreshRentBook,
    };
  },
};
</script>
<template>
  <div>
    <button class="btn btn-primary" @click="showModal('create')">
      Create Renting Book
    </button>
    <hr />
    <div class="mt-3">
      <tab-bar>
        <template #title>
          <button
            class="btn btn-primary active m-2 fw-bold"
            data-bs-target="#nav-spending"
            data-bs-toggle="tab"
            @click="changeStatus('spending')"
          >
            Spending
          </button>
          <button
            class="btn btn-warning m-2 fw-bold"
            data-bs-target="#nav-renting"
            data-bs-toggle="tab"
            @click="changeStatus('renting')"
          >
            Renting
          </button>
          <button
            class="btn btn-success m-2 fw-bold"
            data-bs-target="#nav-completed"
            data-bs-toggle="tab"
            @click="changeStatus('completed')"
          >
            Completed
          </button>
        </template>
        <template #body>
          <div class="tab-pane fade show active" id="nav-spending">
            <table-book-rent
              status="spending"
              :rentBooks="rentBooks"
              @showModal="showModal"
              @selectRentBook="selectRentBook"
              @refreshRentBook="refreshRentBook"
              :nextStatus="'renting'"
            />
            <paginator :links="links" @changePage="changePage" />
          </div>
          <div class="tab-pane fade" id="nav-renting">
            <table-book-rent
              status="renting"
              :rentBooks="rentBooks"
              @showModal="showModal"
              @selectRentBook="selectRentBook"
              @refreshRentBook="refreshRentBook"
              :nextStatus="'completed'"
            />
            <paginator :links="links" @changePage="changePage" />
          </div>
          <div class="tab-pane fade" id="nav-completed">
            <table-book-rent
              status="completed"
              :rentBooks="rentBooks"
              @showModal="showModal"
              @selectRentBook="selectRentBook"
              @refreshRentBook="refreshRentBook"
              :nextStatus="null"
            />
            <paginator :links="links" @changePage="changePage" />
          </div>
        </template>
      </tab-bar>
    </div>

    <modal @onHide="hideModal">
      <template #title>
        <h4 class="modal-title text-primary">{{ modalContent.title }}</h4>
      </template>
      <template #body>
        <book-rent-create
          v-if="modalContent.id === 'create'"
          @hideModal="hideModal"
        />
        <book-rent-detail
          v-if="modalContent.id === 'detail'"
          :rentBookDetail="rentBookDetail"
        />
      </template>
    </modal>
  </div>
</template>
