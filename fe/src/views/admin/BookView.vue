<script>
import { computed, onMounted } from "vue";
import BookService from "@/services/BookService";
import { usePaginator } from "@/hooks/usePaginator";
import { asset } from "@/helpers";
import defaultImage from "@/assets/images/default_book.png";
import TableBooks from "../../components/admin/books/TableBooks.vue";
import Paginator from "../../components/layouts/Paginator.vue";
export default {
  components: { TableBooks, Paginator },
  name: "adminBookView",
  setup() {
    const { currentPage, getPagination, paginator } = usePaginator({
      fetchData: fetchBooks,
    });
    async function fetchBooks(query) {
      try {
        let data = await BookService.getAll(query);
        return data;
      } catch (error) {}
    }
    const pagination = computed(() => getPagination(paginator.value));
    const books = computed(() =>
      paginator.value?.docs?.map((item) => {
        return {
          ...item,
          image: item.image ? asset(item.image) : defaultImage,
        };
      })
    );
    onMounted(() => {
      document.title = "Admin - Manage Book";
    });
    async function onDelete(_id) {
      if (confirm("Do you want to delete book?")) {
        try {
          let data = await BookService.destroy({
            _id,
          });
          if (data) {
            paginator.value = await fetchBooks({
              page: currentPage.value,
            });
          }
        } catch (error) {}
      }
    }
    return { books, pagination, onDelete };
  },
};
</script>
<template>
  <div>
    <div class="mb-3">
      <router-link :to="{ name: 'adminBookCreateView' }" class="btn btn-primary"
        >Create</router-link
      >
    </div>
    <div class="mb-3">
      <table-books :books="books" @onDelete="onDelete" />
    </div>
    <div class="mb-3">
      <paginator :paginate="pagination" />
    </div>
  </div>
</template>
