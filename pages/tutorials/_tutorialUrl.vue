<template>
  <div class="main-tutorial">
    <span v-html="currentTut.content"/>

    <!-- <v-chip class="ma-2" color="pink" label text-color="white">
      <v-icon left v-for="(item, index) in currentTut.tags" :key="index">
        mdi-label
      </v-icon>
      {{ item }}
    </v-chip> -->
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
    ...mapGetters("tutorial-vuex", ["currentTut"]),
  },
  methods: {
    ...mapActions("tutorial-vuex", ["getDetailedTut"]),
  },
  mounted: function () {
    this.getDetailedTut(this.$route.params.tutorialUrl);
  },
};
</script>

<style>
</style>