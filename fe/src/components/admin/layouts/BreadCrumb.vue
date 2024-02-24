<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "breadCrumb",
  setup() {
    const route = useRoute();
    const breadcrumbs = computed(() => {
      const fullPath = route.path;
      const paths = fullPath.split("/").slice(1);
      return paths.map((item, index) => {
        return {
          title: item,
          path: `/${paths.slice(0, index + 1).join("/")}`,
          query: route.query,
        };
      });
    });
    return { breadcrumbs };
  },
};
</script>
<template>
  <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.title"
      >
        <router-link
          :to="{
            path: breadcrumb.path,
            query: {
              ...breadcrumb.query,
            },
          }"
          class="text-capitalize link-primary"
          >{{ breadcrumb.title }}</router-link
        >
      </li>
    </ol>
  </nav>
</template>
