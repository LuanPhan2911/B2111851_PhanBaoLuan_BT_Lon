<script>
import { computed } from "vue";
import defaultBook from "@/assets/images/default_book.png";
import { asset } from "@/helpers";
export default {
  name: "BookFilter",
  props: ["book"],
  setup(props) {
    const book = computed(() => {
      return {
        ...props.book,
        image: props.book?.image ? asset(props.book?.image) : defaultBook,
      };
    });
    return { book };
  },
};
</script>
<template>
  <div
    class="shadow mb-2 position-relative border-bottom col-lg-6"
    style="height: 170px"
  >
    <div class="row">
      <div class="col-auto">
        <img :src="book.image" alt="" class="image" />
      </div>
      <div class="col">
        <div class="mb-2 fw-bold">{{ book?.name }}</div>
        <div class="mb-2">
          <span class="fw-bold">Tác giả: </span> {{ book?.author_name }}
        </div>
        <div class="mb-2">
          <span class="fw-bold">Thể loại: </span>
          <button class="btn" v-for="genre in book?.genres" :key="genre?._id">
            {{ genre?.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.image {
  height: 170px;
  width: 120px;
}
</style>
