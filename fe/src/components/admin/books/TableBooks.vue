<script>
import { computed } from "vue";
import _ from "lodash";
export default {
  emits: ["onDelete"],
  props: ["books"],
  name: "TableBooks",
  setup(props, { emit }) {
    const books = computed(() => props.books);
    const onDelete = (_id) => emit("onDelete", _id);
    const hasBooks = computed(() => !_.isEmpty(props.books));
    return { books, hasBooks, onDelete };
  },
};
</script>
<template>
  <table
    className="table table-bordered table-striped table-hover"
    v-if="hasBooks"
  >
    <thead class="table-primary">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>AuthorName</th>
        <th>Publisher</th>
        <th>YearPublish</th>
        <th>TotalQuantity</th>
        <th>RemainQuantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in books" :key="item._id">
        <td class="d-flex justify-content-center">
          <img :src="item.image" class="avatar" />
        </td>
        <td class="col-3">{{ item.name }}</td>
        <td class="col-2">{{ item.author_name }}</td>
        <td class="col-3">{{ item?.publisher?.name }}</td>
        <td>{{ item?.year_publish }}</td>
        <td>{{ item.total_quantity }}</td>
        <td>{{ item.remain_quantity }}</td>
        <td class="col-2">
          <router-link
            :to="{
              name: 'adminBookEditView',
              params: {
                slug: item.slug,
              },
              query: {
                _id: item._id,
              },
            }"
            class="btn btn-warning m-2"
            >Edit</router-link
          >
          <button class="btn btn-danger" @click="onDelete(item._id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="container fs-3 text-primary d-flex justify-content-center align-items-center block text-capitalize"
    v-else
  >
    Empty Books
  </div>
</template>
<style>
.avatar {
  width: 50px;
  height: 70px;
}
</style>
