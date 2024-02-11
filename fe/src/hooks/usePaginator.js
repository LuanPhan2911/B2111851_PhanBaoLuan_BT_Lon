import { computed, onMounted, watch } from "vue";
import { ref } from "vue";

export function usePaginator({ fetchData, qs = {} }) {
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
  const query = ref(qs);
  const refresh = ref(false);
  const docs = computed(() => paginator.value.docs);
  const currentPage = computed(() => paginator.value.page);
  const links = computed(() => {
    let { page, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } =
      paginator.value;
    return {
      page,
      totalPages,
      hasNextPage,
      hasPrevPage,
      prevPage,
      nextPage,
    };
  });
  onMounted(async () => {
    let data = await fetchData({
      ...query.value,
      page: currentPage.value,
    });
    paginator.value = data;
  });
  watch(currentPage, async () => {
    let data = await fetchData({
      ...query.value,
      page: currentPage.value,
    });
    paginator.value = data;
  });
  watch(query, async () => {
    let data = await fetchData({
      ...query.value,
      page: currentPage.value,
    });
    paginator.value = data;
  });
  watch(refresh, async (isRefresh) => {
    if (isRefresh) {
      let data = await fetchData({
        ...query.value,
        page: currentPage.value,
      });
      paginator.value = data;
      refresh.value = false;
    }
  });

  const setPaginator = (data) => {
    paginator.value = data;
  };
  const changePage = (page) => {
    paginator.value.page = page;
  };
  const changeQuery = (newQuery) => {
    query.value = newQuery;
  };
  const onRefresh = () => {
    refresh.value = true;
  };
  return {
    paginator,
    currentPage,
    links,
    docs,
    changePage,
    setPaginator,
    changeQuery,
    onRefresh,
  };
}
