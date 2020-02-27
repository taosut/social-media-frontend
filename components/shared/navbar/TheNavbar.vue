<template>
  <v-app-bar clipped-right height="64" app elevate-on-scroll>
    <v-spacer></v-spacer>
    <v-toolbar-title class="display-1 mx-1">LOGO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :icon="$vuetify.breakpoint.mdAndDown" :nuxt="true" class="mx-1" depressed to="/" exact>
      <v-icon :left="!$vuetify.breakpoint.mdAndDown">mdi-home</v-icon>
      <span class="hidden-md-and-down">Home</span>
    </v-btn>
    <v-btn
      :icon="$vuetify.breakpoint.mdAndDown"
      :nuxt="true"
      class="mx-1"
      depressed
      to="/profile"
      exact
    >
      <v-icon :left="!$vuetify.breakpoint.mdAndDown">mdi-account</v-icon>
      <span class="hidden-md-and-down">Profile</span>
    </v-btn>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-text-field
      class="hidden-sm-and-down"
      @keypress.enter="search"
      solo
      dense
      clearable
      hide-details
      label="Search people..."
      append-icon="mdi-magnify"
      rounded
    ></v-text-field>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn :nuxt="true" class="mx-1 hidden-sm-and-down" depressed to="/upload" exact>
      <v-icon left>mdi-upload</v-icon>Upload
    </v-btn>
    <v-btn :nuxt="true" class="mx-1 hidden-sm-and-down" depressed to="/logout" exact>
      <v-icon left>mdi-logout</v-icon>Logout
    </v-btn>
    <v-switch
      v-model="$vuetify.theme.dark"
      class="hidden-sm-and-down"
      :hide-details="true"
      label="Dark Theme"
    ></v-switch>
    <v-menu :close-on-content-click="false" v-model="navMenu" left bottom offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="hidden-md-and-up" :class="{ 'v-btn--active': navMenu }" icon v-on="on">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </template>
      <v-list class="hidden-md-and-up">
        <v-list-item>
          <v-switch v-model="$vuetify.theme.dark" label="Dark Theme"></v-switch>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              @keypress.enter="search"
              solo
              dense
              clearable
              hide-details
              label="Search people..."
              append-icon="mdi-magnify"
              rounded
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openDrawerCloseMenu">
          <v-list-item-icon>
            <v-icon>mdi-wechat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navMenu=false" to="/upload">
          <v-list-item-icon>
            <v-icon>mdi-upload</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Upload</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navMenu=false" to="/logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      navMenu: false
    }
  },
  computed: {
    ...mapGetters({
      drawer: 'drawer'
    })
  },
  methods: {
    ...mapActions({
      changeDrawer: 'changeDrawer'
    }),
    search() {
      this.navMenu = false
      console.log('Search works')
    },
    openDrawerCloseMenu() {
      this.navMenu = false
      this.changeDrawer(true)
    }
  }
}
</script>

<style>
</style>