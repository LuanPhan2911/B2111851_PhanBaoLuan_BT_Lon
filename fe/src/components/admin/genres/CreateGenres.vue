<script>
import GenreService from "@/services/GenreService";
import _ from "lodash";
import { ref } from "vue";
export default {
  name: "CreateGenres",
  emit: ["onCreated"],
  setup(props, { emit }) {
    const genres = ref("");
    const onCreate = async () => {
      let arr = genres.value?.split("\n");
      arr = arr.filter((item) => {
        return !_.isEmpty(item);
      });
      arr = arr?.map((item) => {
        return {
          name: _.trim(item),
        };
      });
      if (_.isEmpty(arr)) {
        return;
      }
      try {
        let data = await GenreService.createMany({
          genres: arr,
        });
        if (data) {
          emit("onCreated");
          genres.value = "";
        }
      } catch (error) {}
    };
    const onClear = () => {
      genres.value = "";
    };
    return {
      genres,
      onClear,
      onCreate,
    };
  },
};
</script>
<template>
  <div class="mb-3">
    <h4 class="text-primary">Manage Genres</h4>
    <div class="row">
      <div className="col-lg-10">
        <textarea
          className="form-control"
          rows="5"
          placeholder="Enter your genres. Use enter to separate"
          v-model="genres"
        ></textarea>
        <div class="d-flex justify-content-end mt-3 gap-2">
          <button class="btn btn-danger" @click="onClear">Clear</button>
          <button class="btn btn-primary" @click="onCreate">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
