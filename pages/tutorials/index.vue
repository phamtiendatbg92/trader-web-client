<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(item, i) in tutorialList"
        :key="i"
        :to="'tutorials/' + item.url"
        router
        exact
      >
        <v-list-item-title v-text="item.title" />
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("tutorialStore", ["tutorialList"]),
  },
  methods: {
    ...mapActions("tutorialStore", ["getListTutorial"]),
  },
  mounted: function () {
    this.getListTutorial();
  },
};
</script>

<style>
</style>