<script>
import { asset } from "@/helpers";
import { computed } from "vue";
import defaultBook from "@/assets/images/default_book.png";
import moment from "moment";
export default {
  name: "BookRentDetail",
  props: ["rentBookDetail"],
  setup(props) {
    const rentBookDetail = computed(() => {
      let { book, user, createdAt, expire_at } = props.rentBookDetail;
      return {
        ...props.rentBookDetail,
        book: {
          ...book,
          image: book?.image ? asset(book.image) : defaultBook,
        },
        user: {
          ...user,
          gender: user?.gender === 1 ? "Male" : "Female",
        },
        createdAt: moment(createdAt).format("DD-MM-YYYY"),
        expire_at: moment(expire_at).format("DD-MM-YYYY"),
        toExpired: moment(expire_at).from(createdAt),
        hasExpire: moment(expire_at).isBefore(moment()),
        valid: moment(expire_at).isBefore(moment()) ? "expired" : "available",
      };
    });

    return { rentBookDetail };
  },
};
</script>
<template>
  <div class="col-12">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        class="form-control"
        name="name"
        type="text"
        id="name"
        disabled
        :value="rentBookDetail?.user?.name"
      />
    </div>
    <div class="row mb-3">
      <div class="col-lg-4">
        <label for="birthday" class="form-label">Birthday</label>
        <input
          name="birthday"
          type="text"
          class="form-control"
          disabled
          :value="rentBookDetail?.user?.birthday"
        />
      </div>
      <div class="col-lg-4">
        <label for="gender" class="form-label">Gender</label>
        <input
          id="gender"
          name="gender"
          class="form-control"
          type="text"
          disabled
          :value="rentBookDetail?.user?.gender"
        />
      </div>
      <div class="col-lg-4">
        <label for="phone_number" class="form-label">Phone Number</label>
        <input
          class="form-control"
          name="phone_number"
          type="text"
          disabled
          :value="rentBookDetail?.user?.phone_number"
        />
      </div>
    </div>
    <div class="mb-3">
      <label for="address" class="form-label">Address</label>
      <input
        as="textarea"
        class="form-control"
        name="address"
        disabled
        :value="rentBookDetail?.user?.address"
      />
    </div>
    <div class="mb-3">
      <label for="book" class="form-label">Book</label>
      <div class="row">
        <div class="col-lg-3">
          <img :src="rentBookDetail?.book?.image" alt="" class="image" />
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="book-name" class="form-label">BookName</label>
            <input
              class="form-control"
              name="book-name "
              type="text"
              disabled
              :value="rentBookDetail?.book?.name"
            />
          </div>
          <div class="mb-3">
            <label for="author-name" class="form-label">AuthorName</label>
            <input
              class="form-control"
              name="author-name "
              type="text"
              disabled
              :value="rentBookDetail?.book?.author_name"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="col-lg-4">
        <label for="remain_quantity" class="form-label">Remain Quantity</label>
        <input
          class="form-control bg-success-subtle fw-bold"
          name="remain_quantity"
          disabled
          :value="rentBookDetail?.book?.remain_quantity"
        />
      </div>
      <div class="col-lg-4">
        <label for="renting_quantity" class="form-label"
          >Renting Quantity</label
        >
        <input
          class="form-control bg-success-subtle fw-bold"
          name="renting_quantity"
          type="text"
          disabled
          :value="rentBookDetail?.quantity"
        />
      </div>
      <div class="col-lg-4">
        <label for="status" class="form-label">Status</label>
        <input
          class="form-control fw-bold text-capitalize"
          name="status"
          type="text"
          disabled
          :value="rentBookDetail?.status"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <div class="col-lg-4">
        <label for="createAt" class="form-label">CreatedAt</label>
        <input
          class="form-control"
          name="createAt"
          disabled
          :value="rentBookDetail?.createdAt"
        />
      </div>
      <div class="col-lg-4">
        <label for="expiredAt" class="form-label">ExpiredAt</label>
        <input
          class="form-control"
          name="expiredAt"
          type="text"
          disabled
          :value="rentBookDetail?.expire_at"
        />
      </div>
      <div class="col-lg-4" v-if="rentBookDetail?.status != 'completed'">
        <label for="valid" class="form-label">Valid</label>
        <input
          class="form-control text-capitalize fw-bold"
          :class="[
            rentBookDetail?.hasExpire
              ? 'bg-danger-subtle'
              : 'bg-success-subtle',
          ]"
          name="valid"
          type="text"
          disabled
          :value="rentBookDetail?.valid"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.image {
  height: 150px;
  width: 150px;
}
</style>
