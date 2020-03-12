<template>
  <v-content>
    <v-container>
      <profile-header
        :username="profile.username"
        :followersNumber="profile.followersNumber"
        :followingNumber="profile.followingNumber"
        :postsNumber="profile.postsNumber"
        :description="profile.description"
        :profileImage="profile.profileImage.location"
      ></profile-header>
      <profile-posts :posts="profile.posts" :taggedPosts="profile.taggedPosts"></profile-posts>
      <delete-post-dialog></delete-post-dialog>
    </v-container>
  </v-content>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfilePosts from '@/components/profile/ProfilePosts'
import DeletePostDialog from '@/components/profile/DeletePostDialog'

import { mapGetters, mapActions } from 'vuex'

export default {
  auth: false,
  validate(context) {
    if (Boolean(context.params.profile) && context.params.profile.length) {
      return true
    }
    return false
  },
  async fetch(context) {
    try {
      const result = await context.$axios.$get(
        `/users/${context.params.profile}`
      )
      if (result && result.user)
        return context.store.dispatch('user/setProfile', result.user)
      else context.error({ statusCode: 404, message: 'User not found' })
    } catch (err) {
      if (err.response && err.response.status === 404)
        context.error({ statusCode: 404, message: 'User not found' })
      else context.error({ statusCode: 500, message: 'An error occurred' })
    }
  },
  components: {
    ProfileHeader,
    ProfilePosts,
    DeletePostDialog
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile'
    })
  },
  watch: {
    tab: function(value) {
      if (!value) {
      } else {
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.page-header {
  max-height: 250px;
  height: 250px;
}

@media screen and (max-width: 600px) {
  .page-header {
    max-height: none;
  }
}
</style>