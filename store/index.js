export const state = () => ({
  chatDrawer: false,
  navbarMenu: false,
  postDialog: false,
  error: {
    message: '',
    statusCode: null
  }
})

export const getters = {
  isChatDrawer(state) {
    return state.chatDrawer
  },
  isNavbarMenu(state) {
    return state.navbarMenu
  },
  isPostDialog(state) {
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
  SET_CHAT_DRAWER(state, payload) {
    state.chatDrawer = payload
  },
  SET_NAVBAR_MENU(state, payload) {
    state.navbarMenu = payload
  },
  SET_POST_DIALOG(state, payload) {
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
  nuxtServerInit(vuexContext, { app, $vuetify }) {
    // CHECK AND SET THEME
    let isDarkTheme = app.$cookies.get('dark_theme')
    if (isDarkTheme) {
      $vuetify.theme.dark = isDarkTheme
    }
  },
  setError(context, payload) {
    context.commit('setError', payload)
  },
  changeChatDrawer(context, payload) {
    context.commit('SET_CHAT_DRAWER', payload)
  },
  changeNavbarMenu(context, payload) {
    context.commit('SET_NAVBAR_MENU', payload)
  },
  changePostDialog(context, payload) {
    context.commit('SET_POST_DIALOG', payload)
  }
}
