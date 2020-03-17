<template>
  <v-btn
    @click="$store.dispatch('user/setUserLikedPosts', postId)"
    :color="isLikedPost ? 'red' : 'grey'"
    icon
  >
    <v-icon>{{isLikedPost ? 'mdi-heart' : 'mdi-heart-outline'}}</v-icon>
  </v-btn>
</template>

<script>
import isLikedPostMixin from '@/mixins/isLikedPostMixin'

export default {
  mixins: [isLikedPostMixin],
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  computed: {}
}
</script>

<style>
</style>