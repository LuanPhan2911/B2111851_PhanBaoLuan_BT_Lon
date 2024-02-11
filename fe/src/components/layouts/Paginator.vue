<script>
import { computed, toRef } from "vue";
export default {
  name: "Paginator",
  props: ["links"],
  emits: ["changePage"],
  setup(props, { emit }) {
    const links = computed(() => props.links);
    const showLinks = computed(
      () => links.value?.hasNextPage || links.value?.hasPrevPage
    );
    const changePage = (page) => emit("changePage", page);
    return { links, showLinks, changePage };
  },
};
</script>
<template>
  <ul class="pagination justify-content-center" v-if="showLinks">
    <li class="page-item" :class="{ disabled: !links?.hasPrevPage }">
      <button class="page-link" @click="changePage(links.prevPage)">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>

    <li
      class="page-item"
      v-for="page in links?.totalPages"
      :key="page"
      :class="{ active: links?.page == page }"
    >
      <button class="page-link" @click="changePage(page)">{{ page }}</button>
    </li>

    <li class="page-item" :class="{ disabled: !links?.hasNextPage }">
      <button class="page-link" @click="changePage(links?.nextPage)">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</template>
