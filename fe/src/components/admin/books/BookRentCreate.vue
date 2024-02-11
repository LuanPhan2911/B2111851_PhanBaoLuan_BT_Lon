<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted, ref } from "vue";
import { useRentingBookSchema } from "@/hooks/useRentingBookSchema";
import BookService from "@/services/BookService";
import AdminService from "@/services/AdminService";
export default {
  components: { Field, Form, ErrorMessage },
  name: "BookRentCreate",
  emits: ["hideModal"],
  setup(props, { emit }) {
    const selectBooks = ref([]);

    let rentingBook = ref({
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
      book: "",
    });
    const { rentingBookSchema } = useRentingBookSchema();
    onMounted(() => {
      fetchSelectBooks();
    });
    const hideModal = () => emit("hideModal");
    async function fetchSelectBooks() {
      try {
        let data = await BookService.getToSelect();
        if (data) {
          selectBooks.value = data;
        }
      } catch (error) {}
    }
    async function onCreate() {
      try {
        let data = await AdminService.createRentBook(rentingBook.value);
        if (data) {
          hideModal();
          await fetchSelectBooks();
          rentingBook.value = {
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
            book: "",
          };
        }
      } catch (error) {}
    }

    return { rentingBook, rentingBookSchema, selectBooks, onCreate };
  },
};
</script>
<template>
  <Form @submit="onCreate" :validation-schema="rentingBookSchema">
    <div class="col-12">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
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
          <label for="birthday" class="form-label">Birthday</label>
          <Field
            name="birthday"
            type="number"
            class="form-control"
            v-model="rentingBook.user.birthday"
          ></Field>
          <ErrorMessage name="birthday" class="text-danger" />
        </div>
        <div class="col-lg-4">
          <label for="gender" class="form-label">Gender</label>

          <select
            id="gender"
            name="gender"
            class="form-select"
            v-model="rentingBook.user.gender"
          >
            <option :value="1">Male</option>
            <option :value="0">Female</option>
          </select>
          <ErrorMessage name="gender" class="text-danger" />
        </div>
        <div class="col-lg-4">
          <label for="phone_number" class="form-label">Phone Number</label>
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
        <label for="address" class="form-label">Address</label>
        <Field
          as="textarea"
          class="form-control"
          name="address"
          v-model="rentingBook.user.address"
        ></Field>
        <ErrorMessage name="address" class="text-danger" />
      </div>
      <div class="mb-3">
        <label for="book" class="form-label">Book</label>
        <v-select
          :options="selectBooks"
          label="name"
          v-model="rentingBook.book"
          placeholder="Books"
        ></v-select>
      </div>
      <div class="mb-3 row">
        <div class="col-lg-4">
          <label for="remain_quantity" class="form-label"
            >Remain Quantity</label
          >
          <Field
            class="form-control"
            name="remain_quantity"
            disabled
            :model-value="rentingBook?.book?.remain_quantity"
          />
        </div>
        <div class="col-lg-4">
          <label for="renting_quantity" class="form-label"
            >Renting Quantity</label
          >
          <Field
            class="form-control"
            name="renting_quantity"
            type="number"
            v-model="rentingBook.renting_quantity"
          />
          <ErrorMessage name="renting_quantity" class="text-danger" />
        </div>
        <div class="col-lg-4">
          <label for="days_after_expire" class="form-label">Days Expired</label>
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
    <button class="btn btn-primary" type="submit">Create</button>
  </Form>
</template>
