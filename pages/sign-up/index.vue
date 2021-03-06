<template>
  <v-content :class="{'grey lighten-4': !$vuetify.theme.dark}">
    <v-container>
      <v-row class="align-center justify-center auth-row--height mt-5">
        <v-col cols="12" sm="8" md="6" xl="4">
          <v-card elevation="12" class="pa-6">
            <v-card-text class="pb-0">
              <v-card-title class="d-flex align-center justify-center pt-0">
                <img :src=" $vuetify.theme.dark ? '/logo-w.png' : '/logo-b&w.png'" width="170" />
              </v-card-title>
              <v-text-field
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                v-model="username"
                label="Username"
              ></v-text-field>
              <v-text-field
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                v-model="email"
                label="Enter email"
              ></v-text-field>
              <div class="d-flex flex-column align-center justify-center">
                <v-file-input
                  accept="image/*"
                  :error-messages="imageFileErrors"
                  @change="$v.imageFile.$touch()"
                  @blur="$v.imageFile.$touch()"
                  class="full-width"
                  prepend-icon="mdi-camera"
                  show-size
                  label="Your image (Pick an avatar)"
                  v-model="imageFile"
                ></v-file-input>
                <v-avatar v-if="imageFile && imageUrl" size="100">
                  <v-img ref="avatarImage" :src="imageUrl" :alt="`${username}`"></v-img>
                </v-avatar>
              </div>
              <v-text-field
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                label="Enter password"
                :type="show ? 'type' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                :error-messages="confirmPasswordErrors"
                @input="$v.confirmPassword.$touch()"
                @blur="$v.confirmPassword.$touch()"
                v-model="confirmPassword"
                label="Confirm password"
                :type="show ? 'type' : 'password'"
              ></v-text-field>
              <v-textarea
                :error-messages="descriptionErrors"
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
                v-model="description"
                counter="150"
                rows="3"
                no-resize
                label="Enter something about you"
              ></v-textarea>
              <v-checkbox
                @change="$v.termsAndConditions.$touch()"
                @blue="$v.termsAndConditions.$touch()"
                :error-messages="termsAndConditionsErrors"
                v-model="termsAndConditions"
                label="Accept Terms & Conditions"
              ></v-checkbox>
            </v-card-text>
            <v-card-actions class="d-flex flex-column justify-center">
              <v-btn
                color="#663dfc"
                :loading="loading"
                :disabled="$v.$invalid"
                @click="signUp"
                block
                :dark="!$v.$invalid"
              >Create account</v-btn>
              <nuxt-link class="my-2" to="/sign-in">Already have account? Login</nuxt-link>
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
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from 'vuelidate/lib/validators'

import { descriptionCharactersCheck } from '@/components/profile/EditProfileDialog'

const usernameCharactersCheck = value => {
  const regEx = /^[\w\.\-\_]{2,32}$/
  return regEx.test(value)
}

const imageFileSizeCheck = value => {
  return value ? (value.size > 2621440 ? false : true) : true
}

export default {
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Welcome to Sign Up page'
        }
      ]
    }
  },
  auth: false,
  validate(context) {
    if (context.$auth.loggedIn) context.redirect('/')
    else return true
  },
  layout: 'no-navbar',
  mixins: [validationMixin],
  data() {
    return {
      title: 'Sign Up',
      loading: false,
      show: false,
      imageFile: null,
      imageUrl: null,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
      termsAndConditions: false
    }
  },
  validations: {
    imageFile: {
      required,
      imageFileSizeCheck
    },
    username: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(32),
      usernameCharactersCheck
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(100)
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password')
    },
    description: {
      minLength: minLength(0),
      maxLength: maxLength(150),
      descriptionCharactersCheck
    },
    termsAndConditions: {
      checked(val) {
        return val
      }
    }
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors

      !this.$v.username.required && errors.push('Username is required')
      !this.$v.username.minLength &&
        errors.push('Username length must be at least 2 characters long')
      !this.$v.username.maxLength &&
        errors.push("Username length can't be greate then 32 characters")
      !this.$v.username.usernameCharactersCheck &&
        errors.push('Forbidden character useage')

      return errors
    },
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
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors

      !this.$v.description.minLength &&
        errors.push('Description length must be at least 8 characters long')
      !this.$v.description.maxLength &&
        errors.push("Description length can't be greate then 100 characters")
      !this.$v.description.descriptionCharactersCheck &&
        errors.push('Forbidden character useage')

      return errors
    },
    imageFileErrors() {
      const errors = []
      if (!this.$v.imageFile.$dirty) return errors

      !this.$v.imageFile.required && errors.push('Image is required')
      !this.$v.imageFile.imageFileSizeCheck &&
        errors.push('Files size must be less then 2.5MB')

      return errors
    },
    termsAndConditionsErrors() {
      const errors = []
      if (!this.$v.termsAndConditions.$dirty) return errors

      !this.$v.termsAndConditions.checked &&
        errors.push('This field is required')

      return errors
    }
  },
  watch: {
    imageFile: function(value) {
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          this.imageUrl = reader.result
        },
        false
      )

      if (this.imageFile) {
        reader.readAsDataURL(this.imageFile)
      }
    }
  },
  mounted() {
    this.clearUserDynamicData()
    if (process.client) {
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alerts/setAlert',
      clearUserDynamicData: 'user/clearUserDynamicData'
    }),
    clearForm() {
      this.loading = false
      this.$v.$reset()
      this.username = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    },
    async signUp() {
      if (!this.$v.$invalid) {
        const formData = new FormData()

        this.email = this.email.toLowerCase()

        formData.append('username', this.username)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('description', this.description)
        formData.append('profileImage', this.imageFile)

        try {
          this.loading = true
          const result = await this.$axios.$post('/auth/sign-up', formData)

          if (!result) {
            this.setAlert({
              status: 500,
              message: 'An error occurred'
            })
          }

          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })

          this.clearForm()

          this.setAlert({
            status: 200,
            message: 'You have successfully logged in'
          })

          this.$router.replace('/')
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

<style scoped lang="scss">
</style>