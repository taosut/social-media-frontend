<template>
  <v-app-bar height="64" app elevate-on-scroll>
    <v-spacer></v-spacer>
    <v-toolbar-title class="display-1 mx-1">LOGO</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :nuxt="true" class="mx-1" depressed to="/" exact>
      <v-icon left>mdi-home</v-icon>Home
    </v-btn>
    <v-btn :nuxt="true" class="mx-1" depressed to="/profile" exact>
      <v-icon left>mdi-account</v-icon>Profile
    </v-btn>
    <v-spacer></v-spacer>
    <div class="d-flex align-center justify-center">
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
    </div>
    <v-spacer></v-spacer>
    <v-btn :nuxt="true" class="mx-1" depressed to="/upload" exact>
      <v-icon left>mdi-upload</v-icon>Upload
    </v-btn>
    <v-btn :nuxt="true" class="mx-1" depressed to="/logout" exact>
      <v-icon left>mdi-logout</v-icon>Logout
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    search() {
      console.log('Search works')
    }
  }
}
</script>

<style>
</style>