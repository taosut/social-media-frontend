<template>
  <v-app-bar clipped-right height="64" app elevate-on-scroll>
    <v-spacer></v-spacer>
    <v-toolbar-title class="display-1 mx-1">LOGO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-if="$auth.loggedIn"
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
      v-if="$auth.loggedIn"
      :icon="$vuetify.breakpoint.mdAndDown"
      :nuxt="true"
      class="mx-1"
      depressed
      :to="`/${$auth.user.username}`"
      exact
    >
      <v-icon :left="!$vuetify.breakpoint.mdAndDown">mdi-account</v-icon>
      <span class="hidden-md-and-down">Profile</span>
    </v-btn>
    <v-badge
      v-if="$auth.loggedIn"
      class="hidden-md-and-up"
      :value="Boolean(getNumberOfAllNotifications)"
      :content="getNumberOfAllNotifications"
      overlap
      offset-y="20"
      offset-x="20"
      color="red"
    >
      <v-btn @click="changeChatDrawer(true)" class="mx-1 hidden-md-and-up" :icon="true" depressed>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-badge>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <navbar-search class="hidden-sm-and-down"></navbar-search>
    <v-spacer class="hidden-sm-and-down"></v-spacer>
    <v-btn
      v-if="!$auth.loggedIn"
      :nuxt="true"
      class="mx-1 hidden-sm-and-down"
      depressed
      to="/sign-in"
      exact
    >
      <v-icon left>mdi-login</v-icon>Sign In
    </v-btn>
    <v-btn
      v-if="!$auth.loggedIn"
      :nuxt="true"
      class="mx-1 hidden-sm-and-down"
      depressed
      to="/sign-up"
      exact
    >
      <v-icon left>mdi-account</v-icon>Sign Up
    </v-btn>
    <v-btn
      v-if="$auth.loggedIn"
      :nuxt="true"
      class="mx-1 hidden-sm-and-down"
      depressed
      to="/post/upload"
      exact
    >
      <v-icon left>mdi-upload</v-icon>Upload
    </v-btn>
    <v-btn v-if="$auth.loggedIn" @click="logout" class="mx-1 hidden-sm-and-down" depressed>
      <v-icon left>mdi-logout</v-icon>Logout
    </v-btn>
    <app-theme-switch class="hidden-sm-and-down"></app-theme-switch>
    <the-navbar-menu></the-navbar-menu>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import TheNavbarMenu from '@/components/shared/navbar/TheNavbarMenu'
import NavbarSearch from '@/components/shared/navbar/NavbarSearch'
import AppThemeSwitch from '@/components/shared/AppThemeSwitch'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TheNavbarMenu,
    NavbarSearch,
    AppThemeSwitch
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      isChatDrawer: 'isChatDrawer',
      getNumberOfAllNotifications: 'user/getNumberOfAllNotifications'
    })
  },
  methods: {
    ...mapActions({
      changeChatDrawer: 'changeChatDrawer',
      changeNavbarMenu: 'changeNavbarMenu',
      searchForPeople: 'searchForPeople',
      async logout() {
        await this.$auth.logout({
          data: { refreshToken: this.$auth.refreshToken.get() }
        })
      }
    })
  }
}
</script>

<style>
</style>