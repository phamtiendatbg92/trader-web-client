<template>
  <v-card class="my-1">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title class="px-2 py-0">
          {{ name }}
        </v-card-title>
        <v-card-text class="pa-2" v-html="comment"> </v-card-text>
        <v-card-actions class="pa-0">
          <v-btn text color="primary" small @click="onClick">Reply</v-btn>
        </v-card-actions>
      </div>
      <v-btn icon @click="onDelete">
        <v-icon color="primary"> mdi-minus </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props: {
    id: Number,
    level: Number,
    parentId: Number,
    name: Number,
    comment: String,
  },
  methods: {
    ...mapActions("tutorialStore", ["deleteComment"]),
    onClick() {
      this.$emit("reply-click");
    },
    onDelete(){
      this.deleteComment({
        id: this.id,
        level: this.level,
        parentId: this.parentId,
      });
    }
  },
};
</script>

<style scoped>
</style>