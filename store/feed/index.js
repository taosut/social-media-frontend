export const state = () => ({
  fetchingFeed: false
})

export const getters = {
  fetchingFeed(state) {
    return state.fetchingFeed
  }
}

export const mutations = {
  changeFetchingFeed(state, payload) {
    state.fetchingFeed = payload
  }
}

export const actions = {
  changeFetchingFeed(context, payload) {
    context.commit('changeFetchingFeed', payload)
  }
}
