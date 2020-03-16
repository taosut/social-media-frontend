<template>
  <v-content>
    <v-container>
      <profile-header
        :username="getProfile.username"
        :followersNumber="getProfile.followers.length"
        :followingNumber="getProfile.following.length"
        :postsNumber="getProfile.posts.length"
        :description="getProfile.description"
        :profileImage="getProfile.profileImage.location"
        :profileId="getProfile._id"
      ></profile-header>
      <profile-posts :posts="getProfile.posts" :taggedPosts="getProfile.taggedPosts"></profile-posts>
      <delete-post-dialog></delete-post-dialog>
      <delete-account-dialog></delete-account-dialog>
      <edit-profile-dialog></edit-profile-dialog>
    </v-container>
  </v-content>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfilePosts from '@/components/profile/ProfilePosts'
import DeletePostDialog from '@/components/profile/DeletePostDialog'
import DeleteAccountDialog from '@/components/profile/DeleteAccountDialog'
import EditProfileDialog from '@/components/profile/EditProfileDialog'

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
    DeletePostDialog,
    DeleteAccountDialog,
    EditProfileDialog
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getProfile: 'user/getProfile'
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