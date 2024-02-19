<script>
import { computed } from "vue";
import BookSlide from "../book/BookSlide.vue";

export default {
  components: {
    BookSlide,
  },
  name: "HomeBook",
  props: ["books"],
  setup(props) {
    const books = computed(() => props.books);
    return { books };
  },
};
</script>
<template>
  <div>
    <div class="fs-4 text-primary">Sách nổi bật</div>
    <div class="mb-3">
      <book-slide :books="books"></book-slide>
    </div>
  </div>
</template>
