<template>
  <v-card class="mb-5">
    <v-img :aspect-ratio="$vuetify.breakpoint.xsOnly ? 1 : 16/9" src="/feed-img.jpg"></v-img>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="/avatar.png"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">This is headling</v-list-item-title>
        <v-list-item-subtitle>by First Last</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>This is my super cool text for dummy feed card that i going to see every time when i open this project for long time...</v-card-text>
    <v-card-actions>
      <v-btn text>Read more</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>

<style>
</style>