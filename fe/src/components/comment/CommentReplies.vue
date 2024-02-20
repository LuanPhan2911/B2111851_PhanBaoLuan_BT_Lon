<script>
import { computed } from "vue";
import CommentCreate from "./CommentCreate.vue";
import CommentBody from "./CommentBody.vue";
export default {
  components: { CommentCreate, CommentBody },
  name: "CommentReplies",
  props: ["parent", "commentable", "replies"],
  emits: ["sentReplies"],
  setup(props, { emit }) {
    const parent = computed(() => props.parent);
    const replies = computed(() => props.replies);
    const commentable = computed(() => props.commentable);

    const sentReplies = () => {
      emit("sentReplies");
    };
    return { parent, commentable, sentReplies, replies };
  },
};
</script>
<template>
  <div class="mb-3">
    <comment-create
      :parent="parent"
      :commentable="commentable"
      @sent="sentReplies"
    />
    <hr />
    <comment-body
      v-for="replie in replies"
      :key="replie._id"
      :comment="replie"
    />
  </div>
</template>
