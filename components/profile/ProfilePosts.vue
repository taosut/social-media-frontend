<template>
  <v-row>
    <v-col cols="10" lg="9" xl="8" class="mx-auto px-6">
      <v-divider></v-divider>
    </v-col>
    <v-tabs centered v-model="tab">
      <v-tab>
        <v-icon left>mdi-grid</v-icon>POSTS
      </v-tab>
    </v-tabs>
    <v-tabs-items class="mx-auto full-width" v-model="tab">
      <!-- POSTS -->
      <v-tab-item>
        <v-col cols="12" sm="10" lg="9" xl="8" class="mx-auto d-flex flex-wrap">
          <h3 class="text-center mx-auto" v-if="!posts.length">User has no posts</h3>
          <v-col
            v-else
            v-for="post in posts"
            :key="post._id"
            class="d-flex child-flex"
            cols="12"
            sm="6"
            md="4"
            xl="3"
          >
            <profile-posts-post :post="post"></profile-posts-post>
          </v-col>
        </v-col>
      </v-tab-item>
    </v-tabs-items>
  </v-row>
</template>

<script>
import ProfilePostsPost from '@/components/profile/ProfilePostsPost'

export default {
  components: {
    ProfilePostsPost
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    taggedPosts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tab: 0
    }
  }
}
</script>

<style>
</style>