<script>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "BookFilterGenre",
  props: ["genres"],
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const genre = ref(route.query?.genre || null);

    const genres = computed(() => {
      return [
        {
          name: "Tất cả",
          _id: null,
        },
        ...props.genres,
      ];
    });
    watch(genre, (value) => {
      router.push({
        query: {
          ...route.query,
          genre: value || [],
        },
      });
    });
    return { genres, genre };
  },
};
</script>
<template>
  <div class="col-12">
    <v-select
      label="name"
      placeholder="Thể loại"
      :options="genres"
      v-model="genre"
      :reduce="(option) => option._id"
    ></v-select>
  </div>
</template>
