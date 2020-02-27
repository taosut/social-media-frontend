<template>
  <v-content>
    <v-container>
      <v-row class="align-center justify-center">
        <v-col cols="12" sm="9" md="7" xl="7">
          <p class="display-1 font-weight-light">Hi Marko, your latest feed:</p>
        </v-col>
      </v-row>
      <v-row class="align-start justify-center">
        <!-- FEED -->
        <v-col cols="12" md="8" xl="7">
          <v-card>
            <v-list-item>
              <v-list-item-avatar color="grey"></v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="400"></v-img>

            <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

            <v-card-actions>
              <v-btn text color="deep-purple accent-4">Read</v-btn>
              <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- CHAT -->
        <v-col class="hidden-sm-and-down" md="4" xl="3">
          <v-card>
            <v-toolbar>
              <v-toolbar-title>Friends</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list max-height="650px" style="overflow-y: scroll">
              <v-list-item @click="openChat" v-for="n in 50" :key="n">
                <v-list-item-avatar>
                  <v-img src="/avatar.png"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="'First ' + 'Last'"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-message</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  components: {},
  methods: {
    openChat() {
      console.log('chat oppened')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>