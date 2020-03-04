<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col class="container d-flex flex-column justify-center align-center" cols="12">
          <v-icon size="100" class="error-icon">mdi-alert-octagon</v-icon>
          <h1 class="text-center error-text" v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
          <h1 class="text-center error-text" v-else>
            An Error Occurred
            <br />Sorry for this inconvenience
          </h1>
          <a href="/" class="text-decoration-none mt-2">
            <v-btn>Back to home</v-btn>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'no-navbar',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Page Not Found',
      otherError: 'An error occured'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 20px;
}
.container {
  height: 95vh;
}
.error-text {
  font-size: 70px;
}

@media screen and (max-width: 600px) {
  .error-icon {
    font-size: 120px;
  }
  .error-text {
    font-size: 25px;
  }
}
</style>
