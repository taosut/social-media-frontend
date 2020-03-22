export const state = () => ({
  chatboxes: [],
  recentContacts: [],
  onlineUsers: []
})

export const getters = {
  getChatboxes(state) {
    return state.chatboxes
  },
  getRecentContacts(state) {
    return state.recentContacts
  },
  getOnlineUsers(state) {
    let onlineUsers = state.onlineUsers.slice(0)

    return onlineUsers.sort((user1, user2) => {
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
    console.log(payload)
    state.chatboxes = state.chatboxes.filter(chatbox => {
      return chatbox.user.username !== payload.user.username
    })
  },
  SET_RECENT_CONTACTS(state, payload) {
    state.recentContacts = payload
  },
  SET_ONLINE_PEOPLE(state, payload) {
    state.onlineUsers = payload
  },
  ADD_ONLINE_PEOPLE(state, payload) {
    state.onlineUsers.push(payload)
  },
  REMOVE_ONLINE_PEOPLE(state, payload) {
    let onlineUsers = state.onlineUsers.splice(0)

    if (onlineUsers.some(user => user._id === payload)) {
      onlineUsers = onlineUsers.filter(user => {
        return user._id !== payload
      })
      state.onlineUsers = onlineUsers
    }
  },
  SET_CHATBOX_MESSAGES(state, { username, messages }) {
    let chatboxIndex = state.chatboxes.findIndex(
      chatbox => chatbox.user.username === username
    )

    state.chatboxes[chatboxIndex].messages = messages
  },
  ADD_CHATBOX_MESSAGE(state, { username, message }) {
    console.log(username, message)
    let chatboxIndex = state.chatboxes.findIndex(
      chatbox => chatbox.user.username === username
    )

    state.chatboxes[chatboxIndex].messages.push(message)
  },
  ADD_CHAT_NOTIFICATION(state, payload) {
    let onlineUser = state.onlineUsers.find(
      onlineUser => onlineUser.username === payload
    )

    if (onlineUser) {
      if (onlineUser.notifications) onlineUser.notifications++
      else onlineUser.notifications = 1

      let onlineUsers = state.onlineUsers.slice(0)

      state.onlineUsers = onlineUsers
    }
  },
  REMOVE_CHAT_NOTIFICATIONS(state, payload) {
    let onlineUser = state.onlineUsers.find(
      onlineUser => onlineUser.username === payload
    )

    if (onlineUser) {
      onlineUser.notifications = 0

      let onlineUsers = state.onlineUsers.slice(0)

      state.onlineUsers = onlineUsers
    }
  }
}

export const actions = {
  createChatbox(context, payload) {
    const chatboxExist = context.getters.getChatboxes.some(chatbox => {
      return chatbox.user.username === payload.username
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
  addUserToOnlineUsers({ commit, getters, rootGetters }, payload) {
    let isNotUserAlreadyOnline = getters.getOnlineUsers.every(
      user => user._id !== payload._id
    )

    let isUserInFollowing = rootGetters['user/getUserFollowing'].some(
      userId => userId === payload._id
    )

    if (
      isUserInFollowing &&
      isNotUserAlreadyOnline &&
      this.$auth.user._id !== payload._id
    )
      commit('ADD_ONLINE_PEOPLE', payload)
  },
  async fetchOnlineUsers(context) {
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
  async fetchMessages({ commit, dispatch }, payload) {
    try {
      const result = await this.$axios.$get(
        `/messages/get-private-messages?username1=${this.$auth.user.username}&username2=${payload}`
      )
      console.log(result)
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

      commit('SET_CHATBOX_MESSAGES', {
        username: payload,
        messages: result.messages
      })
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
