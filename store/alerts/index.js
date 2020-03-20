export const state = () => ({
  type: 'success',
  show: false,
  text: ''
})

export const getters = {
  getAlertType(state) {
    return state.type
  },
  isAlertShow(state) {
    return state.show
  },
  getAlertText(state) {
    return state.text
  },
  getAlert(state) {
    return {
      type: state.type,
      show: state.show,
      text: state.text
    }
  }
}
export const mutations = {
  SET_ALERT(state, { type, text, show }) {
    state.type = type
    state.show = show
    state.text = text
  },
  REMOVE_ALERT(state) {
    state.show = false
    state.text = ''
  },
  SET_SHOW_ALERT(state, payload) {
    state.show = payload
  }
}
export const actions = {
  changeShowAlert(context, payload) {
    context.commit('SET_SHOW_ALERT', payload)
  },
  setAlert(context, { status, message }) {
    console.log(status, message)

    status = Boolean(status) ? status : 500

    const alertType = parseInt(status / 100)

    if (Boolean(message) && Boolean(status)) {
      switch (alertType) {
        case 1:
          context.commit('SET_ALERT', {
            type: 'info',
            text: message,
            show: true
          })
          setTimeout(() => {
            context.commit('REMOVE_ALERT')
          }, 5000)
          break
        case 2:
          context.commit('SET_ALERT', {
            type: 'success',
            text: message,
            show: true
          })
          setTimeout(() => {
            context.commit('REMOVE_ALERT')
          }, 5000)
          break
        case 3:
          context.commit('SET_ALERT', {
            type: 'warning',
            text: message,
            show: true
          })
          setTimeout(() => {
            context.commit('REMOVE_ALERT')
          }, 5000)
          break
        case 4:
          context.commit('SET_ALERT', {
            type: 'error',
            text: message,
            show: true
          })
          setTimeout(() => {
            context.commit('REMOVE_ALERT')
          }, 5000)
          break
        default:
          if (message === 'jwt expired') {
            this.$auth.logout()
            this.$router.push('/sign-in')
          } else {
            context.commit(
              'setError',
              {
                status: 500,
                message: 'An error occurred'
              },
              { root: true }
            )
          }
          break
      }
    } else {
      context.commit(
        'setError',
        {
          status: 500,
          message: 'An error occurred'
        },
        { root: true }
      )
    }
  }
}
