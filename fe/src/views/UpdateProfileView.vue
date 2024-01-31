<script>
import { reactive } from "vue";
import UserService from "@/services/UserService";
import { filterObjectByKeys } from "@/helpers";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useUserSchema } from "@/hooks/useUserSchema";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  name: "UpdateProfileView",
  setup() {
    const user = {
      name: "",
      email: "",
      birthday: "",
      gender: 1,
      avatar: "",
      address: "",
      phone_number: "",
    };
    const state = reactive({
      user,
    });
    const { getSchema } = useUserSchema();
    const userSchema = getSchema(Object.keys(user));
    return { state, userSchema };
  },

  async created() {
    try {
      let data = await UserService.edit();

      if (data) {
        this.state.user = filterObjectByKeys(
          data,
          Object.keys(this.state.user)
        );
      }
    } catch (error) {}
  },
  methods: {
    onUpdateUser() {},
  },
};
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="card shadow">
          <div class="card-header">
            <h3 class="text-center text-primary">Hồ sơ</h3>
          </div>
          <div class="card-body">
            <Form @submit="onUpdateUser" :validation-schema="userSchema">
              <div class="row">
                <div class="col-lg-4">
                  <div class="mb-3">
                    <label
                      for="avatar"
                      class="d-flex justify-content-center mb-3 cursor-pointer"
                    >
                      <img
                        src=""
                        class="rounded-circle img-thumbnail user-avatar"
                      />
                    </label>
                    <div class="fst-italic fw-light text-center">
                      Nhấn vào ảnh trên để cập nhật ảnh đại diện
                    </div>
                    <input
                      class="form-control"
                      name="avatar"
                      type="file"
                      id="avatar"
                      accept="image/*"
                      hidden
                    />
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="mb-3 row">
                    <label for="name" class="col-sm-3 col-form-label"
                      >Tên</label
                    >
                    <div class="col-sm-9">
                      <Field
                        class="form-control"
                        name="name"
                        type="text"
                        id="name"
                        v-model="state.user.name"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="birthday" class="col-sm-3 col-form-label"
                      >Năm sinh</label
                    >
                    <div class="col-sm-9">
                      <Field
                        class="form-control"
                        name="birthday"
                        type="date"
                        v-model="state.user.birthday"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="gender" class="col-sm-3 col-form-label"
                      >Giới tính</label
                    >
                    <div class="col-sm-9">
                      <select
                        id="gender"
                        name="gender"
                        class="form-select"
                        v-model="state.user.gender"
                      >
                        <option :value="1">Nam</option>
                        <option :value="0">Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="phone_number" class="col-sm-3 col-form-label"
                      >Số điện thoại</label
                    >
                    <div class="col-sm-9">
                      <Field
                        class="form-control"
                        name="phone_number"
                        v-model="state.user.phone_number"
                      />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="address" class="col-sm-3 col-form-label"
                      >Địa chỉ</label
                    >
                    <div class="col-sm-9">
                      <textarea
                        class="form-control"
                        name="address"
                        v-model="state.user.address"
                      ></textarea>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="email" class="col-sm-3 col-form-label"
                      >Email</label
                    >
                    <div class="col-sm-9">
                      <input
                        class="form-control"
                        id="email"
                        disabled
                        :value="state.user.email"
                      />
                    </div>
                  </div>
                  <div class="mb-3 d-flex justify-content-center">
                    <button class="btn btn-primary px-5 d-block" type="submit">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.user-avatar {
  width: 200px;
  height: 200px;
  background-color: blueviolet;
}
</style>
