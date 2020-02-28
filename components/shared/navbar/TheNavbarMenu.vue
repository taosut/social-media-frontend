<template>
  <v-menu :close-on-content-click="false" v-model="navMenu" left bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="hidden-md-and-up mx-1" :class="{ 'v-btn--active': navMenu }" v-on="on" icon>
        <v-icon>mdi-settings</v-icon>
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
      <v-list-item @click="changeNavbarMenu(false)" to="/upload">
        <v-list-item-icon>
          <v-icon>mdi-upload</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Upload</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="changeNavbarMenu(false)" to="/logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
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
        return this.$store.getters.navbarMenu
      },
      set(value) {
        this.$store.dispatch('changeNavbarMenu', value)
      }
    }
  },
  methods: {
    ...mapActions({
      changeNavbarMenu: 'changeNavbarMenu'
    })
  }
}
</script>

<style>
</style>