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
              <v-row>
                <v-col class="ma-0 py-0" cols="6">
                  <v-text-field label="First Name"></v-text-field>
                </v-col>
                <v-col class="ma-0 py-0" cols="6">
                  <v-text-field label="Last Name"></v-text-field>
                </v-col>
              </v-row>
              <v-text-field label="Enter email"></v-text-field>
              <div class="d-flex flex-column align-center justify-center">
                <v-file-input
                  class="full-width"
                  prepend-icon="mdi-camera"
                  show-size
                  label="Your image (Pick an avatar)"
                  v-model="imageFile"
                ></v-file-input>
                <v-avatar v-if="imageFile && imageUrl" color="primary" size="100">
                  <v-img ref="avatarImage" :src="imageUrl" :alt="`${firstName} ${lastName}`"></v-img>
                </v-avatar>
              </div>
              <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                label="Enter password"
                :type="show ? 'type' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field label="Confirm password" :type="show ? 'type' : 'password'"></v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex flex-column justify-center">
              <v-btn block>Create account</v-btn>
              <nuxt-link class="my-2" to="/sign-in">Already have account? Login</nuxt-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  layout: 'no-navbar',
  data() {
    return {
      show: false,
      firstName: '',
      lastName: '',
      imageFile: null,
      imageUrl: null
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
  }
}
</script>

<style scoped lang="scss">
</style>