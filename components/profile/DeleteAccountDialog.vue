<template>
  <v-dialog
    transition="scroll-y-transition"
    persistent
    v-model="deleteAccountDialog"
    max-width="550"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        :style="{'white-space': 'pre-wrap', 'word-break': 'keep-all'}"
        primary-title
      >Are you sure you went to delete your account?</v-card-title>
      <v-card-text>
        <p
          class="my-3"
        >All your data will be deleted, this include all your posts, people that follow you and that you follow!</p>
        <v-text-field v-model="password" label="Enter your password to confirm account deletion"></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="$store.dispatch('user/changeDeleteAccountDialog', false)"
        >Cancel</v-btn>
        <v-btn color="red" @click="deleteAccount" :loading="loading" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      password: ''
    }
  },
  computed: {
    ...mapGetters({}),
    deleteAccountDialog: {
      get() {
        return this.$store.getters['user/deleteAccountDialog']
      },
      set(value) {
        this.$store.dispatch('changeDeleteAccountDialog', value)
      }
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alerts/setAlert'
    }),
    async deleteAccount() {
      try {
        this.loading = true
        const result = await this.$axios.$delete('/users/delete-account', {
          data: {}
        })

        if (!result) {
          this.setAlert({
            status: 500,
            message: 'An error occurred'
          })
        }

        this.setAlert({
          status: 200,
          message: 'Account successfully deleted'
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
      }
    }
  }
}
</script>

<style>
</style>