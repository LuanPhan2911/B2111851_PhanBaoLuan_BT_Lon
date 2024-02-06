<script>
import { computed, onMounted } from "vue";
import UserSerVice from "@/services/UserService";
import { asset } from "@/helpers";
import defaultAvatar from "@/assets/images/default_avatar.png";
import moment from "moment";
import Navbar from "../../components/layouts/admin/Navbar.vue";
import Paginator from "../../components/layouts/Paginator.vue";
import { usePaginator } from "@/hooks/usePaginator";
import TableUsers from "../../components/layouts/admin/users/TableUsers.vue";
export default {
  components: { Navbar, Paginator, TableUsers },
  name: "adminUserView",
  setup() {
    const { paginator, currentPage, getPagination } = usePaginator({
      fetchData: fetchUsers,
    });

    const users = computed(() => {
      return paginator.value?.docs?.map((item) => {
        return {
          ...item,
          avatar: item.avatar ? asset(item.avatar) : defaultAvatar,
          createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
          gender: item.gender === 1 ? "Male" : "Female",
          deletedAt: item.deletedAt ? true : false,
        };
      });
    });
    const pagination = computed(() => getPagination(paginator.value));
    onMounted(async () => {
      document.title = "Admin - Manage User";
    });
    async function fetchUsers(query) {
      try {
        let data = await UserSerVice.getAll({
          query,
        });
        return data;
      } catch (error) {}
    }
    async function onLockUser({ status, _id }) {
      if (confirm("Do you want to execute this action?")) {
        try {
          let res = await UserSerVice.updateLockUser({
            _id,
            data: {
              status,
            },
          });

          if (res) {
            await fetchUsers({ page: currentPage.value });
          }
        } catch (error) {}
      }
    }
    return { users, pagination, onLockUser };
  },
};
</script>
<template>
  <div>
    <table-users :users="users" @onLock="onLockUser" />
    <paginator :paginate="pagination" />
  </div>
</template>
