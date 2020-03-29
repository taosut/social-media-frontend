<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template v-slot:activator="{ on }">
      <span v-on="on" class="primary--text mt-1 cursor-pointer ml-auto body-2">Forgot password?</span>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Change Password</v-card-title>

      <v-card-text>
        <transition name="fade" type="transition" mode="out-in">
          <v-text-field
            v-if="!isEmailSent"
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            v-model="email"
            key="email"
            label="Enter email"
          ></v-text-field>
          <div v-else key="password">
            <p class="mt-3">Email has been sent, enter token from email and change password.</p>
            <v-text-field
              @input="$v.token.$touch()"
              @blur="$v.token.$touch()"
              :error-messages="tokenErrors"
              v-model="token"
              label="Enter token"
              :type="'type'"
            ></v-text-field>

            <v-text-field
              @click:append="show = !show"
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              label="Enter new password"
              :type="show ? 'type' : 'password'"
            ></v-text-field>
            <v-text-field
              :error-messages="confirmPasswordErrors"
              @input="$v.confirmPassword.$touch()"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
              label="Confirm new password"
              :type="show ? 'type' : 'password'"
            ></v-text-field>
          </div>
        </transition>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="sendingEmail" color="red" text @click="cancelChange">Cancel</v-btn>
        <v-btn
          :loading="sendingEmail"
          v-if="!isEmailSent"
          color="primary"
          text
          @click="sendEmail"
        >Send Email</v-btn>
        <v-btn
          v-if="isEmailSent"
          :disabled="$v.$invlid"
          color="primary"
          text
          @click="changePassword"
        >Change password</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  email,
  required,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      dialog: false,
      isEmailSent: false,
      sendingEmail: false,
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      show: false
    }
  },
  validations() {
    return {
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(100)
      },
      confirmPassword: {
        required,
        sameAs: sameAs('password')
      },
      token: {
        required
      }
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors

      !this.$v.email.required && errors.push('Email is required')
      !this.$v.email.email && errors.push('Enter valid email')

      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors

      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength &&
        errors.push('Password length must be at least 8 characters long')
      !this.$v.password.maxLength &&
        errors.push("Password length can't be greate then 100 characters")

      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors

      !this.$v.confirmPassword.required && errors.push('Password is required')
      !this.$v.confirmPassword.sameAs && errors.push("Password doesn't match")

      return errors
    },
    tokenErrors() {
      const errors = []
      if (!this.$v.token.$dirty) return errors

      !this.$v.token.required && errors.push('Token is required')

      return errors
    }
  },
  methods: {
    sendEmail() {
      this.sendingEmail = true
      setTimeout(() => {
        this.isEmailSent = true
        this.sendingEmail = false
      }, 2000)
    },
    cancelChange() {
      this.isEmailSent = false
      this.dialog = false
    },
    changePassword() {
      this.dialog = false
      this.$store.dispatch('alerts/setAlert', {
        status: '400',
        message: 'This feature is currently disabled'
      })
    }
  }
}
</script>

<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 500ms ease-in;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 500ms linear;
}
.fade-leave-to {
  opacity: 0;
}
</style>