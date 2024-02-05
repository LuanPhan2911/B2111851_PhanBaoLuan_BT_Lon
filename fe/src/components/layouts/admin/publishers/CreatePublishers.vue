<script>
import _ from "lodash";
import { ref } from "vue";
import PublisherService from "@/services/PublisherService";
export default {
  name: "CreatePublishers",
  emit: ["onCreated"],
  setup(props, { emit }) {
    const publishers = ref("");
    const onCreate = async () => {
      let arr = publishers.value?.split("\n");
      arr = arr.filter((item) => {
        return !_.isEmpty(item);
      });
      arr = arr?.map((item) => {
        return {
          name: _.trim(item),
        };
      });
      if (_.isEmpty(arr)) {
        return;
      }
      try {
        let data = await PublisherService.createMany({
          publishers: arr,
        });
        if (data) {
          emit("onCreated");
          publishers.value = "";
        }
      } catch (error) {}
    };
    const onClear = () => {
      publishers.value = "";
    };
    return {
      publishers,
      onClear,
      onCreate,
    };
  },
};
</script>
<template>
  <div class="mb-3">
    <h4 class="text-primary">Manage Publishers</h4>
    <div class="row">
      <div className="col-lg-10">
        <textarea
          className="form-control"
          rows="5"
          placeholder="Enter your publisher. Use enter to separate"
          v-model="publishers"
        ></textarea>
        <div class="d-flex justify-content-end mt-3 gap-2">
          <button class="btn btn-danger" @click="onClear">Clear</button>
          <button class="btn btn-primary" @click="onCreate">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>
