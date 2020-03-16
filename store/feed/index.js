export const state = () => ({
  fetchingFeed: false,
  feed: [],
  moreFeedAvailable: true,
  skipPosts: 0,
  limitPosts: 2,
  post: null,
  loadingPost: false
})

export const getters = {
  isFetchingFeed(state) {
    return state.fetchingFeed
  },
  getFeed(state) {
    return state.feed
  },
  isMoreFeedAvailable(state) {
    return state.moreFeedAvailable
  },
  getSkipPosts(state) {
    return state.skipPosts
  },
  getLimitPosts(state) {
    return state.limitPosts
  },
  getPost(state) {
    return state.post
  },
  isLoadingPost(state) {
    return state.loadingPost
  }
}

export const mutations = {
  SET_FETCHING_FEED(state, payload) {
    state.fetchingFeed = payload
  },
  ADD_FEED(state, payload) {
    state.feed.push(...payload)
  },
  SET_MORE_FEED_AVAILABLE(state, payload) {
    state.moreFeedAvailable = payload
  },
  ADD_SKIP_POSTS(state, payload) {
    state.skipPosts += payload
  },
  SET_POST(state, payload) {
    state.post = payload
  },
  SET_LOADING_POST(state, payload) {
    state.loadingPost = payload
  },
  RESTART_FEED_STATE(state) {
    state.feed = []
    state.skipPosts = 0
    state.moreFeedAvailable = true
  }
}

export const actions = {
  restartFeedState(context) {
    context.commit('RESTART_FEED_STATE')
  },
  increaseSkipPosts(context, payload) {
    context.commit('ADD_SKIP_POSTS', payload)
  },
  changeFetchingFeed(context, payload) {
    context.commit('SET_FETCHING_FEED', payload)
  },
  changeMoreFeedAvailable(context, payload) {
    context.commit('SET_MORE_FEED_AVAILABLE', payload)
  },
  async fetchFeed(context, { skip, limit }) {
    try {
      context.dispatch('changeFetchingFeed', true)
      const result = await this.$axios.$get(
        `/posts/?skip=${skip}&limit=${limit}`
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

      context.commit('ADD_FEED', result.posts)
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
  },
  async fetchPost(context, payload) {
    try {
      context.dispatch('changePostDialog', true, { root: true })
      context.commit('SET_LOADING_POST', true)
      const result = await this.$axios.$get(`/posts/${payload}`)

      if (!result) {
        context.dispatch(
          'alerts/setAlert',
          {
            status: 500,
            message: 'An error occured'
          },
          { root: true }
        )
      }
      context.commit('SET_POST', result.post)
    } catch (err) {
      context.dispatch('changePostDialog', false, { root: true })
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
      context.commit('SET_LOADING_POST', false)
    }
  }
}
