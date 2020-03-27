<template>
  <v-dialog v-model="postPreviewDrawer" width="80%">
    <template v-slot:activator="{ on }">
      <v-btn
        :disabled="!Boolean(title) || !Boolean(description) || !Boolean(image) || loading"
        v-on="on"
        @click="postPreviewDrawer = true"
      >Post preview</v-btn>
    </template>
    <v-card>
      <v-btn @click="postPreviewDrawer = false" style="z-index: 1;" icon absolute top right>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-img v-if="image" :aspect-ratio="$vuetify.breakpoint.xsOnly ? 1 : 16/9" :src="image"></v-img>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="author.profileImage"></v-img>
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
    author: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      postPreviewDrawer: false
    }
  }
}
</script>

<style>
</style>