<script>
import { computed } from "vue";
import { useClassButton } from "@/hooks/useClassButton";
export default {
  name: "HomeGenre",
  props: ["genres"],
  setup(props) {
    const { getRandom: btnClass } = useClassButton();
    const genres = computed(() => props.genres);
    return { genres, btnClass };
  },
};
</script>
<template>
  <div>
    <div class="fs-4 text-primary">Thể loại</div>
    <div class="d-flex gap-2 flex-wrap mb-3">
      <button
        class="btn"
        style="font-size: 12px"
        :class="btnClass()"
        v-for="genre in genres"
        :key="genre._id"
      >
        {{ genre.name }}
      </button>
    </div>
  </div>
</template>
