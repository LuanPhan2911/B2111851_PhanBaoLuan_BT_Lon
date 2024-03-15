<script>
import { computed, ref, watch } from "vue";
import { useClassButton } from "@/hooks/useClassButton";
import { useRouter } from "vue-router";
import ButtonHover from "../layouts/ButtonHover.vue";
export default {
  components: { ButtonHover },
  name: "HomeGenre",
  props: ["genres"],
  setup(props) {
    const { getRandom: btnClass } = useClassButton();
    const isHover = ref(false);
    const router = useRouter();
    const genres = computed(() => {
      return props.genres?.map((item) => {
        return {
          ...item,
          btnClass: btnClass(),
          isHover: false,
        };
      });
    });

    const showBook = ({ _id }) => {
      router.push({
        name: "bookFilter",
        query: {
          genre: _id,
        },
      });
    };

    return { genres, isHover, showBook };
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
        Thể loại</span
      >
    </div>
    <div class="d-flex gap-2 flex-wrap mb-3">
      <button-hover
        v-for="genre in genres"
        :key="genre._id"
        :text="genre?.name"
        :class="genre?.btnClass"
        :hoverClass="'animate__heartBeat'"
        style="font-size: 12px"
      >
      </button-hover>
    </div>
  </div>
</template>
