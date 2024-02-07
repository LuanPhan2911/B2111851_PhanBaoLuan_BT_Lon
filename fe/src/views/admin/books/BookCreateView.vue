<script>
import GenreService from "@/services/GenreService";
import PublisherService from "@/services/PublisherService";
import { Form, Field, ErrorMessage } from "vee-validate";
import BookCreate from "../../../components/admin/books/BookCreate.vue";
import { onMounted, ref } from "vue";

export default {
  components: { Form, Field, ErrorMessage, BookCreate },
  name: "adminBookCreateView",
  setup() {
    const genres = ref([]);
    const publishers = ref([]);

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
    onMounted(async () => {
      await fetchGenre();
      await fetchPublisher();
    });

    return {
      genres,
      publishers,
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3 class="text-center text-primary">Create Book</h3>
      </div>
      <div class="card-body">
        <book-create :genres="genres" :publishers="publishers"></book-create>
      </div>
    </div>
  </div>
</template>
