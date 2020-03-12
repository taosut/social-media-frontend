<template>
  <v-dialog transition="scroll-y-transition" persistent v-model="deletePostDialog" width="500">
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >Are you sure you went to delete this post?</v-card-title>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="clearPostDeletion">Cancel</v-btn>
        <v-btn color="red" @click="deletePost" :loading="loading" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({}),
    deletePostDialog: {
      get() {
        return this.$store.getters['user/deletePostDialog']
      },
      set(value) {
        this.$store.dispatch('user/changePostDialog', value)
      }
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alerts/setAlert',
      removeProfilePost: 'user/removeProfilePost'
    }),
    clearPostDeletion() {
      this.$store.dispatch('user/setDeletePostId', '')
      this.$store.dispatch('user/changeDeletePostDialog', false)
    },
    async deletePost() {
      try {
        this.loading = true
        const result = await this.$axios.$delete('/posts/delete-post', {
          data: { postId: this.$store.getters['user/deletePostId'] }
        })

        if (!result) {
          this.setAlert({
            status: 500,
            message: 'An error occurred'
          })
        }

        this.removeProfilePost(this.$store.getters['user/deletePostId'])

        this.setAlert({
          status: 200,
          message: 'Post successfully deleted'
        })
      } catch (err) {
        if (err.response)
          this.setAlert({
            status: err.response.status,
            message: err.response.message
          })
        else
          this.setAlert({
            status: 500,
            message: 'An error occurred'
          })
      } finally {
        this.loading = false
        this.clearPostDeletion()
      }
    }
  }
}
</script>

<style>
</style>