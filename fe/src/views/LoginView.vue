<script>
import { useUserSchema } from "@/hooks/useUserSchema";
import AuthService from "@/services/AuthService";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import { useAuth } from "../hooks/useAuth";

export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const { isAuth } = useAuth();
    const { getSchema } = useUserSchema();
    const userSchema = getSchema(["email", "password"]);

    const user = reactive({
      email: "",
      password: "",
    });
    return { user, userSchema, isAuth };
  },
  methods: {
    async onLogin() {
      try {
        await AuthService.login(this.user);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-5 my-3">
        <div class="card shadow">
          <div class="card-header">
            <h3 class="text-center text-primary">Đăng nhập</h3>
          </div>
          <div class="card-body">
            <Form @submit="onLogin" :validation-schema="userSchema">
              <div class="mb-3 row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="email"
                    type="email"
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
              <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-primary px-5 d-block" type="submit">
                  Đăng nhập
                </button>
              </div>
              <div class="mb-3">
                <p class="text-center">
                  Bạn chưa có tài khoản?
                  <router-link
                    :to="{ name: 'register' }"
                    class="link-primary text-decoration-none"
                    >Đăng ký</router-link
                  >
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
