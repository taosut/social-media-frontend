<template>
  <v-skeleton-loader
    class="mb-5"
    :loading="loading"
    type="image, list-item-avatar-three-line"
    height="500px"
  >
    <v-card class="mb-5">
      <v-img
        @click="$store.dispatch('changePostDialog', true)"
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
          <v-list-item-subtitle>by {{ creatorUsername }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>{{ postDescription | cutOffDescription }}</v-card-text>
      <v-card-actions>
        <v-btn text @click="$store.dispatch('changePostDialog', true)">Read more</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon @click="$store.dispatch('changePostDialog', true)">
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
  }
}
</script>

<style scoped lang="scss">
</style>