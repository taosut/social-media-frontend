<template>
  <v-content>
    <v-container>
      <v-row class="align-center justify-center auth-row--height">
        <v-col cols="12" sm="8" md="6" xl="4">
          <v-card outlined>
            <v-card-text>
              <v-card-title class="d-flex align-center justify-center">
                <h1>LOGO</h1>
              </v-card-title>
              <v-text-field
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                v-model="email"
                label="Enter email"
              ></v-text-field>
              <v-text-field
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                v-model="password"
                label="Enter password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex flex-column justify-center">
              <v-btn :loading="loading" @click="signIn" block>Login</v-btn>
              <p class="my-2 text-center or-paragraph full-width">or</p>
              <v-btn :nuxt="true" to="/sign-up" block>Sign In</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { validationMixin } from 'vuelidate'
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  layout: 'no-navbar',
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100)
    }
  },
  mixins: [validationMixin],
  data() {
    return {
      showPassword: false,
      email: '',
      password: '',
      loading: false
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
    }
  },
  mounted() {
    this.clearUserDynamicData()
  },
  methods: {
    ...mapActions({
      setAlert: 'alerts/setAlert',
      clearUserDynamicData: 'user/clearUserDynamicData'
    }),
    async signIn() {
      console.log(this.$v.$invalid)
      if (!this.$v.$invalid) {
        try {
          this.loading = true
          await this.$auth.loginWith('local', {
            data: { email: this.email, password: this.password }
          })

          this.loading = false
          this.$v.$reset()
          this.email = ''
          this.password = ''

          this.setAlert({
            status: 200,
            message: 'You have successfully logged in'
          })
        } catch (err) {
          this.loading = false
          if (err.response) {
            this.setAlert({
              status: err.response.status,
              message: err.response.data.message
            })
          } else {
            this.setAlert({
              status: 500,
              message: 'An error occurred'
            })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.or-paragraph {
  position: relative;
  &::before {
    content: '';
    width: 40%;
    border: 0.2px solid hsla(0, 0%, 0%, 0.2);
    position: absolute;
    transform: translate(-110%, 10px);
  }
  &::after {
    content: '';
    width: 40%;
    border: 0.2px solid hsla(0, 0%, 0%, 0.2);
    position: absolute;
    transform: translate(10%, 10px);
  }
}
</style>