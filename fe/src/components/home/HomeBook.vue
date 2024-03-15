<script>
import { computed, ref } from "vue";
import BookSlide from "../book/BookSlide.vue";

export default {
  components: {
    BookSlide,
  },
  name: "HomeBook",
  props: ["books"],
  setup(props) {
    const isHover = ref(false);
    const books = computed(() => props.books);
    return { books, isHover };
  },
};
</script>
<template>
  <div>
    <div class="fs-4 text-primary mb-3">
      <span
        class="fw-bold d-inline-block animate__animated"
        :class="{ animate__tada: isHover }"
        @mouseover="isHover = true"
        @mouseout="isHover = false"
      >
        Sách nổi bậc</span
      >
    </div>
    <div class="mb-3">
      <book-slide :books="books"></book-slide>
    </div>
  </div>
</template>
