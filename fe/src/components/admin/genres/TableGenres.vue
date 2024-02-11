<script>
import { computed } from "vue";
import GenreService from "@/services/GenreService";
export default {
  name: "TableGenres",
  props: ["genres"],
  emit: ["onDeleted"],
  setup(props, { emit }) {
    const genres = computed(() => props.genres);
    const onDelete = async (_id) => {
      if (!confirm("Do you want to delete genre?")) {
        return;
      }

      try {
        let data = await GenreService.delete({
          _id,
        });
        if (data) {
          emit("onDeleted");
        }
      } catch (error) {}
    };
    return { genres, onDelete };
  },
};
</script>
<template>
  <div class="row">
    <div class="col-lg-10">
      <table className="table table-bordered table-striped table-hover">
        <thead class="table-primary">
          <tr>
            <th>#</th>

            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(genre, index) in genres" :key="genre._id">
            <td>{{ index + 1 }}</td>
            <td>{{ genre.name }}</td>
            <td>{{ genre.slug }}</td>
            <td>
              <button className="btn btn-danger" @click="onDelete(genre._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
