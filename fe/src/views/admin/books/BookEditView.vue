<script>
import GenreService from "@/services/GenreService";
import PublisherService from "@/services/PublisherService";

import BookService from "@/services/BookService";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BookEdit from "../../../components/admin/books/BookEdit.vue";

export default {
  components: { BookEdit },
  name: "adminBookEditView",
  setup() {
    const route = useRoute();
    const _id = computed(() => route.query?._id);
    const genres = ref([]);
    const publishers = ref([]);
    const book = ref({});
    const fetchGenre = async () => {
      try {
        let data = await GenreService.getAll();
        if (data) {
          genres.value = data;
        }
      } catch (error) {}
    };
    const fetchPublisher = async () => {
      try {
        let data = await PublisherService.getAll();
        if (data) {
          publishers.value = data;
        }
      } catch (error) {}
    };
    const fetchBook = async () => {
      if (_id.value) {
        let data = await BookService.show({
          _id: _id.value,
        });

        if (data) {
          book.value = data;
        }
      }
    };
    onMounted(async () => {
      await fetchGenre();
      await fetchPublisher();
      await fetchBook();
    });

    return {
      genres,
      publishers,
      book,
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3 class="text-center text-primary">Edit Book</h3>
      </div>
      <div class="card-body">
        <book-edit
          :genres="genres"
          :publishers="publishers"
          :book="book"
        ></book-edit>
      </div>
    </div>
  </div>
</template>
