<template>
  <v-row>
    <v-col cols="10" lg="9" xl="8" class="mx-auto px-6">
      <v-divider></v-divider>
    </v-col>
    <v-tabs centered v-model="tab">
      <v-tab>
        <v-icon left>mdi-grid</v-icon>POSTS
      </v-tab>
      <v-tab>
        <v-icon left>mdi-account-box</v-icon>TAGGED
      </v-tab>
    </v-tabs>
    <v-tabs-items class="mx-auto full-width" v-model="tab">
      <v-tab-item>
        <v-col cols="12" sm="10" lg="9" xl="8" class="mx-auto d-flex flex-wrap">
          <h3 class="text-center mx-auto" v-if="!posts.length">User has no posts</h3>
          <v-col v-else v-for="post in posts" :key="post._id" class="d-flex child-flex" cols="4">
            <v-card flat tile class="d-flex">
              <v-img :src="post.image.location" aspect-ratio="1" lazy-src="/placeholder.png">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-col>
      </v-tab-item>
      <v-tab-item>
        <v-col cols="12" sm="10" lg="9" xl="8" class="mx-auto d-flex flex-wrap">
          <h3 class="text-center mx-auto" v-if="!taggedPosts.length">User has no tagged posts</h3>
          <v-col
            v-else
            v-for="taggedPost in taggedPosts"
            :key="taggedPost._id"
            class="d-flex child-flex"
            cols="4"
          >
            <v-card flat tile class="d-flex">
              <v-img :src="taggedPost.image.location" aspect-ratio="1" lazy-src="/placeholder.png">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
        </v-col>
      </v-tab-item>
    </v-tabs-items>
  </v-row>
</template>

<script>
export default {
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