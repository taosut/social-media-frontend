<template>
  <v-content>
    <v-container>
      <v-row class="align-center justify-center">
        <v-col
          class="d-flex flex-column flex-sm-row align-center justify-center"
          cols="12"
          sm="12"
          md="11"
          lg="9"
          xl="8"
        >
          <v-col class="page-header d-flex align-start justify-center" cols="3">
            <v-avatar class="avatar-border" color="primary" size="130">
              <v-img src="/avatar.png"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="page-header" cols="12" sm="7" md="6">
            <div class="d-flex align-center justify-start">
              <h2>Marko Zlatar</h2>
              <v-btn color="primary mx-3" depressed>Follow</v-btn>
            </div>
            <div class="d-flex align-center justify-start">
              <div class="cursor-pointer">
                <span class="body-1 font-weight-bold">36</span>
                <span class="body-1">posts</span>
              </div>
              <div class="ma-3 cursor-pointer">
                <span class="body-1 font-weight-bold">256k</span>
                <span class="body-1">followers</span>
              </div>
              <div class="cursor-pointer">
                <span class="body-1 font-weight-bold">36</span>
                <span class="body-1">following</span>
              </div>
            </div>
            <p class="ma-0">
              Description:
              <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum ducimus eligendi veniam vero debitis. Optio vel cumque, ex aspernatur harum voluptates nisi minima consequatur sint?
            </p>
          </v-col>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" lg="9" xl="8" class="mx-auto px-6">
          <v-divider></v-divider>
        </v-col>
        <v-tabs centered v-model="tab">
          <v-tab>
            <v-icon left>mdi-grid</v-icon>POSTS
          </v-tab>
          <v-tab>
            <v-icon left>mdi-account-box</v-icon>TAGGED
          </v-tab>
        </v-tabs>
        <v-tabs-items class="mx-auto full-width" v-model="tab">
          <v-tab-item>
            <v-col cols="12" sm="10" lg="9" xl="8" class="mx-auto d-flex flex-wrap">
              <v-col v-for="n in 20" :key="n" class="d-flex child-flex" cols="4">
                <v-card flat tile class="d-flex" to="/">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    lazy-src="/placeholder.png"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-col>
          </v-tab-item>
          <v-tab-item>
            <v-col cols="12" sm="10" lg="9" xl="8" class="mx-auto d-flex flex-wrap">
              <v-col v-for="n in 20" :key="n" class="d-flex child-flex" cols="4">
                <v-card flat tile class="d-flex" to="/">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    lazy-src="/placeholder.png"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-col>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  validate(context) {
    if (context.params.profile === 'profile') {
      return true
    }
    return false
  },
  data() {
    return {
      tab: 0
    }
  },
  computed: {},
  watch: {
    tab: function(value) {
      if (!value) {
      } else {
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.avatar-border {
  border: 5px solid rgb(228, 68, 68);
}

.page-header {
  max-height: 250px;
  height: 250px;
}

@media screen and (max-width: 600px) {
  .page-header {
    max-height: none;
  }
}
</style>