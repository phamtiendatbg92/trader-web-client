<template>
  <div class="mt-3">
    <div class="commentDiv test rounded">
      <div contenteditable="true" class="content" ref="commentRef"></div>
      <v-btn icon @click="submit">
        <v-icon color="primary"> mdi-plus </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit('submit-comment', this.$refs.commentRef.innerHTML)
    },
  },
};
</script>

<style scoped>
.commentDiv {
  display: flex;
  padding-left: 5px;
}
.content {
  width: 100%;
  outline: 0px solid transparent;
  min-height: 30px;
  line-height: 30px;
}
</style>