export const state = () => ({
  type: 'success',
  show: false,
  text: ''
})

export const getters = {
  alertType(state) {
    return state.type
  },
  alertShow(state) {
    return state.show
  },
  alertText(state) {
    return state.text
  },
  alert(state) {
    return {
      type: state.type,
      show: state.show,
      text: state.text
    }
  }
}
export const mutations = {
  setAlert(state, payload) {
    state.type = payload.type
    state.show = payload.show
    state.text = payload.text
  },
  clearAlert(state) {
    state.show = false
    state.text = ''
  },
  setShowAlert(state, payload) {
    state.show = payload
  }
}
export const actions = {
  setShowAlert(context, payload) {
    context.commit('setShowAlert', payload)
  },
  setAlert(context, payload) {
    const alertType = parseInt(payload.status / 100)
    if (Boolean(payload.message) && Boolean(payload.status)) {
      switch (alertType) {
        case 1:
          context.commit('setAlert', {
            type: 'info',
            text: payload.message,
            show: true
          })
          setTimeout(() => {
            context.commit('clearAlert')
          }, 5000)
          break
        case 2:
          context.commit('setAlert', {
            type: 'success',
            text: payload.message,
            show: true
          })
          setTimeout(() => {
            context.commit('clearAlert')
          }, 5000)
          break
        case 3:
          context.commit('setAlert', {
            type: 'warning',
            text: payload.message,
            show: true
          })
          setTimeout(() => {
            context.commit('clearAlert')
          }, 5000)
          break
        case 4:
          context.commit('setAlert', {
            type: 'error',
            text: payload.message,
            show: true
          })
          setTimeout(() => {
            context.commit('clearAlert')
          }, 5000)
          break
        default:
          // set Error;
          break
      }
    } else {
      // set Error;
    }
  }
}
