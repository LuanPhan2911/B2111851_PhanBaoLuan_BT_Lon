<script>
import { onMounted, ref } from "vue";
import GenreService from "@/services/GenreService";
import CreateGenres from "../../components/layouts/admin/genres/CreateGenres.vue";
import TableGenres from "../../components/layouts/admin/genres/TableGenres.vue";
export default {
  components: { CreateGenres, TableGenres },
  name: "adminGenreView",
  setup() {
    const genres = ref([]);
    onMounted(() => {
      document.title = "Admin - Manage Genre";
      fetchGenres();
    });

    const fetchGenres = async () => {
      try {
        let data = await GenreService.getAll();
        if (data) {
          genres.value = data;
        }
      } catch (error) {}
    };
    const onUpdated = async () => {
      await fetchGenres();
    };

    return { genres, onUpdated };
  },
};
</script>
<template>
  <div class="mb-3">
    <create-genres @onCreated="onUpdated" />
    <table-genres :genres="genres" @onDeleted="onUpdated" />
  </div>
</template>
