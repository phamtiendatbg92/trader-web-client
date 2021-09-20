<template>
  <div>
    <v-col>
      <h1>Update Tutorial</h1>
    </v-col>

    <Editor :isUpload="false" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "admin-layout",
  methods: {
    ...mapActions("tutorialStore", ["getDetailedTut"]),
  },
  mounted: function () {
    this.getDetailedTut(this.$route.params.tutEdit);
  },
};
</script>

<style>
</style>