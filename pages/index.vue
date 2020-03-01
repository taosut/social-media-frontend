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
          <app-feed-card v-for="n in a" :key="n"></app-feed-card>
        </v-col>
        <v-col cols="12" md="8" xl="7">
          <v-card ref="feed-preloader" height="60px" class="d-flex align-center justify-center">
            <v-progress-circular indeterminate class="my-12"></v-progress-circular>
          </v-card>
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
  data() {
    return {
      a: 10
    }
  },
  mounted() {
    if (process.client)
      window.addEventListener('scroll', this.handleScroll, {
        capture: true,
        passive: true
      })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, {
      capture: true,
      passive: true
    })
  },
  methods: {
    handleScroll() {
      console.log(
        window.innerHeight,
        this.$refs['feed-preloader'].$el.getBoundingClientRect().top
      )
      // check if feedIsFetching and if user scrolled Enough to fetch new feed...

      // if () {
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>