<script>
import { useUserSchema } from "@/hooks/useUserSchema";
import { onMounted, reactive } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "@/services/AuthService";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  name: "RegisterView",
  setup() {
    const { getSchema } = useUserSchema();
    const router = useRouter();
    const toast = useToast();
    const useSchema = getSchema([
      "name",
      "email",
      "password",
      "confirm_password",
    ]);
    const user = reactive({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    const onRegister = async () => {
      try {
        let data = await AuthService.register(user);
        if (data) {
          toast.success("Đăng ký thành công");
          router.push({
            name: "home",
          });
        }
      } catch (error) {}
    };
    onMounted(() => {
      document.title = "Register";
    });
    return { useSchema, user, onRegister };
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div
        class="col-lg-6 col-md-8 my-3 animate__animated animate__bounceInDown"
      >
        <div class="card shadow">
          <div class="card-header">
            <h3 class="text-center text-primary">Đăng ký</h3>
          </div>
          <div class="card-body">
            <Form @submit="onRegister" :validation-schema="useSchema">
              <div class="mb-3 row">
                <label for="name" class="col-sm-3 col-form-label"
                  >Tên đăng nhập</label
                >
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="name"
                    type="text"
                    id="name"
                    v-model="user.name"
                  />
                  <ErrorMessage name="name" class="text-danger" />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="email"
                    type="email"
                    id="email"
                    v-model="user.email"
                  />
                  <ErrorMessage name="email" class="text-danger" />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="password" class="col-sm-3 col-form-label"
                  >Mật khẩu</label
                >
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="password"
                    type="password"
                    v-model="user.password"
                  />
                  <ErrorMessage name="password" class="text-danger" />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="confirm_password" class="col-sm-3 col-form-label"
                  >Nhập lại mật khẩu</label
                >
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="confirm_password"
                    type="password"
                    v-model="user.confirm_password"
                  />
                  <ErrorMessage name="confirm_password" class="text-danger" />
                </div>
              </div>
              <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-primary px-5" type="submit">
                  Đăng ký
                </button>
              </div>
              <div class="mb-3">
                <p class="text-center">
                  Bạn đã có tài khoản?
                  <router-link
                    :to="{ name: 'login' }"
                    class="link-primary text-decoration-none"
                    >Đăng nhập
                  </router-link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
