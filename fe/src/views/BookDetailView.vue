<script>
import BookService from "@/services/BookService";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BookDetail from "../components/book/BookDetail.vue";
import BookSlide from "../components/book/BookSlide.vue";
export default {
  components: { BookDetail, BookSlide },
  name: "BookDetailView",
  setup() {
    const route = useRoute();
    const book = ref({});
    const booksSameGenres = ref([]);
    const booksSamePublisher = ref([]);
    const fetchBook = async ({ _id }) => {
      try {
        let data = await BookService.show({
          _id,
        });
        book.value = data;
      } catch (error) {}
    };
    const fetchBooksSameGenres = async (genres) => {
      try {
        const qs = {
          genres: genres.map((item) => item._id),
          _id: book.value._id,
        };
        let data = await BookService.get(qs);
        booksSameGenres.value = data;
      } catch (error) {}
    };
    const fetchBooksSamePublisher = async (publisher) => {
      try {
        const qs = {
          publisher: publisher._id,
          _id: book.value._id,
        };
        let data = await BookService.get(qs);
        booksSamePublisher.value = data;
      } catch (error) {}
    };
    onMounted(async () => {
      let { _id } = route.query;
      await fetchBook({ _id });
      await fetchBooksSameGenres(book.value?.genres);
      await fetchBooksSamePublisher(book.value?.publisher);
      document.title = `Book | ${book.value?.name}`;
    });
    watch(route, async () => {
      let { _id } = route.query;
      await fetchBook({ _id });
      await fetchBooksSameGenres(book.value?.genres);
      await fetchBooksSamePublisher(book.value?.publisher);
      document.title = `Book | ${book.value?.name}`;
      window.scrollTo({ top: 0 });
    });

    return { book, booksSameGenres, booksSamePublisher };
  },
};
</script>
<template>
  <div
    class="container row shadow p-3 bg-white bg-opacity-75 rounded-2 min-vh-100"
  >
    <book-detail :book="book" />
    <hr />
    <div class="col-lg-10">
      <h4 class="text-primary">Bình luận</h4>
    </div>
    <hr />
    <div class="col-lg-12 mb-3">
      <h4 class="text-primary">Cùng thể loại</h4>
      <book-slide :books="booksSameGenres"></book-slide>
      <h4 v-if="booksSameGenres?.length === 0" class="text-center text-primary">
        Không có truyện phù hợp
      </h4>
    </div>
    <hr />
    <div class="col-lg-10 mb-3">
      <h4 class="text-primary">Cùng nhà xuất bản</h4>
      <book-slide :books="booksSamePublisher"></book-slide>
      <h4
        v-if="booksSamePublisher?.length === 0"
        class="text-center text-primary"
      >
        Không có truyện phù hợp
      </h4>
    </div>
  </div>
</template>
<style scoped>
.book-image {
  height: 350px;
}
</style>
