<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { computed, onMounted, reactive, watch } from "vue";
import { useRentingBookSchema } from "@/hooks/useRentingBookSchema";
import UserService from "@/services/UserService";
import { useToast } from "vue-toast-notification";
export default {
  components: { Field, Form, ErrorMessage },
  name: "BookRent",
  emits: ["onHide"],
  props: ["book"],
  setup(props, { emit }) {
    const book = computed(() => props.book);
    const toast = useToast();
    let rentingBook = reactive({
      user: {
        name: "",
        birthday: 2000,
        gender: 1,
        phone_number: "",
        address: "",
      },
      days_after_expire: 7,
      remain_quantity: 0,
      renting_quantity: 1,
      book: {},
    });
    const { rentingBookSchema } = useRentingBookSchema();
    watch(book, () => {
      if (book.value) {
        rentingBook.book = book.value;
      }
    });
    onMounted(() => {
      fetchUser();
    });
    const hideModal = () => emit("onHide");
    const fetchUser = async () => {
      try {
        let data = await UserService.edit();
        if (data) {
          rentingBook.user = data;
        }
      } catch (error) {}
    };

    async function onCreate() {
      try {
        let data = await UserService.rentBook({
          data: rentingBook,
        });
        if (data) {
          hideModal();
          toast.success("Đã đăng kí mượn thành công");
        }
      } catch (error) {}
    }

    return { rentingBook, rentingBookSchema, book, onCreate };
  },
};
</script>
<template>
  <Form @submit="onCreate" :validation-schema="rentingBookSchema">
    <div class="col-12">
      <div class="mb-3">
        <label for="name" class="form-label">Tên người mượn</label>
        <Field
          class="form-control"
          name="name"
          type="text"
          id="name"
          v-model="rentingBook.user.name"
        />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="row mb-3">
        <div class="col-lg-4">
          <label for="birthday" class="form-label">Năm sinh</label>
          <Field
            name="birthday"
            type="number"
            class="form-control"
            v-model="rentingBook.user.birthday"
          ></Field>
          <ErrorMessage name="birthday" class="text-danger" />
        </div>
        <div class="col-lg-4">
          <label for="gender" class="form-label">Giới tính</label>

          <select
            id="gender"
            name="gender"
            class="form-select"
            v-model="rentingBook.user.gender"
          >
            <option :value="1">Nam</option>
            <option :value="0">Nữ</option>
          </select>
          <ErrorMessage name="gender" class="text-danger" />
        </div>
        <div class="col-lg-4">
          <label for="phone_number" class="form-label">Số điện thoại</label>
          <Field
            class="form-control"
            name="phone_number"
            type="text"
            v-model="rentingBook.user.phone_number"
          />
          <ErrorMessage name="phone_number" class="text-danger" />
        </div>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ</label>
        <Field
          as="textarea"
          class="form-control"
          name="address"
          v-model="rentingBook.user.address"
        ></Field>
        <ErrorMessage name="address" class="text-danger" />
      </div>
      <div class="mb-3">
        <label for="book" class="form-label">Sách</label>
        <div class="text-primary fw-bold">{{ rentingBook.book?.name }}</div>
      </div>
      <div class="mb-3 row">
        <div class="col-lg-4">
          <label for="remain_quantity" class="form-label"
            >Số lượng còn lại</label
          >
          <Field
            class="form-control"
            name="remain_quantity"
            disabled
            :model-value="rentingBook?.book?.remain_quantity"
          />
        </div>
        <div class="col-lg-4">
          <label for="renting_quantity" class="form-label">Số lượng mượn</label>
          <Field
            class="form-control"
            name="renting_quantity"
            type="number"
            v-model="rentingBook.renting_quantity"
          />
          <ErrorMessage name="renting_quantity" class="text-danger" />
        </div>
        <div class="col-lg-4">
          <label for="days_after_expire" class="form-label">Số ngày mượn</label>
          <Field
            class="form-control"
            name="days_after_expire"
            type="number"
            v-model="rentingBook.days_after_expire"
          />
          <ErrorMessage name="days_after_expire" class="text-danger" />
        </div>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Mượn</button>
  </Form>
</template>
