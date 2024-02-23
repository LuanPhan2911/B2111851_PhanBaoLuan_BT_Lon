<script>
import BookService from "@/services/BookService";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BookFilter from "../components/book/BookFilter.vue";
import { usePaginator } from "@/hooks/usePaginator";
import HomeSearch from "../components/home/HomeSearch.vue";
import Paginator from "../components/layouts/Paginator.vue";
import BookFilterGenre from "../components/book/BookFilterGenre.vue";
import GenreService from "@/services/GenreService";
export default {
  components: { BookFilter, HomeSearch, Paginator, BookFilterGenre },
  name: "BookFilterView",
  setup() {
    const route = useRoute();
    const timer = ref(null);
    const genres = ref([]);
    const {
      docs: books,
      links,
      changePage,
      changeQuery,
    } = usePaginator({
      fetchData: fetchBooks,
      qs: {
        name: route.query?.q,
        genre: route.query?.genre,
      },
    });
    async function fetchBooks(query) {
      try {
        return await BookService.getAll(query);
      } catch (error) {}
    }
    const fetchGenres = async () => {
      try {
        let data = await GenreService.getAll();
        if (data) {
          genres.value = data;
        }
      } catch (error) {}
    };
    watch(route, () => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
      timer.value = setTimeout(() => {
        changeQuery({
          name: route.query?.q,
          genre: route.query?.genre,
        });
      }, 500);
    });
    onMounted(() => {
      fetchGenres();
    });
    const hasBooks = computed(() => books.value?.length > 0);
    return { books, hasBooks, links, genres, changePage };
  },
};
</script>
<template>
  <div class="p-3 bg-white bg-opacity-75 rounded-2" style="min-height: 50vh">
    <div class="mb-3">
      <home-search />
      <div class="mb-3">
        <book-filter-genre :genres="genres" />
      </div>
    </div>
    <hr />
    <div class="row" v-if="hasBooks">
      <book-filter v-for="book in books" :book="book" :key="book._id" />
      <paginator :links="links" @changePage="changePage" />
    </div>
    <div v-else class="text-center text-uppercase text-primary fw-bolder">
      Không tìm thấy sách phù hợp
    </div>
  </div>
</template>
