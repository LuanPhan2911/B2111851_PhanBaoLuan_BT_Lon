<script>
import { asset } from "@/helpers";
import { computed } from "vue";
import defaultBook from "@/assets/images/default_book.png";
import { useClassButton } from "@/hooks/useClassButton";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useTruncate } from "@/hooks/useTruncate";
import { useModal } from "@/hooks/useModal";
import Modal from "../layouts/Modal.vue";
import BookRent from "./BookRent.vue";
export default {
  components: { Modal, BookRent, BookRent },
  name: "BookDetail",
  props: ["book"],
  setup(props) {
    const router = useRouter();
    const toast = useToast();
    const { isAuth } = useAuth();
    const book = computed(() => {
      return {
        ...props.book,
        image: props.book?.image ? asset(props.book?.image) : defaultBook,
      };
    });
    const { getRandom: btnClass } = useClassButton();
    const { showText, truncated } = useTruncate();
    const { modalContent, onShow, onHide } = useModal([
      {
        id: "create",
        title: "Mượn sách",
        active: true,
      },
    ]);
    const rentBook = async () => {
      if (!isAuth.value) {
        router.push({ name: "login" });
        toast.warning("Cần đăng nhập để mượn sách!");
        return;
      }
      onShow();
    };
    return {
      book,
      btnClass,
      showText,
      truncated,
      modalContent,
      onShow,
      onHide,
      rentBook,
    };
  },
};
</script>
<template>
  <div>
    <div class="row">
      <div class="col-lg-3">
        <img :src="book?.image" alt="" class="book-image img-thumbnail" />
      </div>
      <div class="col-lg-6 border-start">
        <h4>{{ book?.name }}</h4>
        <div class="mb-2">
          <span class="fw-bold">Tác giả: </span>
          {{ book?.author_name }}
        </div>
        <div class="mb-2">
          <span class="fw-bold">Thể loại: </span>
          <span
            class="fw-bold m-2"
            v-for="genre in book?.genres"
            :key="genre?._id"
          >
            {{ genre?.name }}
          </span>
        </div>
        <div class="mb-2">
          <span class="fw-bold">Nhà xuất bản: </span>
          {{ book?.publisher?.name }}
        </div>
        <div class="mb-2">
          <span class="fw-bold">Năm xuất bản: </span> {{ book?.year_publish }}
        </div>
        <div class="mb-2">
          <span class="fw-bold"> Số lượng còn lại: </span
          >{{ book?.remain_quantity }}
        </div>
        <button class="btn btn-danger" @click="rentBook">Mượn ngay</button>
      </div>
    </div>
    <hr />
    <div class="col-lg-10 mb-2">
      <h4 class="text-primary">Giới thiệu</h4>
      <div class="line-break" :class="{ 'text-overflow-10-line': truncated }">
        {{ book?.description }}
      </div>
      <span class="text-primary pointer" v-if="truncated" @click="showText"
        >Xem thêm</span
      >
    </div>

    <modal @onHide="onHide">
      <template #title>
        <h4 class="modal-title text-primary">{{ modalContent.title }}</h4>
      </template>
      <template #body>
        <book-rent :book="book" @onHide="onHide" />
      </template>
    </modal>
  </div>
</template>
