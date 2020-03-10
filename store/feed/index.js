export const state = () => ({
  fetchingFeed: false,
  feed: [],
  moreFeedAvailable: true,
  skipPosts: 0,
  limitPosts: 2
})

export const getters = {
  fetchingFeed(state) {
    return state.fetchingFeed
  },
  feed(state) {
    return state.feed
  },
  moreFeedAvailable(state) {
    return state.moreFeedAvailable
  },
  skipPosts(state) {
    return state.skipPosts
  },
  limitPosts(state) {
    return state.limitPosts
  }
}

export const mutations = {
  changeFetchingFeed(state, payload) {
    state.fetchingFeed = payload
  },
  addToFeed(state, payload) {
    state.feed.push(...payload)
  },
  changeMoreFeedAvailable(state, payload) {
    state.moreFeedAvailable = payload
  },
  increaseSkipPosts(state, payload) {
    state.skipPosts += payload
  }
}

export const actions = {
  increaseSkipPosts(context, payload) {
    context.commit('increaseSkipPosts', payload)
  },
  changeFetchingFeed(context, payload) {
    context.commit('changeFetchingFeed', payload)
  },
  addToFeed(context, payload) {
    context.commit('addToFeed', payload)
  },
  changeMoreFeedAvailable(context, payload) {
    context.commit('changeMoreFeedAvailable', payload)
  },
  async fetchFeed(context, payload) {
    try {
      context.dispatch('changeFetchingFeed', true)
      const result = await this.$axios.$get(
        `/posts/?skip=${payload.skip}&limit=${payload.limit}`
      )

      if (!result) {
        return context.dispatch(
          'alerts/setAlert',
          {
            status: 500,
            message: 'An error occured'
          },
          { root: true }
        )
      }

      if (!result.posts.length) {
        return context.dispatch('changeMoreFeedAvailable', false)
      }

      context.dispatch('addToFeed', result.posts)
    } catch (err) {
      if (err.response) {
        context.dispatch(
          'alerts/setAlert',
          {
            status: err.response.status,
            message: err.response.data.message
          },
          { root: true }
        )
      } else {
        context.dispatch(
          'alerts/setAlert',
          {
            status: 500,
            message: 'An error occured'
          },
          { root: true }
        )
      }
    } finally {
      context.dispatch('changeFetchingFeed', false)
    }
  }
}
