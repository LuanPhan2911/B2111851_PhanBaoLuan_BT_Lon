<script>
import { onMounted } from "vue";
import Modal from "../../components/layouts/Modal.vue";
import BookRent from "../../components/admin/books/BookRent.vue";
import TabBar from "../../components/layouts/TabBar.vue";
export default {
  components: { Modal, BookRent, TabBar },
  name: "adminDashboardView",
  setup() {
    onMounted(() => {
      document.title = "Admin - Dashboard";
    });
  },
};
</script>
<template>
  <div>
    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#modal"
    >
      Create Renting
    </button>
    <div class="mt-3">
      <tab-bar>
        <template #title>
          <button
            class="nav-item btn btn-primary active"
            data-bs-toggle="tab"
            data-bs-target="#nav-spending"
          >
            Spending
          </button>
          <button
            class="nav-item btn btn-warning"
            data-bs-toggle="tab"
            data-bs-target="#nav-renting"
          >
            Renting
          </button>
          <button
            class="nav-item btn btn-success"
            data-bs-toggle="tab"
            data-bs-target="#nav-completed"
          >
            Completed
          </button>
          <button
            class="nav-item btn btn-danger"
            data-bs-toggle="tab"
            data-bs-target="#nav-expired"
          >
            Expired
          </button>
        </template>
        <template #body>
          <div class="tab-pane fade show active" id="nav-spending">...</div>
          <div class="tab-pane fade" id="nav-renting">...</div>
          <div class="tab-pane fade" id="nav-completed">...</div>
          <div class="tab-pane fade" id="nav-expired">...</div>
        </template>
      </tab-bar>
    </div>

    <modal>
      <template #title>
        <h4 class="modal-title text-primary">Renting Book</h4>
      </template>
      <template #body>
        <book-rent />
      </template>
    </modal>
  </div>
</template>
