<template>
  <v-row justify="center">
    <v-dialog persistent v-model="isShownWaitingDlg" max-width="290">
      <v-card class="vcard">
        <v-card-title>Please wait !!!</v-card-title>
        <v-card-text class="text-center">
          <v-progress-circular indeterminate size="64" color="blue" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isShownWaitingDlg"]),
  },
};
</script>
<style scoped>
.vcard {
  height: 150px;
}
.progress {
  margin: 20px 0px 0px 0px;
}
.message {
  font-size: 20px;
  margin: 0px 0px 10px 0px;
  padding: 10px 0px 0px 0px !important;
}
</style>
