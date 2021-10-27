<template>
  <div>
    <v-col>
      <h1>Upload New Tutorial</h1>
    </v-col>
    <Editor :isUpload="true" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "admin-layout",
  methods: {
    ...mapActions("tutorialStore", ["clearCurrentTut"]),
  },
  mounted: function () {
    this.clearCurrentTut();
  },
};
</script>

<style>
</style>