<template>
  <v-content>
    <v-container>
      <v-row class="align-center justify-center">
        <v-col cols="12" md="8" xl="7">
          <p
            class="font-weight-light ma-0"
            :class="{ 'headline': $vuetify.breakpoint.xsOnly, 'display-1': $vuetify.breakpoint.smAndUp}"
          >Hi {{ $auth.user.username }}, here are latest posts:</p>
        </v-col>
      </v-row>
      <v-row ref="feed-container" class="align-start justify-center">
        <!-- FEED -->
        <v-col v-if="!feed.length" class="text-center" cols="12" md="8" xl="7">
          <h3>Search for people and follow them to see their posts</h3>
        </v-col>
        <v-col v-else cols="12" md="8" xl="7">
          <app-feed-card
            :postImage="post.image.location"
            :postId="post._id"
            :postTitle="post.title"
            :postDescription="post.description"
            :creatorUsername="post.creator.username"
            :creatorId="post.creator._id"
            :creatorProfileImage="post.creator.profileImage.location"
            v-for="(post, index) in feed"
            :key="index"
          ></app-feed-card>
        </v-col>
        <v-col cols="12" md="8" xl="7">
          <v-card
            v-if="feed.length"
            ref="feed-preloader"
            height="60px"
            class="d-flex align-center justify-center"
          >
            <v-progress-circular v-if="moreFeedAvailable" indeterminate class="my-12"></v-progress-circular>

            <p class="ma-0 font-weight-bold" v-else>There are no more posts</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import AppFeedCard from '@/components/home/AppFeedCard'

import { mapGetters, mapActions } from 'vuex'

export default {
  validate(context) {
    if (!context.$auth.loggedIn) context.redirect('/sign-in')
    return true
  },
  async fetch(context) {
    context.store.dispatch('feed/clearFeed')
    await context.store.dispatch('feed/fetchFeed', {
      skip: context.store.getters['feed/skipPosts'],
      limit: context.store.getters['feed/limitPosts']
    })
    context.store.dispatch(
      'feed/increaseSkipPosts',
      context.store.getters['feed/limitPosts']
    )
  },
  components: {
    AppFeedCard
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      fetchingFeed: 'feed/fetchingFeed',
      feed: 'feed/feed',
      moreFeedAvailable: 'feed/moreFeedAvailable',
      skipPosts: 'feed/skipPosts',
      limitPosts: 'feed/limitPosts'
    })
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll, {
        capture: true,
        passive: true
      })
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, {
      capture: true,
      passive: true
    })
  },
  methods: {
    ...mapActions({
      changeFetchingFeed: 'feed/changeFetchingFeed',
      fetchFeed: 'feed/fetchFeed',
      increaseSkipPosts: 'feed/increaseSkipPosts'
    }),
    async handleScroll() {
      if (
        window.innerHeight >=
          this.$refs['feed-preloader'].$el.getBoundingClientRect().top &&
        !this.fetchingFeed &&
        this.moreFeedAvailable
      ) {
        this.fetchFeed({ skip: this.skipPosts, limit: this.limitPosts })
        this.increaseSkipPosts(this.limitPosts)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>