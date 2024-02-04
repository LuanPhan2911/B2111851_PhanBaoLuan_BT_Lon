<script>
import { computed, onMounted, ref, watch } from "vue";
import UserSerVice from "@/services/UserService";
import { asset } from "@/helpers";
import defaultAvatar from "@/assets/images/default_avatar.png";
import moment from "moment";
import Navbar from "../../components/layouts/admin/Navbar.vue";
import { useRoute } from "vue-router";
import Paginator from "../../components/layouts/Paginator.vue";
export default {
  components: { Navbar, Paginator },
  name: "adminUserView",
  setup() {
    const userPaginate = ref({
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
    watch(currentPage, async (newPage) => {
      try {
        let data = await UserSerVice.getAll({
          query: {
            page: newPage,
          },
        });
        if (data) {
          userPaginate.value = data;
        }
      } catch (error) {}
    });
    onMounted(async () => {
      document.title = "Admin - Manage User";
      try {
        let data = await UserSerVice.getAll({
          query: {
            page: currentPage.value,
          },
        });
        if (data) {
          userPaginate.value = data;
        }
      } catch (error) {}
    });
    const users = computed(() => {
      if (userPaginate.value?.docs?.length > 0) {
        return userPaginate.value?.docs.map((item) => {
          return {
            ...item,
            avatar: item.avatar ? asset(item.avatar) : defaultAvatar,
            createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
            gender: item.gender === 1 ? "Male" : "Female",
          };
        });
      }
      return [];
    });
    const paginate = computed(() => {
      let { page, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } =
        userPaginate.value;
      return {
        page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
      };
    });

    return { users, paginate };
  },
};
</script>
<template>
  <div>
    <table class="table table-hover caption-top shadow table-responsive-lg">
      <caption>
        <h3 class="text-primary">All Users</h3>
      </caption>
      <thead>
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
        <tr class="" v-for="user in users" :key="user._id">
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
            <button class="btn btn-warning">
              <i class="bi bi-lock-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <paginator :paginate="paginate" />
  </div>
</template>
<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
