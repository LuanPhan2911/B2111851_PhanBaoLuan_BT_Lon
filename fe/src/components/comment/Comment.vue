<script>
import { computed, ref } from "vue";
import CommentBody from "./CommentBody.vue";
import CommentReplies from "./CommentReplies.vue";
import CommentService from "@/services/CommentService";
export default {
  components: { CommentBody, CommentReplies },
  props: ["comment"],
  name: "Comment",
  setup(props) {
    const comment = computed(() => props.comment);
    const replies = ref([]);
    const fetchReplies = async () => {
      try {
        let data = await CommentService.getReplies({
          _id: comment.value._id,
        });
        if (data) {
          replies.value = data;
        }
      } catch (error) {}
    };
    const isShowReplies = ref(false);
    const showReplies = () => {
      isShowReplies.value = true;
      fetchReplies();
    };
    const hasNewReplies = () => {
      fetchReplies();
    };
    return { comment, isShowReplies, replies, hasNewReplies, showReplies };
  },
};
</script>
<template>
  <comment-body :comment="comment">
    <template #send-replies>
      <div class="d-flex justify-content-between">
        <div
          class="fw-bold pointer"
          v-if="comment?.replies_count > 0 && !isShowReplies"
          @click="showReplies()"
        >
          Xem {{ comment.replies_count }} trả lời
        </div>
        <div v-else></div>
        <button
          class="btn btn-primary"
          @click="isShowReplies = !isShowReplies"
          v-if="!isShowReplies"
        >
          <span><i class="bi bi-reply"></i></span>
        </button>
        <button
          class="btn btn-success"
          @click="isShowReplies = !isShowReplies"
          v-else
        >
          <span><i class="bi bi-x"></i></span>
        </button>
      </div>
    </template>
    <template #replies v-if="isShowReplies">
      <comment-replies
        :parent="{
          _id: comment._id,
        }"
        :commentable="{
          _id: comment.commentable_id,
          _type: comment.commentable_type,
        }"
        :replies="replies"
        @sentReplies="hasNewReplies"
      />
    </template>
  </comment-body>
</template>
