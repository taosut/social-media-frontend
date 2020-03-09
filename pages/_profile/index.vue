<template>
  <v-content>
    <v-container>
      <profile-header></profile-header>
      <profile-posts></profile-posts>
    </v-container>
  </v-content>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfilePosts from '@/components/profile/ProfilePosts'

export default {
  auth: false,
  validate(context) {
    // if (context.params.profile === 'profile') {
    //   return true
    // }
    return true
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
.avatar-border {
  border: 5px solid rgb(228, 68, 68);
}

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