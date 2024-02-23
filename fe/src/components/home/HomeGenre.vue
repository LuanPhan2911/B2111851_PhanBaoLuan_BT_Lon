<script>
import { computed } from "vue";
import { useClassButton } from "@/hooks/useClassButton";
import { useRouter } from "vue-router";
export default {
  name: "HomeGenre",
  props: ["genres"],
  setup(props) {
    const { getRandom: btnClass } = useClassButton();
    const router = useRouter();
    const genres = computed(() => props.genres);
    const showBook = ({ _id }) => {
      router.push({
        name: "bookFilter",
        query: {
          genre: _id,
        },
      });
    };
    return { genres, btnClass, showBook };
  },
};
</script>
<template>
  <div>
    <div class="fs-4 text-primary">Thể loại</div>
    <div class="d-flex gap-2 flex-wrap mb-3">
      <button
        class="btn fw-bold"
        style="font-size: 12px"
        :class="btnClass()"
        v-for="genre in genres"
        :key="genre._id"
        @click="showBook(genre)"
      >
        {{ genre.name }}
      </button>
    </div>
  </div>
</template>
