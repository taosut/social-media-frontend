export const state = () => ({
  drawer: false,
  navbarMenu: false,
  searchQuery: '',
  postDialog: false,
  error: {
    message: '',
    statusCode: null
  }
})

export const getters = {
  drawer(state) {
    return state.drawer
  },
  navbarMenu(state) {
    return state.navbarMenu
  },
  searchQuery(state) {
    return state.searchQuery
  },
  postDialog(state) {
    return state.postDialog
  },
  error(state) {
    return state.error
  },
  errorStatusCode(state) {
    return state.error.statusCode
  }
}

export const mutations = {
  changeDrawer(state, payload) {
    state.drawer = payload
  },
  changeNavbarMenu(state, payload) {
    state.navbarMenu = payload
  },
  changeSearchQuery(state, payload) {
    state.searchQuery = payload
  },
  changePostDialog(state, payload) {
    state.postDialog = payload
  },
  setError(state, payload) {
    state.error.statusCode = payload.status
    state.error.message = payload.message
  },
  clearError(state) {
    state.error.statusCode = null
    state.error.message = ''
  }
}
export const actions = {
  setError(context, payload) {
    context.commit('setError', payload)
  },
  changeDrawer(context, payload) {
    context.commit('changeDrawer', payload)
  },
  changeNavbarMenu(context, payload) {
    context.commit('changeNavbarMenu', payload)
  },
  searchForPeople(context, payload) {
    context.dispatch('changeNavbarMenu', false)
    context.dispatch('changeSearchQuery', '')
    console.log('searching', payload)
  },
  changeSearchQuery(context, payload) {
    context.commit('changeSearchQuery', payload)
  },
  changePostDialog(context, payload) {
    context.commit('changePostDialog', payload)
  }
}
