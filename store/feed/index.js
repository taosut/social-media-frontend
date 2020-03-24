export const state = () => ({
  fetchingFeed: false,
  feed: [],
  moreFeedAvailable: true,
  skipPosts: 0,
  limitPosts: 20,
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
  SET_FEED(state, payload) {
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
  },
  ADD_NEW_POST(state, payload) {
    state.feed.unshift(payload)
  },
  REMOVE_FEED_POST(state, payload) {
    state.feed = state.feed.filter(post => post._id !== payload)
  },
  UPDATE_FEED_POST(state, { postIndex, post }) {
    state.feed.splice(postIndex, 1, post)
  },
  ADD_COMMENT(state, payload) {
    if (state.post) {
      state.post.comments.push(payload)
    }
  },
  REMOVE_COMMENT(state, payload) {
    if (state.post) {
      state.post.comments = state.post.comments.filter(
        comment => comment._id !== payload
      )
    }
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
    context.commit('SET_FEED', payload)
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
  removeFeedPost({ commit }, payload) {
    commit('REMOVE_FEED_POST', payload)
  },
  addNewPost({ commit, getters, rootGetters }, payload) {
    if (
      rootGetters['user/getUserFollowing'].some(
        userId => userId === payload.creator
      )
    ) {
      commit('ADD_NEW_POST', payload)
    }
  },
  updateFeedPost({ commit, getters }, payload) {
    const postIndex = getters.getFeed.findIndex(
      post => post._id === payload._id
    )
    console.log(postIndex)
    if (postIndex !== -1) {
      commit('UPDATE_FEED_POST', { postIndex, post: payload })
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
  },
  async createComment({ commit, dispatch }, { postId, text }) {
    try {
      const result = await this.$axios.$post('/comments/create-comment', {
        postId,
        text
      })

      if (!result) {
        dispatch(
          'alerts/setAlert',
          {
            status: err.response.status,
            message: err.response.data.message
          },
          { root: true }
        )
      }

      commit('ADD_COMMENT', result.comment)
    } catch (err) {
      if (err.response) {
        dispatch(
          'alerts/setAlert',
          {
            status: err.response.status,
            message: err.response.data.message
          },
          { root: true }
        )
      } else {
        dispatch(
          'alerts/setAlert',
          {
            status: 500,
            message: 'An error occured'
          },
          { root: true }
        )
      }
    }
  },
  async deleteComment({ commit, dispatch }, payload) {
    try {
      console.log(payload)
      const result = await this.$axios.$delete('/comments/delete-comment', {
        data: { commentId: payload }
      })

      if (!result) {
        dispatch(
          'alerts/setAlert',
          {
            status: err.response.status,
            message: err.response.data.message
          },
          { root: true }
        )
      }

      commit('REMOVE_COMMENT', payload)
    } catch (err) {
      if (err.response) {
        dispatch(
          'alerts/setAlert',
          {
            status: err.response.status,
            message: err.response.data.message
          },
          { root: true }
        )
      } else {
        dispatch(
          'alerts/setAlert',
          {
            status: 500,
            message: 'An error occured'
          },
          { root: true }
        )
      }
    }
  }
}
