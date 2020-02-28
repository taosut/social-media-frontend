export const state = () => ({
  drawer: false,
  navbarMenu: false,
  searchQuery: ''
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
  }
}
export const actions = {
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
  }
}
