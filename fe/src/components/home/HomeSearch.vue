<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "HomeSearch",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const q = ref(route.query?.q || "");
    watch(q, (value) => {
      router.push({
        query: {
          ...route.query,
          q: value || [],
        },
      });
    });
    const isHover = ref(false);
    const search = () => {
      router.push({
        name: "bookFilter",
        query: {
          ...route.query,
        },
      });
    };
    return { q, isHover, search };
  },
};
</script>
<template>
  <div class="d-flex mb-3">
    <input
      type="search"
      class="form-control fw-bold text-primary"
      placeholder="Nhập tên sách hoặc tên tác giả..."
      v-model="q"
      @keydown.enter="search"
    />
    <button
      class="btn btn-primary ms-2"
      @click="search"
      @mouseover="isHover = true"
      @mouseout="isHover = false"
    >
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>
