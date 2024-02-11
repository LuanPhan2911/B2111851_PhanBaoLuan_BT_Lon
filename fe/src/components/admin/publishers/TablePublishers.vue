<script>
import { computed } from "vue";
import PublisherService from "@/services/PublisherService";
export default {
  name: "TablePublishers",
  props: ["publishers"],
  emit: ["onDeleted"],
  setup(props, { emit }) {
    const publishers = computed(() => props.publishers);
    const onDelete = async (_id) => {
      if (!confirm("Do you want to delete publisher?")) {
        return;
      }

      try {
        let data = await PublisherService.delete({
          _id,
        });
        if (data) {
          emit("onDeleted");
        }
      } catch (error) {}
    };
    return { publishers, onDelete };
  },
};
</script>
<template>
  <div class="row">
    <div class="col-lg-10">
      <table className="table table-bordered table-striped table-hover">
        <thead class="table-primary">
          <tr>
            <th>#</th>

            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(each, index) in publishers" :key="each._id">
            <td>{{ index + 1 }}</td>

            <td>{{ each.name }}</td>
            <td>{{ each.slug }}</td>
            <td>
              <button className="btn btn-danger" @click="onDelete(each._id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
