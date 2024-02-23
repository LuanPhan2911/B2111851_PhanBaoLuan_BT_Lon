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
  <div class="position-relative p-3 mb-2 border-bottom">
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
            <div>
              <i class="bi bi-clock"></i
              ><span class="mx-2">{{ comment.createdAt }}</span>
            </div>
          </div>
          <div
            class="mt-2"
            style="min-height: 50px"
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
  width: 50px;
  height: 50px;
}
</style>
