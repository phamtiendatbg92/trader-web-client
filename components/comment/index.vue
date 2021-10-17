<template>
  <div>
    <CommentInput @submit-comment="submitComment" />
    <div v-for="(value, index) in commentList" :key="index">
      <CommentGroup :commentObj="value" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props:{
    id: Number
  },
  computed: {
    ...mapGetters("tutorialStore", ["commentList"]),
  },
  methods: {
    ...mapActions("tutorialStore", ["pushComment"]),
    submitComment(message) {
      const commentObj = {
        postId: this.id,
        comment: message,
      };
      this.pushComment(commentObj);
    },
  },
};
</script>

<style scoped>
</style>