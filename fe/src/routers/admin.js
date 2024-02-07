import DashBoardView from "@/views/admin/DashboardView.vue";
import UserView from "@/views/admin/UserView.vue";
import GenreView from "@/views/admin/GenreView.vue";
import PublisherView from "@/views/admin/PublisherView.vue";
import BookView from "@/views/admin/BookView.vue";
import AdminLayout from "@/components/admin/layouts/AdminLayout.vue";
import BookLayout from "@/components/admin/books/BookLayout.vue";
import BookCreateView from "@/views/admin/books/BookCreateView.vue";
import BookEditView from "@/views/admin/books/BookEditView.vue";

export default [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "adminDashboardView",
        component: DashBoardView,
      },
      {
        path: "users",
        name: "adminUserView",
        component: UserView,
      },
      {
        path: "genres",
        name: "adminGenreView",
        component: GenreView,
      },
      {
        path: "publishers",
        name: "adminPublisherView",
        component: PublisherView,
      },
      {
        path: "books",
        component: BookLayout,
        children: [
          {
            path: "",
            name: "adminBookView",
            component: BookView,
          },
          {
            path: "create",
            name: "adminBookCreateView",
            component: BookCreateView,
          },
          {
            path: ":slug/edit",
            name: "adminBookEditView",
            component: BookEditView,
          },
        ],
      },
    ],
  },
];
