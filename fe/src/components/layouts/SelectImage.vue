<script>
import { computed, ref } from "vue";
import { asset } from "@/helpers";

export default {
  emits: ["getImage"],
  props: ["imgShape", "imgUrl", "imgDefault"],
  setup(props, { emit }) {
    const imgElement = ref(null);
    const previewUrl = ref(null);
    const imageUrl = computed(() => {
      return props.imgUrl ? asset(props.imgUrl) : props.imgDefault;
    });
    const previewImage = (event) => {
      let file = event?.target?.files[0];
      emit("getImage", file);
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
      }
      previewUrl.value = URL.createObjectURL(file);
      imgElement.value.src = previewUrl.value;
    };
    return { imageUrl, previewUrl, imgElement, previewImage };
  },
};
</script>
<template>
  <div class="mb-3">
    <label
      for="avatar"
      class="d-flex justify-content-center mb-3 cursor-pointer"
    >
      <img
        :src="imageUrl"
        class="img-size"
        :class="imgShape"
        ref="imgElement"
      />
    </label>
    <div class="fst-italic fw-light text-center">
      Nhấn vào ảnh trên để cập nhật ảnh
    </div>
    <input
      class="form-control"
      name="avatar"
      type="file"
      id="avatar"
      accept="image/*"
      hidden
      @change="previewImage"
    />
  </div>
</template>
