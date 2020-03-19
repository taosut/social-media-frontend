export const state = () => ({
  chatboxes: [],
  recentContacts: [],
  onlinePeople: []
})

export const getters = {
  getChatboxes(state) {
    return state.chatboxes
  },
  getRecentContacts(state) {
    return state.recentContacts
  },
  getOnlinePeople(state) {
    let onlinePeople = state.onlinePeople.slice(0)

    return onlinePeople.sort((user1, user2) => {
      if (user1.username < user2.username) return -1
      else return 1
    })
  }
}

export const mutations = {
  ADD_CHATBOX(state, payload) {
    state.chatboxes.push(payload)
  },
  REMOVE_CHATBOX(state, payload) {
    state.chatboxes = state.chatboxes.filter(chatbox => {
      return chatbox.userId !== payload.userId
    })
  },
  SET_RECENT_CONTACTS(state, payload) {
    state.recentContacts = payload
  },
  SET_ONLINE_PEOPLE(state, payload) {
    state.onlinePeople = payload
  },
  ADD_ONLINE_PEOPLE(state, payload) {
    state.onlinePeople.push(payload)
  }
}

export const actions = {
  createChatbox(context, payload) {
    const chatboxExist = context.getters.getChatboxes.some(chatbox => {
      return chatbox.username === payload.username
    })
    if (!chatboxExist) context.commit('ADD_CHATBOX', payload)
    else {
      // Show alert that chat is already opened
    }
  },
  removeChatbox(context, payload) {
    context.commit('REMOVE_CHATBOX', payload)
  },
  setRecentContacts(context, payload) {
    context.commit('SET_RECENT_CONTACTS', payload)
  },
  async fetchOnlinePeople(context) {
    try {
      const result = await this.$axios.$get('/users/online')

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

      context.commit('SET_ONLINE_PEOPLE', result.onlineUsers)
    } catch (err) {
      context.dispatch(
        'alerts/setAlert',
        {
          status: 500,
          message: 'An error occured'
        },
        { root: true }
      )
    }
  },
  addOnlinePeople(context, payload) {
    context.commit('ADD_ONLINE_PEOPLE', payload)
  }
}
