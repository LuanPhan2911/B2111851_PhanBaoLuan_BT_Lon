<script>
import { reactive, ref } from "vue";
import UserService from "@/services/UserService";
import { filterObjectByKeys } from "@/helpers";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useUserSchema } from "@/hooks/useUserSchema";
import SelectImage from "../components/layouts/SelectImage.vue";
import defaultAvatar from "@/assets/images/default_avatar.png";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    SelectImage,
  },
  name: "UpdateProfileView",
  setup() {
    const user = {
      name: "",
      email: "",
      birthday: 2000,
      gender: 1,
      avatar: "",
      address: "",
      phone_number: "",
    };
    const state = reactive({
      user,
    });
    const imageUploaded = ref(null);
    const { getSchema } = useUserSchema();
    const userSchema = getSchema([
      "name",
      "birthday",
      "gender",
      "address",
      "phone_number",
    ]);
    return { state, userSchema, imageUploaded, defaultAvatar };
  },

  async created() {
    document.title = "Profile";
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
    async onUpdateUser() {
      try {
        await UserService.update(this.state.user);

        if (this.imageUploaded) {
          let formData = new FormData();
          formData.append("avatar", this.imageUploaded);
          await UserService.updateImage(formData);
        }
        this.$toast.success("Đã cập nhật tài khoản thành công");
      } catch (error) {}
    },
    getImage(file) {
      if (file) {
        this.imageUploaded = file;
      }
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="card shadow animate__animated animate__backInDown">
          <div class="card-header">
            <h3 class="text-center text-primary">Tài khoản</h3>
          </div>
          <div class="card-body">
            <Form @submit="onUpdateUser" :validation-schema="userSchema">
              <div class="row">
                <div class="col-lg-4">
                  <select-image
                    imgShape="rounded-circle"
                    :imgUrl="state.user.avatar"
                    @getImage="getImage"
                    :imgDefault="defaultAvatar"
                  />
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
                      <ErrorMessage name="name" class="text-danger" />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="birthday" class="col-sm-3 col-form-label"
                      >Năm sinh</label
                    >
                    <div class="col-sm-9">
                      <Field
                        v-model="state.user.birthday"
                        name="birthday"
                        type="number"
                        class="form-control"
                      ></Field>
                      <ErrorMessage name="birthday" class="text-danger" />
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
                      <ErrorMessage name="gender" class="text-danger" />
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
                      <ErrorMessage name="phone_number" class="text-danger" />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="address" class="col-sm-3 col-form-label"
                      >Địa chỉ</label
                    >
                    <div class="col-sm-9">
                      <Field
                        as="textarea"
                        class="form-control"
                        name="address"
                        v-model="state.user.address"
                      ></Field>
                      <ErrorMessage name="address" class="text-danger" />
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="email" class="col-sm-3 col-form-label"
                      >Email</label
                    >
                    <div class="col-sm-9">
                      <input
                        class="form-control"
                        disabled
                        :value="state.user.email"
                      />
                      <ErrorMessage name="email" class="text-danger" />
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
<style>
.img-size {
  width: 150px;
  height: 150px;
  background-color: blueviolet;
}
</style>
