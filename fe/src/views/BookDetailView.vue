<script>
import BookService from "@/services/BookService";
import CommentService from "@/services/CommentService";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BookDetail from "../components/book/BookDetail.vue";
import BookSlide from "../components/book/BookSlide.vue";
import CommentCreate from "../components/comment/CommentCreate.vue";
import { usePaginator } from "@/hooks/usePaginator";
import Paginator from "../components/layouts/Paginator.vue";
import Comment from "../components/comment/Comment.vue";

export default {
  components: {
    BookDetail,
    BookSlide,
    CommentCreate,
    Paginator,
    Comment,
  },
  name: "BookDetailView",
  setup() {
    const route = useRoute();
    const book = ref({});
    const booksSameGenres = ref([]);
    const booksSamePublisher = ref([]);
    const {
      docs: comments,
      links,
      changePage,
      onRefresh,
      changeQuery,
    } = usePaginator({
      fetchData: fetchComments,
      qs: {
        _id: route.query._id,
        _type: "Book",
      },
    });

    const fetchBook = async () => {
      let { _id } = route.query;
      try {
        let data = await BookService.show({
          _id,
        });
        if (data) {
          book.value = data;
        }
      } catch (error) {}
    };
    const fetchBooksSameGenres = async () => {
      try {
        const qs = {
          genres: book.value.genres.map((item) => item._id),
          _id: book.value._id,
        };
        let data = await BookService.get(qs);
        if (data) {
          booksSameGenres.value = data;
        }
      } catch (error) {}
    };
    const fetchBooksSamePublisher = async () => {
      try {
        const qs = {
          publisher: book.value.publisher._id,
          _id: book.value._id,
        };
        let data = await BookService.get(qs);
        if (data) {
          booksSamePublisher.value = data;
        }
      } catch (error) {}
    };
    async function fetchComments(query) {
      try {
        let data = await CommentService.getAll(query);
        return data;
      } catch (error) {}
    }
    onMounted(async () => {
      await fetchBook();
      await fetchBooksSameGenres();
      await fetchBooksSamePublisher();
      document.title = `Book | ${book.value?.name}`;
    });
    watch(route, async () => {
      await fetchBook();
      await fetchBooksSameGenres();
      await fetchBooksSamePublisher();
      changeQuery({
        _id: route.query._id,
        _type: "Book",
      });
      document.title = `Book | ${book.value?.name}`;
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    const hasNewComment = () => onRefresh();

    return {
      book,
      booksSameGenres,
      booksSamePublisher,
      comments,
      links,
      hasNewComment,
      changePage,
    };
  },
};
</script>
<template>
  <div class="container row shadow bg-white bg-opacity-75 rounded-2 min-vh-100">
    <book-detail :book="book" />
    <hr />
    <div class="col-lg-10 mb-3">
      <h4 class="text-primary">Bình luận</h4>
      <div class="mb-3">
        <comment-create
          @sent="hasNewComment"
          :parent="{
            _id: null,
          }"
          :commentable="{
            _id: book._id,
            _type: 'Book',
          }"
        />
      </div>
      <hr />
      <div class="mb-3">
        <comment
          v-for="comment in comments"
          :key="comment._id"
          :comment="comment"
        />
        <paginator :links="links" @changePage="changePage" />
      </div>
    </div>
    <hr />
    <div class="col-lg-12 mb-3">
      <h4 class="text-primary">Cùng thể loại</h4>
      <book-slide :books="booksSameGenres"></book-slide>
    </div>
    <hr />
    <div class="col-lg-10 mb-3">
      <h4 class="text-primary">Cùng nhà xuất bản</h4>
      <book-slide :books="booksSamePublisher"></book-slide>
    </div>
  </div>
</template>
<style scoped>
.book-image {
  height: 350px;
}
</style>
