<template>
  <div class="content-container">
    <v-card>
      <v-card-title>{{ currentTut.title }}</v-card-title>
      <v-card-text>
        <div v-html="currentTut.content" class="my-5" />
      </v-card-text>
      <v-chip
        class="ma-2"
        color="pink"
        label
        text-color="white"
        v-for="(item, index) in currentTut.tag"
        :key="index"
      >
        <v-icon left>mdi-label</v-icon>
        {{ item }}
      </v-chip>
    </v-card>
    <Comment :id="currentTut.id" class="comment-container" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  head() {
    return {
      title: this.currentTut.title,
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content:this.currentTut.description
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.currentTut.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.currentTut.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.currentTut.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.currentTut.description
        },
      ]
    }
  },
  computed: {
    ...mapGetters("tutorialStore", ["currentTut", "commentList"]),
  },
  methods: {
    ...mapActions("tutorialStore", [
      "getDetailedTut",
      "pushComment",
      "pushReply",
    ]),
  },
  mounted: function () {
    this.getDetailedTut(this.$route.params.tutorialUrl);
  },
};
</script>

<style scoped>
.content-container >>> img {
  width: 100%;
}
.comment-container {
  margin-top: 10px;
}
