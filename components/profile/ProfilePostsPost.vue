<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card flat tile class="d-flex">
        <v-img :src="post.image.location" aspect-ratio="1" lazy-src="/placeholder.png">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-fade-transition>
          <v-overlay v-if="hover" absolute color="grey darken-3">
            <v-btn @click="$store.dispatch('feed/fetchPost', post._id)" color="white" large icon>
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn v-if="$auth.user.username === $route.params.profile" color="white" large icon>
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>
            <v-btn v-if="$auth.user.username === $route.params.profile" color="white" large icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>