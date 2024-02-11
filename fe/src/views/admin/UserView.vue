<script>
import { computed, onMounted } from "vue";
import UserSerVice from "@/services/UserService";
import { asset } from "@/helpers";
import defaultAvatar from "@/assets/images/default_avatar.png";
import moment from "moment";
import Paginator from "../../components/layouts/Paginator.vue";
import { usePaginator } from "@/hooks/usePaginator";
import TableUsers from "../../components/admin/users/TableUsers.vue";
export default {
  components: { Paginator, TableUsers },
  name: "adminUserView",
  setup() {
    const { docs, currentPage, links, setPaginator, changePage } = usePaginator(
      {
        fetchData: fetchUsers,
      }
    );

    const users = computed(() => {
      return docs.value.map((item) => {
        return {
          ...item,
          avatar: item.avatar ? asset(item.avatar) : defaultAvatar,
          createdAt: moment(item.createdAt).format("DD-MM-YYYY"),
          gender: item.gender === 1 ? "Male" : "Female",
          deletedAt: item.deletedAt ? true : false,
        };
      });
    });

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
          let data = await UserSerVice.updateLockUser({
            _id,
            data: {
              status,
            },
          });

          if (data) {
            let users = await fetchUsers({ page: currentPage.value });
            setPaginator(users);
          }
        } catch (error) {}
      }
    }
    return { users, links, onLockUser, changePage };
  },
};
</script>
<template>
  <div>
    <table-users :users="users" @onLock="onLockUser" />
    <paginator :links="links" @changePage="changePage" />
  </div>
</template>
