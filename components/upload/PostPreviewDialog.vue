<template>
  <v-dialog width="80%">
    <template v-slot:activator="{ on }">
      <v-btn
        :disabled="!Boolean(title) || !Boolean(description) || !Boolean(image)"
        v-on="on"
      >Post preview</v-btn>
    </template>
    <v-card>
      <v-img
        :aspect-ratio="$vuetify.breakpoint.xsOnly ? 1 : 16/9"
        :src="image"
        class="cursor-pointer"
      ></v-img>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="/avatar.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>by {{ author.username }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>{{ description }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    // author avatar/profile image, author username in this obj
    author: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>