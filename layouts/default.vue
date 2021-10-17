<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="true"
      disable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        v-text="title"
        style="cursor: pointer"
        @click="$router.push('/')"
      />
      <v-spacer />
      <div v-if="$auth.loggedIn">
        logged in as: {{$auth.user.email}}
        <v-btn @click="$auth.logout()">logout</v-btn>
      </div>
      <div v-else>
        <v-btn to="login"> login </v-btn>
      </div>
      <v-switch
        v-model="$vuetify.theme.dark"
        inset
        label="Dark Mode"
        persistent-hint
      ></v-switch>
    </v-app-bar>
    <v-main>
      <v-container style="min-height: 770px">
        <v-row>
          <v-col cols="12" md="9">
            <Nuxt />
          </v-col>
          <v-col cols="12" md="3">
            <aside>
              <h1>Place <br> advertisement <br> here</h1>
            </aside>
          </v-col>
        </v-row>
      </v-container>
      <v-footer padless>
        <v-card class="flex" flat tile>
          <v-card-title class="teal">
            <strong>Get connected with us on social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>Trader House</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Tutorials",
          to: "/tutorials",
        },
      ],
      title: "Trader House",
    };
  },
  methods:{
    logout(){
      this.$axios.$post("")
    }
  }
};
</script>
