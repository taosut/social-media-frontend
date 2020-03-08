<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col class="container d-flex flex-column justify-center align-center" cols="12">
          <v-icon size="100" class="error-icon">mdi-alert-octagon</v-icon>
          <h1 class="text-center text-404" v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
          <div v-else class="error-text-container d-flex flex-column align-center justify-center">
            <h3 class="text-center error-text">
              An Error Occurred
              <br />
            </h3>
            <h4>Sorry for this inconvenience</h4>
          </div>
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
.container {
  height: 95vh;
}
.text-404 {
  font-size: 70px;
}
.error-text-container {
  h3 {
    font-size: 70px;
    text-align: center;
  }
  h4 {
    font-size: 35px;
    text-align: center;
  }
}

@media screen and (max-width: 600px) {
  .error-icon {
    font-size: 120px;
  }
  .text-404 {
    font-size: 25px;
  }
  .error-text-container {
    h3 {
      font-size: 25px;
    }
    h4 {
      font-size: 20px;
    }
  }
}
</style>
