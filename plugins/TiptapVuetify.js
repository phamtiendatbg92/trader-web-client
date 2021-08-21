import Vue from 'vue'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'

export default ({ app }) => {
  Vue.use(TiptapVuetifyPlugin, {
    vuetify: app.vuetify,
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'mdi'
  })
}

