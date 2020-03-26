<template>
  <v-content :class="{'grey lighten-4': !$vuetify.theme.dark}">
    <v-container ref="homepage-container">
      <v-row class="align-center justify-center">
        <v-col cols="12" md="8" xl="7">
          <p
            class="font-weight-light ma-0 welcome-headline"
          >Hi {{ $auth.user.username }}, here are latest posts:</p>
        </v-col>
      </v-row>
      <v-row ref="feed-container" class="align-start justify-center">
        <!-- FEED -->
        <v-col v-if="!getFeed.length" class="text-center" cols="12" md="8" xl="7">
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
            v-for="(post, index) in getFeed"
            :key="index"
          ></app-feed-card>
        </v-col>

        <v-col v-if="showFeedLoader && getFeed.length" cols="12" md="8" xl="7">
          <v-card height="60px" class="d-flex align-center justify-center">
            <v-progress-circular
              v-if="this.isMoreFeedAvailable && this.getFeed.length >= this.getLimitPosts"
              indeterminate
              class="my-12"
            ></v-progress-circular>
            <p v-else class="ma-0 font-weight-bold">There are no more posts</p>
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
    context.store.dispatch('feed/restartFeedState')
    await context.store.dispatch('feed/fetchFeed', {
      skip: context.store.getters['feed/getSkipPosts'],
      limit: context.store.getters['feed/getLimitPosts']
    })
    context.store.dispatch(
      'feed/increaseSkipPosts',
      context.store.getters['feed/getLimitPosts']
    )
  },
  components: {
    AppFeedCard
  },
  data() {
    return {
      showFeedLoader: true
    }
  },
  computed: {
    ...mapGetters({
      isFetchingFeed: 'feed/isFetchingFeed',
      getFeed: 'feed/getFeed',
      isMoreFeedAvailable: 'feed/isMoreFeedAvailable',
      getSkipPosts: 'feed/getSkipPosts',
      getLimitPosts: 'feed/getLimitPosts'
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
      if (this.$refs['homepage-container'])
        if (this.$refs['homepage-container'].clientHeight > window.innerHeight)
          this.showFeedLoader = true
        else this.showFeedLoader = false
      else this.showFeedLoader = false

      if (
        this.$refs['homepage-container'].clientHeight <
          window.scrollY + window.innerHeight - 50 &&
        !this.isFetchingFeed &&
        this.isMoreFeedAvailable
      ) {
        this.fetchFeed({ skip: this.getSkipPosts, limit: this.getLimitPosts })
        this.increaseSkipPosts(this.getLimitPosts)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome-headline {
  font-size: 35px;
}
@media only screen and (max-width: 600px) {
  .welcome-headline {
    font-size: 25px;
  }
}
</style>