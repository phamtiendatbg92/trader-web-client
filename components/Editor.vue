<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <div>
          <h1>Title</h1>
          <v-text-field
            :value="currentTut.Title"
            @input="updateTitle"
            ref="currentTitle"
          ></v-text-field>
          <!-- Use the component in the right place of the template -->
          <h1>Content bài viết</h1>
          <tiptap-vuetify
            :value="currentTut.Content"
            @input="updateContent"
            ref="currentContent"
            :extensions="extensions"
            :toolbar-attributes="{ color: 'red' }"
          />
        </div>
      </v-col>
      <v-col cols="2">
        <v-select
          ref="currentTag"
          :value="currentTut.Tag"
          @change="updateTag"
          :items="totalTags"
          clearable
          label="Select Hash Tag"
          chips
          multiple
        ></v-select>

        <div class="mt-10">
          <h2>Add new Tag</h2>
          <v-text-field v-model="newTag"></v-text-field>
          <v-btn @click="addTag">Add</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="submitFile">submit</v-btn>
        <v-btn @click="test">test</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from "tiptap-vuetify";
import { mapGetters, mapActions } from "vuex";
export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
      Image,
    ],
    newTutorial: {
      title: "",
      content: "",
      tags: [],
    },
    totalTags: [],
    newTag: "",
  }),
  props: {
    isUpload: Boolean,
  },
  computed: {
    ...mapGetters("tutorialStore", ["currentTut"]),
  },
  methods: {
    ...mapActions("tutorialStore", ["uploadNewTutorial", "updateTutorial", "clearCurrentTut"]),
    ...mapActions(["showDialog", "showWaitingDialog"]),
    test(){
      this.clearCurrentTut();
    },
    updateTitle(e) {
      this.$store.commit("tutorialStore/updateTitle", e);
    },
    updateContent(e) {
      this.$store.commit("tutorialStore/updateContent", e);
    },
    updateTag(e) {
      this.$store.commit("tutorialStore/updateTag", e);
    },
    ValidateAllFields() {
      var title = this.currentTut.Title.trim();
      title = title.replace(/ +/g, " ");
      // apply to store
      this.updateTitle(title);
      if (title === "") {
        this.showDialog({
          title: "Invalid title",
          content: "Vui lòng nhập title !",
        });
        return false;
      }
      return true;
    },
    submitFile() {
      this.showWaitingDialog(true);
      if (this.ValidateAllFields()) {
        if (this.isUpload) {
          this.uploadNewTutorial();
        } else {
          this.updateTutorial();
        }
        
      }
    },
    addTag: function () {
      if (this.newTag != "") {
        if (!this.totalTags.includes(this.newTag)) {
          // add
          this.totalTags.push(this.newTag);
          this.newTag = "";
        } else {
          this.showDialog({
            title: "Error",
            content: "Tag existed.<br/>Please use another name.",
          });
        }
      }
    },
    getHashTags: function () {
      let self = this;
      this.$axios.$get("get-hashtag").then(function (data) {
        if (data != null) {
          self.totalTags = data.Tags;
        }
      });
    },
  },
  mounted: function () {
    this.getHashTags();
  },
};
</script>

<style scoped>
.ProseMirror {
  padding: 10px !important;
}
img{
  width: 100%;
}
</style>