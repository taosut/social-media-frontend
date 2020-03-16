<template>
  <v-btn
    color="primary mx-3"
    @click="$store.dispatch('user/setUserFollowing', userId)"
    depressed
  >{{ isFollowingUser ? 'Following' : 'Follow'}}</v-btn>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  computed: {
    isFollowingUser() {
      return this.$store.getters['user/getUserFollowing'].some(
        followingUserId => followingUserId === this.userId
      )
    }
  }
}
</script>

<style>
</style>