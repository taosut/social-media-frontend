<template>
  <v-skeleton-loader
    class="mb-5"
    :loading="loading"
    type="image, list-item-avatar-three-line"
    height="500px"
  >
    <v-card class="mb-5">
      <v-img
        @click="$store.dispatch('feed/fetchPost', postId)"
        :aspect-ratio="16/9"
        :src="postImage"
        class="cursor-pointer"
      ></v-img>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="creatorProfileImage"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ postTitle }}</v-list-item-title>
          <v-list-item-subtitle>
            by
            <nuxt-link
              class="text-decoration-none"
              :to="`/${creatorUsername}`"
            >{{ creatorUsername }}</nuxt-link>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>{{ postDescription | cutOffDescription }}</v-card-text>
      <v-card-actions>
        <v-btn text @click="$store.dispatch('feed/fetchPost', postId)">Read more</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="$store.dispatch('user/setUserLikedPosts', postId)"
          :color="isLikedPost ? 'red' : 'grey'"
          icon
        >
          <v-icon>{{isLikedPost ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
        </v-btn>
        <v-btn icon @click="$store.dispatch('feed/fetchPost', postId)">
          <v-icon>mdi-comment</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  filters: {
    cutOffDescription(value) {
      if (value.length > 140) return value.slice(0, 140) + '...'
      else return value
    }
  },
  props: {
    postImage: {
      type: String,
      required: true
    },
    postTitle: {
      type: String,
      required: true
    },
    postDescription: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    creatorProfileImage: {
      type: String,
      required: true
    },
    creatorUsername: {
      type: String,
      required: true
    },
    creatorId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  computed: {
    isLikedPost() {
      return this.$store.getters['user/getUserLikedPosts'].some(
        likedPostId => likedPostId === this.postId
      )
    }
  }
}
</script>

<style scoped lang="scss">
</style>