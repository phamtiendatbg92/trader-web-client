  <template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="isShownWaitingDlg" persistent max-width="290" light>
        <v-progress-circular indeterminate size="64" color="blue" />
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters(['isShownWaitingDlg']),
    }
};
</script>

<style>
</style>