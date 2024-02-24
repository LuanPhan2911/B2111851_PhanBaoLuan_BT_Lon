<script>
import { computed, ref } from "vue";
import CommentCreate from "./CommentCreate.vue";
import { asset } from "@/helpers";
import defaultAvatar from "@/assets/images/default_avatar.png";
import moment from "moment";
import { useTruncate } from "@/hooks/useTruncate";
export default {
  components: { CommentCreate },
  name: "CommentBody",
  props: ["comment"],
  setup(props) {
    const user = computed(() => {
      let _u = props.comment?.user || {};
      return {
        ..._u,
        avatar: _u?.avatar ? asset(_u?.avatar) : defaultAvatar,
      };
    });
    const comment = computed(() => {
      return {
        ...props.comment,
        createdAt: moment(props.comment?.createdAt).fromNow(),
      };
    });
    const { textRef, truncated, showText, hasShowAction } = useTruncate();

    return {
      user,
      comment,
      textRef,
      truncated,
      showText,
      hasShowAction,
    };
  },
};
</script>
<template>
  <div class="position-relative mb-2 border-bottom py-2">
    <div class="row">
      <div class="col-auto">
        <img :src="user.avatar" class="avatar rounded-circle" />
      </div>
      <div class="col">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div class="fw-bold text-primary text-capitalize">
              {{ user.name }}
            </div>
            <div class="small">
              {{ comment.createdAt }}
            </div>
          </div>
          <div
            class="py-2"
            ref="textRef"
            :class="{
              'text-overflow-3-line': truncated,
            }"
          >
            {{ comment.message }}
          </div>
          <button
            class="read_more border-0 text-primary bg-transparent"
            @click="showText"
            v-if="hasShowAction"
          >
            Đọc tiếp
          </button>
          <slot name="send-replies"></slot>
        </div>
        <slot name="replies"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.avatar {
  width: 40px;
  height: 40px;
}
</style>
