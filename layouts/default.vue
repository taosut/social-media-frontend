<template>
  <v-app :dark="false" :style="{height: '200vh'}">
    <v-app-bar app elevate-on-scroll>
      <v-spacer></v-spacer>
      <v-toolbar-title class="display-1 mx-1">LOGO</v-toolbar-title>
      <v-spacer v-if="$vuetify.breakpoint.mdAndDown"></v-spacer>
      <v-btn :nuxt="true" :icon="$vuetify.breakpoint.mdAndDown" class="mx-1" depressed to="/">
        <v-icon :left="!$vuetify.breakpoint.mdAndDown">mdi-home</v-icon>
        {{ $vuetify.breakpoint.mdAndDown ? '' : 'Home'}}
      </v-btn>
      <v-btn :nuxt="true" :icon="$vuetify.breakpoint.mdAndDown" class="mx-1" depressed to="/">
        <v-icon :left="!$vuetify.breakpoint.mdAndDown">mdi-account</v-icon>
        {{ $vuetify.breakpoint.mdAndDown ? '' : 'Profile'}}
      </v-btn>
      <v-spacer v-if="!$vuetify.breakpoint.mdAndDown"></v-spacer>
      <div v-if="!$vuetify.breakpoint.mdAndDown" class="d-flex align-center justify-center">
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
      <v-spacer v-if="!$vuetify.breakpoint.mdAndDown"></v-spacer>
      <v-btn v-if="!$vuetify.breakpoint.mdAndDown" :nuxt="true" class="mx-1" depressed to="/">
        <v-icon left>mdi-upload</v-icon>Upload
      </v-btn>
      <v-btn v-if="!$vuetify.breakpoint.mdAndDown" :nuxt="true" class="mx-1" depressed to="/">
        <v-icon left>mdi-logout</v-icon>Logout
      </v-btn>
      <!-- <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click=""
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>-->
      <v-menu>
        <template v-slot:activator="{ on }">
          <!-- <v-btn icon><v-icon>mdi</v-icon></v-btn> -->
        </template>
      </v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content></v-content>
    <v-footer app>
      <span>&copy; 2020 Marko Zlatar</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    search() {
      console.log('Search works')
    }
  }
}
</script>
