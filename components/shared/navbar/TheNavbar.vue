<template>
  <v-app-bar clipped-right height="64" app elevate-on-scroll>
    <v-spacer></v-spacer>
    <v-toolbar-title class="display-1 mx-1">LOGO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      :icon="$vuetify.breakpoint.mdAndDown"
      class="hidden-sm-and-down mx-1"
      :nuxt="true"
      depressed
      to="/"
      exact
    >
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
    <v-badge
      class="hidden-md-and-up"
      :value="true"
      content="1"
      overlap
      offset-y="20"
      offset-x="20"
      color="red"
    >
      <v-btn @click="changeDrawer(true)" class="mx-1 hidden-md-and-up" :icon="true" depressed>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-badge>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <navbar-search class="hidden-sm-and-down"></navbar-search>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn :nuxt="true" class="mx-1 hidden-sm-and-down" depressed to="/upload" exact>
      <v-icon left>mdi-upload</v-icon>Upload
    </v-btn>
    <v-btn @click="logout" class="mx-1 hidden-sm-and-down" depressed>
      <v-icon left>mdi-logout</v-icon>Logout
    </v-btn>
    <v-switch
      v-model="$vuetify.theme.dark"
      class="hidden-sm-and-down"
      :hide-details="true"
      label="Dark Theme"
    ></v-switch>
    <the-navbar-menu></the-navbar-menu>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import TheNavbarMenu from '@/components/shared/navbar/TheNavbarMenu'
import NavbarSearch from '@/components/shared/navbar/NavbarSearch'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TheNavbarMenu,
    NavbarSearch
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      drawer: 'drawer'
    })
  },
  methods: {
    ...mapActions({
      changeDrawer: 'changeDrawer',
      changeNavbarMenu: 'changeNavbarMenu',
      searchForPeople: 'searchForPeople',
      async logout() {
        await this.$auth.logout()
      }
    })
  }
}
</script>

<style>
</style>