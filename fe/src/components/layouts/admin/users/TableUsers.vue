<script>
import { computed } from "vue";
export default {
  props: ["users"],
  emits: ["onLock"],
  name: "TableUser",
  setup(props, { emit }) {
    const users = computed(() => props.users);

    const onLock = (data) => emit("onLock", data);
    return { users, onLock };
  },
};
</script>
<template>
  <table class="table table-hover caption-top shadow table-responsive-lg">
    <caption>
      <h3 class="text-primary">All Users</h3>
    </caption>
    <thead class="table-info">
      <tr>
        <th>#</th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>BirthYear</th>
        <th>Gender</th>
        <th>CreateAt</th>
        <th><i class="bi bi-arrow-down-up"></i> Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        :class="{ 'table-warning': user.deletedAt }"
        v-for="user in users"
        :key="user._id"
      >
        <td>{{ user._id }}</td>
        <td>
          <img :src="user.avatar" alt="" class="avatar rounded-circle" />
        </td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.birthday }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.createdAt }}</td>
        <td>
          <button
            class="btn btn-success"
            v-if="user.deletedAt"
            @click="
              () =>
                onLock({
                  status: 'unlock',
                  _id: user._id,
                })
            "
          >
            <i class="bi bi-unlock"></i>
          </button>
          <button
            class="btn btn-warning"
            v-else
            @click="
              () =>
                onLock({
                  status: 'lock',
                  _id: user._id,
                })
            "
          >
            <i class="bi bi-lock-fill"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
