import { computed, onMounted, watch } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

export function usePaginator({ fetchData, query = {} }) {
  const paginator = ref({
    docs: [],
    limit: Number(),
    totalPages: Number(),
    page: 1,
    hasPrevPage: Boolean(),
    hasNextPage: Boolean(),
    prevPage: Number(),
    nextPage: Number(),
  });
  const route = useRoute();
  const currentPage = computed(() => route.query?.page || 1);
  const getPagination = (data) => {
    let { page, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } =
      data;
    return {
      page,
      totalPages,
      hasNextPage,
      hasPrevPage,
      prevPage,
      nextPage,
    };
  };
  onMounted(async () => {
    let data = await fetchData({
      ...query,
      page: currentPage.value,
    });
    paginator.value = data;
  });
  watch(currentPage, async (newPage) => {
    let data = await fetchData({
      ...query,
      page: currentPage.value,
    });
    paginator.value = data;
  });
  return { paginator, currentPage, getPagination };
}
