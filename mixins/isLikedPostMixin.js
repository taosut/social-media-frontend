export default {
  computed: {
    isLikedPost() {
      return this.$store.getters['user/getUserLikedPosts'].some(
        likedPostId => likedPostId === this.postId
      )
    }
  }
}
