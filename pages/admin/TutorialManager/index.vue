<template>
  <div>
    <v-row>
      <v-col>
        <v-btn router :to="'TutorialManager/UploadTutorial'">Add New Post</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>Tutorial list</h1>
        <v-list>
          <v-list-item
            v-for="(item, i) in tutorialList"
            :key="i"
            router
            :to="'TutorialManager/' + item.Url"
            exact
          >
            <v-list-item-action>
              <v-btn @click.prevent="deleteItem(item.Id)">Delete</v-btn>
            </v-list-item-action>
            <v-list-item-title v-text="item.Title" />
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "admin-layout",
  computed: {
    ...mapGetters("tutorialStore", ["tutorialList"]),
  },
  methods: {
    ...mapActions("tutorialStore", ["getListTutorial", "deleteTutorial"]),
    deleteItem(id){
      this.deleteTutorial(id);
    }
  },
  mounted: function () {
    this.getListTutorial();
  },
};
</script>

<style>
</style>