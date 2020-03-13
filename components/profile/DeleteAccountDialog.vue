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
        <v-text-field
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          :error-messages="passwordErrors"
          v-model="password"
          label="Enter your password to confirm account deletion"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancelAccountDeletion">Cancel</v-btn>
        <v-btn
          :disabled="$v.$invalid"
          color="red"
          @click="deleteAccount"
          :loading="loading"
          text
        >Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import minValue from 'vuelidate/lib/validators/minValue'

export default {
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      show: false,
      password: ''
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100)
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
    },
    // VALIDATIONS
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors

      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength &&
        errors.push('Password length must be at least 8 characters long')
      !this.$v.password.maxLength &&
        errors.push("Password length can't be greate then 100 characters")

      return errors
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
    },
    cancelAccountDeletion() {
      this.$store.dispatch('user/changeDeleteAccountDialog', false)
      this.password = ''
      this.$v.$reset()
    }
  }
}
</script>

<style>
</style>