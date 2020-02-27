export const state = () => ({
  drawer: false
})

export const getters = {
  drawer(state) {
    return state.drawer
  }
}

export const mutations = {
  changeDrawer(state, payload) {
    state.drawer = payload
  }
}
export const actions = {
  changeDrawer(context, payload) {
    context.commit('changeDrawer', payload)
  }
}
