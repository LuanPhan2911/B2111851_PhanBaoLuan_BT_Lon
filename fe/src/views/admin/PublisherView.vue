<script>
import PublisherService from "@/services/PublisherService";
import { onMounted, ref } from "vue";
import CreatePublishers from "../../components/admin/publishers/CreatePublishers.vue";
import TablePublishers from "../../components/admin/publishers/TablePublishers.vue";
export default {
  components: { CreatePublishers, TablePublishers },
  name: "adminPublisherView",
  setup() {
    const publishers = ref([]);
    onMounted(() => {
      document.title = "Admin - Manage Publisher";
      fetchPublishers();
    });
    const fetchPublishers = async () => {
      try {
        let data = await PublisherService.getAll();
        if (data) {
          publishers.value = data;
        }
      } catch (error) {}
    };
    const onUpdated = async () => {
      await fetchPublishers();
    };
    return { publishers, onUpdated };
  },
};
</script>
<template>
  <div>
    <div class="mb-3">
      <create-publishers @onCreated="onUpdated" />
      <table-publishers :publishers="publishers" @onDeleted="onUpdated" />
    </div>
  </div>
</template>
