<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <div>
          Title <v-text-field v-model="newTutorial.title"></v-text-field>
          <!-- Use the component in the right place of the template -->
          <h1>Content bài viết</h1>
          <tiptap-vuetify
            v-model="newTutorial.content"
            :extensions="extensions"
            :toolbar-attributes="{ color: 'red' }"
          />
        </div>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="newTutorial.tags"
          :items="totalTags"
          label="Select Hash Tag"
          chips
          multiple
        ></v-select>

        <h2>Add new Tag</h2>
        <v-text-field v-model="newTag"></v-text-field>
        <v-btn @click="addTag">Add</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="submitFile">submit</v-btn>
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
  methods: {
    ...mapActions(["showDialog"]),
    ValidateAllFields() {
      console.log(this.newTutorial.title);
      if (this.newTutorial.title == "") {
        this.showDialog({
          title: "Invalid title",
          content: "Vui lòng nhập title !",
        });
        return false;
      }
      return true;
    },
    submitFile() {
      if (!this.ValidateAllFields()) {
        console.log("validate failt");
        return;
      }
      this.$axios
        .$post("upload-new-post", this.newTutorial)
        .then(function () {
          console.log("SUCCESSS");
        })
        .catch(function () {
          console.log("ERROR");
        });
    },
    addTag: function () {
      if (this.newTag != "") {
        this.totalTags.push(this.newTag);
      }
    },
    getHashTags: function () {
      let self = this;
      this.$axios.$get("get-hashtag").then(function (data) {
        if (data != null) {
          self.totalTags = data.tags;
        }
      });
    },
  },
  mounted: function () {
    this.getHashTags();
  },
};
</script>

<style>
.ProseMirror {
  padding: 10px !important;
}
</style>