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
    ...mapGetters("tutorial-vuex", ["tutorialList"]),
  },
  methods: {
    ...mapActions("tutorial-vuex", ["getListTutorial"]),
  },
  mounted: function () {
    this.getListTutorial();
  },
};
</script>

<style>
</style>