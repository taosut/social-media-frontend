<template>
  <v-content>
    <v-container>
      <v-row class="align-center justify-center">
        <v-col cols="12" md="8" xl="7">
          <p
            class="font-weight-light ma-0"
            :class="{ 'headline': $vuetify.breakpoint.xsOnly, 'display-1': $vuetify.breakpoint.smAndUp}"
          >Hi Marko, here are latest posts:</p>
        </v-col>
      </v-row>
      <v-row class="align-start justify-center">
        <!-- FEED -->
        <v-col cols="12" md="8" xl="7">
          <v-card class="mb-5" v-for="n in 10" :key="n">
            <v-img :aspect-ratio="$vuetify.breakpoint.xsOnly ? 1 : 16/9" src="/feed-img.jpg"></v-img>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/avatar.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">This is headling</v-list-item-title>
                <v-list-item-subtitle>by First Last</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>This is my super cool text for dummy feed card that i going to see every time when i open this project for long time...</v-card-text>
            <v-card-actions>
              <v-btn text>Read more</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  components: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>