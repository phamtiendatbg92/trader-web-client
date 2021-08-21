<template>
  <v-row justify="center">
    <v-dialog v-model="dialogStatus.isShown" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
           {{ dialogStatus.title }}
        </v-card-title>
        <v-card-text>
          {{ dialogStatus.content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["dialogStatus"]),
  },
  methods: {
    ...mapActions(["closeDialog"]),
  },
};
</script>

<style>
</style>