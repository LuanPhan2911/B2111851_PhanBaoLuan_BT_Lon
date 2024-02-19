<script>
import { asset } from "@/helpers";
import { computed, ref } from "vue";
import defaultBook from "@/assets/images/default_book.png";
import { useClassButton } from "@/hooks/useClassButton";
export default {
  name: "BookDetail",
  props: ["book"],
  setup(props) {
    const book = computed(() => {
      return {
        ...props.book,
        image: props.book?.image ? asset(props.book?.image) : defaultBook,
      };
    });
    const { getRandom: btnClass } = useClassButton();
    const isTruncate = ref(true);
    return { book, isTruncate, btnClass };
  },
};
</script>
<template>
  <div>
    <div class="row mb-3">
      <div class="col-lg-3">
        <img :src="book?.image" alt="" class="book-image img-thumbnail" />
      </div>
      <div class="col-lg-6 border-start">
        <h4>{{ book?.name }}</h4>
        <div class="mb-3">
          <span class="fw-bold">Tác giả: </span> {{ book?.author_name }}
        </div>
        <div class="mb-3">
          <span class="fw-bold">Thể loại: </span>
          <button
            class="btn"
            :class="btnClass()"
            v-for="genre in book?.genres"
            :key="genre?._id"
          >
            {{ genre?.name }}
          </button>
        </div>
        <div class="mb-3">
          <span class="fw-bold">Nhà xuất bản: </span>
          {{ book?.publisher?.name }}
        </div>
        <div class="mb-3">
          <span class="fw-bold">Năm xuất bản: </span> {{ book?.year_publish }}
        </div>
        <div class="mb-3">
          <span class="fw-bold"> Số lượng còn lại: </span
          >{{ book?.remain_quantity }}
        </div>
        <button class="btn btn-danger">Mượn ngay</button>
      </div>
    </div>
    <hr />
    <div class="col-lg-10 mb-3">
      <h4 class="text-primary">Giới thiệu</h4>
      <div class="line-break" :class="{ 'text-overflow-20-line': isTruncate }">
        {{ book?.description }}
      </div>
      <span
        class="text-primary pointer"
        v-if="isTruncate"
        @click="isTruncate = false"
        >Xem thêm</span
      >
    </div>
  </div>
</template>
