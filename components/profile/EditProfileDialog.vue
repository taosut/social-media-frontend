<template>
  <v-dialog persistent v-model="editProfileDialog" max-width="550px">
    <v-card>
      <v-card-title>Edit your profile</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="my-3">
        <v-text-field
          :error-messages="usernameErrors"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          v-model="username"
          label="Username"
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
          <v-avatar v-if="imageUrl" size="100">
            <v-img ref="avatarImage" :src="imageUrl" :alt="`${username}`"></v-img>
          </v-avatar>
        </div>
        <v-textarea
          :error-messages="descriptionErrors"
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
          v-model="description"
          counter="150"
          rows="4"
          no-resize
          label="Enter something about you"
        ></v-textarea>
        <v-checkbox label="Change password" v-model="changePassword"></v-checkbox>
        <div v-if="changePassword">
          <v-text-field
            :error-messages="currentPasswordErrors"
            @input="$v.currentPassword.$touch()"
            @blur="$v.currentPassword.$touch()"
            v-model="currentPassword"
            :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Enter current password"
            :type="showCurrentPassword ? 'type' : 'password'"
            @click:append="showCurrentPassword = !showCurrentPassword"
          ></v-text-field>
          <v-text-field
            :error-messages="newPasswordErrors"
            @input="$v.newPassword.$touch()"
            @blur="$v.newPassword.$touch()"
            v-model="newPassword"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Enter new password"
            :type="showNewPassword ? 'type' : 'password'"
            @click:append="showNewPassword = !showNewPassword"
          ></v-text-field>
          <v-text-field
            :error-messages="confirmNewPasswordErrors"
            @input="$v.confirmNewPassword.$touch()"
            @blur="$v.confirmNewPassword.$touch()"
            v-model="confirmNewPassword"
            label="Confirm new password"
            :type="showNewPassword ? 'type' : 'password'"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex align-center justify-end flex-wrap">
        <v-btn
          class="mt-1"
          color="white"
          @click="$store.dispatch('user/changeEditProfileDialog', false)"
        >Cancel</v-btn>
        <v-btn
          :loading="loading"
          :disabled="$v.$invalid"
          @click="editProfile"
          class="mt-1"
          color="primary"
        >Submit changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'

const usernameCharactersCheck = value => {
  const regEx = /^[\w\.\-\_]{2,32}$/
  return regEx.test(value)
}

const imageFileSizeCheck = value => {
  return value ? (value.size > 1048576 ? false : true) : true
}

export default {
  mixins: [validationMixin],
  data() {
    let imageUrl = this.$auth.user ? this.$auth.user.profileImage.location : ''
    let username = this.$auth.user ? this.$auth.user.username : ''
    let description = this.$auth.user ? this.$auth.user.description : ''
    return {
      loading: false,
      showCurrentPassword: false,
      showNewPassword: false,
      imageFile: null,
      imageUrl: imageUrl,
      username: username,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      description: description,
      changePassword: false
    }
  },
  validations() {
    if (!this.changePassword)
      return {
        imageFile: {
          imageFileSizeCheck
        },
        username: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(32),
          usernameCharactersCheck
        },
        currentPassword: {
          minLength: minLength(8),
          maxLength: maxLength(100)
        },
        newPassword: {
          minLength: minLength(8),
          maxLength: maxLength(100)
        },
        confirmNewPassword: {
          sameAs: sameAs('newPassword')
        },
        description: {
          minLength: minLength(0),
          maxLength: maxLength(150)
        }
      }
    else
      return {
        imageFile: {
          imageFileSizeCheck
        },
        username: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(32),
          usernameCharactersCheck
        },
        currentPassword: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(100)
        },
        newPassword: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(100)
        },
        confirmNewPassword: {
          required,
          sameAs: sameAs('newPassword')
        },
        description: {
          minLength: minLength(0),
          maxLength: maxLength(150)
        }
      }
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile'
    }),
    editProfileDialog: {
      get() {
        return this.$store.getters['user/editProfileDialog']
      },
      set(value) {
        this.$store.dispatch('user/changeEditProfileDialog', value)
      }
    },
    // VALIDATIONS
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
    currentPasswordErrors() {
      const errors = []
      if (!this.$v.currentPassword.$dirty) return errors
      if (this.changePassword)
        !this.$v.currentPassword.required &&
          errors.push('This field is required')
      !this.$v.currentPassword.minLength &&
        errors.push('Password length must be at least 8 characters long')
      !this.$v.currentPassword.maxLength &&
        errors.push("Password length can't be greate then 100 characters")

      return errors
    },
    newPasswordErrors() {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      if (this.changePassword)
        !this.$v.newPassword.required && errors.push('This field is required')
      !this.$v.newPassword.minLength &&
        errors.push('Password length must be at least 8 characters long')
      !this.$v.newPassword.maxLength &&
        errors.push("Password length can't be greate then 100 characters")

      return errors
    },
    confirmNewPasswordErrors() {
      const errors = []
      if (!this.$v.confirmNewPassword.$dirty) return errors
      if (this.changePassword)
        !this.$v.confirmNewPassword.required &&
          errors.push('This field is required')
      !this.$v.confirmNewPassword.sameAs &&
        errors.push("Password doesn't match")

      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors

      !this.$v.description.minLength &&
        errors.push('Description length must be at least 8 characters long')
      !this.$v.description.maxLength &&
        errors.push("Description length can't be greate then 100 characters")

      return errors
    },
    imageFileErrors() {
      const errors = []
      if (!this.$v.imageFile.$dirty) return errors

      !this.$v.imageFile.imageFileSizeCheck &&
        errors.push('Files size must be less then 1MB')

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
      } else {
        this.imageUrl = this.$auth.user.profileImage.location
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions({
      setAlert: 'alerts/setAlert',
      setProfile: 'user/setProfile',
      changeEditProfileDialog: 'user/changeEditProfileDialog'
    }),
    async editProfile() {
      console.log(this.$v.$invalid)
      if (!this.$v.$invalid) {
        this.loading = true
        console.log('works')
        const formData = new FormData()

        formData.append('username', this.username)
        formData.append('description', this.description)

        if (this.imageFile) formData.append('profileImage', this.imageFile)

        if (this.changePassword) {
          formData.append('currentPassword', this.currentPassword)
          formData.append('newPassword', this.newPassword)
        }

        try {
          const result = await this.$axios.$patch(
            '/users/update-account',
            formData
          )

          if (!result) {
            this.setAlert({
              status: 500,
              message: 'An error occurred'
            })
          }

          this.changeEditProfileDialog(false)

          if (this.$auth.user.username !== result.user.username) {
            this.$router.push(`/${result.user.username}`)
          } else {
            let profile = Object.assign({}, this.profile)

            profile.description = result.user.description
            profile.profileImage = result.user.profileImage

            this.setProfile(profile)
          }

          await this.$auth.fetchUser()

          this.setAlert({
            status: 200,
            message: 'Profile successfully updated'
          })
        } catch (err) {
          if (err.response)
            this.setAlert({
              status: err.response.status,
              message: err.response.data.message
            })
          else
            this.setAlert({
              status: 500,
              message: 'An error occurred'
            })
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style>
</style>