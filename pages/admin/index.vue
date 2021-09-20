<template>
  <div>
      <v-btn router :to="'/admin/TutorialManager'">Tutorial Manager</v-btn>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  layout:"admin-layout",
  computed: {
    ...mapGetters("tutorialStore", ["tutorialList"])
  },
  methods: {
    ...mapActions("tutorialStore", ["getListTutorial"]),
  },
  mounted: function () {
    this.getListTutorial();
  },
}
</script>

<style>

</style>