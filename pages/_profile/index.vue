<template>
  <v-content>
    <v-container>
      <profile-header
        :username="user.username"
        :followersNumber="user.followersNumber"
        :followingNumber="user.followingNumber"
        :postsNumber="user.postsNumber"
        :description="user.description"
        :profileImage="user.profileImage.location"
      ></profile-header>
      <profile-posts :posts="user.posts" :taggedPosts="user.taggedPosts"></profile-posts>
    </v-container>
  </v-content>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfilePosts from '@/components/profile/ProfilePosts'

export default {
  auth: false,
  validate(context) {
    if (Boolean(context.params.profile) && context.params.profile.length) {
      return true
    }
    return false
  },
  async asyncData(context) {
    try {
      const result = await context.$axios.$get(
        `/users/${context.params.profile}`
      )
      if (result && result.user) return result
      else context.error({ statusCode: 404, message: 'User not found' })
    } catch (err) {
      if (err.response && err.response.status === 404)
        context.error({ statusCode: 404, message: 'User not found' })
      else context.error({ statusCode: 500, message: 'An error occurred' })
    }
  },
  components: {
    ProfileHeader,
    ProfilePosts
  },
  data() {
    return {}
  },
  computed: {},
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