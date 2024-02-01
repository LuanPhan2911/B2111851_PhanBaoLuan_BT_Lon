<script>
import { computed, ref } from "vue";
import { asset } from "@/helpers";
import defaultAvatar from "@/assets/images/default_avatar.png";
export default {
  emits: ["getImage"],
  props: ["imgShape", "imgUrl"],
  setup(props, { emit }) {
    const imgElement = ref(null);
    const previewUrl = ref(null);
    const imageUrl = computed(() => {
      return props.imgUrl ? asset(props.imgUrl) : defaultAvatar;
    });

    return { emit, imageUrl, previewUrl, imgElement };
  },
  methods: {
    previewImage(event) {
      let file = event?.target?.files[0];
      this.emit("getImage", file);
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.previewUrl = URL.createObjectURL(file);
      this.imgElement.src = this.previewUrl;
    },
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
