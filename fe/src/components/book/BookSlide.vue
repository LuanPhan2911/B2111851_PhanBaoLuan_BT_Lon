<script>
import { computed, ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import { asset } from "@/helpers";
import defaultBook from "@/assets/images/default_book.png";
import { useRouter } from "vue-router";
export default {
  components: {
    Carousel,
    Slide,
  },
  name: "BookSlide",
  props: ["books"],
  setup(props) {
    const router = useRouter();
    const settings = ref({
      itemsToShow: 1,
      snapAlign: "center",
    });
    const breakpoints = ref({
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: "center",
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: "start",
      },
    });

    const computedBook = computed(() => {
      return props.books.map((item) => {
        return {
          ...item,
          image: item.image ? asset(item.image) : defaultBook,
        };
      });
    });
    const showDetail = ({ _id, slug }) => {
      router.push({
        name: "bookDetail",
        params: {
          slug,
        },
        query: {
          _id,
        },
      });
    };
    return { computedBook, settings, breakpoints, showDetail };
  },
};
</script>
<template>
  <carousel v-bind="settings" :breakpoints="breakpoints">
    <slide v-for="book in computedBook" :key="book._id">
      <div
        class="carousel__item pointer"
        @click="
          showDetail({
            _id: book._id,
            slug: book.slug,
          })
        "
      >
        <img :src="book.image" class="img" />
        <div class="fw-bold">{{ book.name }}</div>
      </div>
    </slide>
  </carousel>
</template>
<style scoped>
.carousel__item {
  min-height: 300px;
  width: 200px;
}
.carousel__item .img {
  height: 250px;
  width: 200px;
}
</style>
