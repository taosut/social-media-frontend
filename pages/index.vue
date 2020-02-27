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
        <v-progress-circular indeterminate class="my-12" v-if="false"></v-progress-circular>
        <v-col v-else cols="12" md="8" xl="7">
          <app-feed-card v-for="n in 10" :key="n"></app-feed-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import AppFeedCard from '@/components/home/AppFeedCard'

export default {
  components: {
    AppFeedCard
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>