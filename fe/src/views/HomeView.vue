<script>
import { onMounted, ref } from "vue";
import HomeBook from "../components/home/HomeBook.vue";
import HomeGenre from "../components/home/HomeGenre.vue";
import HomeSearch from "../components/home/HomeSearch.vue";
import GenreService from "@/services/GenreService";
import BookService from "@/services/BookService";
export default {
  name: "HomeView",
  components: {
    HomeGenre,
    HomeBook,
    HomeSearch,
  },
  setup() {
    const genres = ref([]);
    const books = ref([]);
    const fetchGenres = async () => {
      try {
        let data = await GenreService.getAll();
        if (data) {
          genres.value = data;
        }
      } catch (error) {}
    };
    const fetchBooks = async () => {
      try {
        let data = await BookService.getNewest();
        books.value = data;
      } catch (error) {}
    };
    onMounted(() => {
      fetchBooks();
      fetchGenres();
    });
    return { books, genres };
  },
};
</script>
<template>
  <div
    class="container row justify-content-center shadow p-3 bg-white bg-opacity-75 rounded-2"
  >
    <home-search />
    <hr />
    <home-genre :genres="genres" />
    <hr />
    <home-book :books="books" />
  </div>
</template>
