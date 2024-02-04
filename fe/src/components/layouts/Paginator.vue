<script>
import { computed, toRef } from "vue";
export default {
  name: "Paginator",
  props: ["paginate"],
  setup(props) {
    const paginate = computed(() => props.paginate);
    return { paginate };
  },
};
</script>
<template>
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: !paginate?.hasPrevPage }">
      <router-link
        class="page-link"
        :to="{
          query: {
            page: paginate?.prevPage,
          },
        }"
      >
        <span aria-hidden="true">&laquo;</span>
      </router-link>
    </li>

    <li
      class="page-item"
      v-for="page in paginate?.totalPages"
      :key="page"
      :class="{ active: paginate?.page == page }"
    >
      <router-link
        class="page-link"
        :to="{
          query: {
            page,
          },
        }"
        >{{ page }}
      </router-link>
    </li>

    <li class="page-item" :class="{ disabled: !paginate?.hasNextPage }">
      <router-link
        class="page-link"
        :to="{
          query: {
            page: paginate?.nextPage,
          },
        }"
      >
        <span aria-hidden="true">&raquo;</span>
      </router-link>
    </li>
  </ul>
</template>
