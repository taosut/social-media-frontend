export const state = () => ({
  drawer: false,
  navbarMenu: false
})

export const getters = {
  drawer(state) {
    return state.drawer
  },
  navbarMenu(state) {
    return state.navbarMenu
  }
}

export const mutations = {
  changeDrawer(state, payload) {
    state.drawer = payload
  },
  changeNavbarMenu(state, payload) {
    state.navbarMenu = payload
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
    console.log('searching', payload)
  }
}
