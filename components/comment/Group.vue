<template>
  <div>
    <CommentItem
      :id="commentObj.id"
      :name="commentObj.comment.userId"
      :comment="commentObj.comment.comment"
      :level="1"
      :parentId="0"
      @reply-click="replyBtnClick(commentObj.comment.id)"
    />
    <div
      class="pl-4"
      v-for="(value2, index2) in commentObj.replies"
      :key="index2"
    >
      <CommentItem
        :id="value2.id"
        :name="value2.userId"
        :comment="value2.comment"
        :level="2"
        :parentId="commentObj.id"
        @reply-click="replyBtnClick(commentObj.comment.id)"
      />
    </div>
    <CommentInput
      class="ml-4"
      v-if="replyEnabled"
      @submit-comment="submitReply"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      replyEnabled: false,
    };
  },
  props: {
    commentObj: Object,
  },
  methods: {
    ...mapActions("tutorialStore", ["pushReply"]),
    replyBtnClick() {
      this.replyEnabled = true;
    },
    submitReply(message) {
      this.pushReply({
        parentId: this.commentObj.id,
        comment: message,
      });
    },
  },
};
</script>

<style>
</style>