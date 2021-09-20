<template>
  <div class="content-container">
    <v-card>
      <v-card-title>
        {{ currentTut.Title }}
      </v-card-title>
      <v-card-text>
        <div v-html="currentTut.Content" class="my-5" />
      </v-card-text>
      <v-card-action>
        <v-chip
          class="ma-2"
          color="pink"
          label
          text-color="white"
          v-for="(item, index) in currentTut.Tag"
          :key="index"
        >
          <v-icon left> mdi-label </v-icon>
          {{ item }}
        </v-chip>
      </v-card-action>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      //content,
    };
  },
  computed: {
    ...mapGetters("tutorialStore", ["currentTut"]),
  },
  methods: {
    ...mapActions("tutorialStore", ["getDetailedTut"]),
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
</style>