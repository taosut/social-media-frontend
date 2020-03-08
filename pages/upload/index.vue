<template>
  <v-content>
    <v-row class="align-center justify-center" :style="{ 'min-height': '100%' }">
      <v-col cols="12" sm="8" md="7" xl="5" class="mx-auto">
        <v-card>
          <v-card-title>
            <h2 class="text-center full-width font-weight-light">New post</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              :error-messages="titleErrors"
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
              v-model="title"
              label="Post title"
            ></v-text-field>
            <v-textarea
              :error-messages="descriptionErrors"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
              v-model="description"
              label="Post description"
              counter="2200"
            ></v-textarea>
          </v-card-text>
          <v-file-input
            :error-messages="imageFileErrors"
            @change="$v.imageFile.$touch()"
            @blur="$v.imageFile.$touch()"
            v-model="imageFile"
            clearable
            accept="image/*"
            label="Post image"
          ></v-file-input>
          <v-card-actions class="d-flex align-center justify-space-between">
            <post-preview-dialog
              :title="title"
              :description="description"
              :author="{username: $auth.user.username, profileImage: $auth.user.profileImage.location}"
              :image="imageUrl"
            ></post-preview-dialog>
            <v-btn :disabled="$v.$invalid" :loading="loading" @click="createPost">Create post</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import PostPreviewDialog from '@/components/upload/PostPreviewDialog'

import { mapActions, mapGetters } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

const titleCharactersCheck = value => {
  const regEx = /^[\w\s\.\,\-\?\!]{2,150}$/
  return regEx.test(value)
}

const imageFileSizeCheck = value => {
  return value ? (value.size > 1048576 ? false : true) : true
}

export default {
  components: {
    PostPreviewDialog
  },
  mixins: [validationMixin],
  data() {
    return {
      title: '',
      description: '',
      imageFile: null,
      imageUrl: '',
      loading: false
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(150),
      titleCharactersCheck
    },
    description: {
      required,
      minLength: minLength(0),
      maxLength: maxLength(2200)
    },
    imageFile: {
      required,
      imageFileSizeCheck
    }
  },
  computed: {
    titleErrors() {
      const errors = []
      if (!this.$v.title.$dirty) return errors

      !this.$v.title.required && errors.push('Title is required')
      !this.$v.title.minLength &&
        errors.push('Title length must be at least 2 characters long')
      !this.$v.title.maxLength &&
        errors.push("Title length can't be greate then 150 characters")
      !this.$v.title.titleCharactersCheck &&
        errors.push('Forbidden character useage')

      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors

      !this.$v.description.required && errors.push('Description is required')
      !this.$v.description.minLength &&
        errors.push('Description length must be at least 2 characters long')
      !this.$v.description.maxLength &&
        errors.push("Description length can't be greate then 2200 characters")

      return errors
    },
    imageFileErrors() {
      const errors = []
      if (!this.$v.imageFile.$dirty) return errors

      !this.$v.imageFile.required && errors.push('Password is required')
      !this.$v.imageFile.imageFileSizeCheck &&
        errors.push('Files size must be less then 1MB')

      return errors
    }
  },
  watch: {
    imageFile: function(value) {
      if (!value) this.imageUrl = ''
      else {
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
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener('keypress', event => {
        if (
          event.code === 'Enter' ||
          event.key === 'Enter' ||
          event.keyCode === 13
        )
          this.createPost()
      })
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alerts/setAlert'
    }),
    async createPost() {
      if (!this.$v.$invalid) {
        const formData = new FormData()

        formData.append('title', this.title)
        formData.append('description', this.description)
        formData.append('image', this.imageFile)

        try {
          this.loading = true
          const result = await this.$axios.$post('/posts/create-post', formData)

          if (!result) {
            this.setAlert({
              status: 500,
              message: 'An error occurred'
            })
          }

          this.$v.$reset()
          this.title = ''
          this.description = ''
          this.imageFile = null
          this.imageUrl = ''

          await this.$auth.fetchUser()
          
          this.loading = false
          this.setAlert({
            status: 200,
            message: result.message
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

<style>
</style>