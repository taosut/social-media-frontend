<template>
  <v-menu :close-on-content-click="false" v-model="navMenu" left bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="hidden-md-and-up mx-1" :class="{ 'v-btn--active': navMenu }" v-on="on" icon>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </template>
    <v-list class="hidden-md-and-up">
      <v-list-item>
        <v-switch v-model="$vuetify.theme.dark" label="Dark Theme"></v-switch>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <navbar-search></navbar-search>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.loggedIn" @click="changeNavbarMenu(false)" to="/post/upload">
        <v-list-item-icon>
          <v-icon>mdi-upload</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Upload</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="$auth.loggedIn" @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="!$auth.loggedIn" to="/sign-in">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sign In</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="!$auth.loggedIn" to="/sign-up">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import NavbarSearch from '@/components/shared/navbar/NavbarSearch'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    NavbarSearch
  },
  computed: {
    ...mapGetters({}),
    navMenu: {
      get() {
        return this.$store.getters.isNavbarMenu
      },
      set(value) {
        this.$store.dispatch('changeNavbarMenu', value)
      }
    }
  },
  destroyed() {
    this.changeNavbarMenu(false)
  },
  methods: {
    ...mapActions({
      changeNavbarMenu: 'changeNavbarMenu',
      logout() {
        this.changeNavbarMenu(false)
        this.$auth.logout()
      }
    })
  }
}
</script>

<style>
</style>