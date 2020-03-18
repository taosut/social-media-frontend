export const state = () => ({
  chatboxes: [],
  recentContacts: [],
  peopleOnline: []
})

export const getters = {
  getChatboxes(state) {
    return state.chatboxes
  },
  getRecentContacts(state) {
    return state.recentContacts
  },
  getPeopleOnline(state) {
    return state.recentContacts
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
    state.recentContacts = payload
  },
  ADD_ONLINE_PEOPLE(state, payload) {
    state.recentContacts.unshift(payload)
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
  setOnlinePeople(context, payload) {
    context.commit('SET_ONLINE_PEOPLE', payload)
  },
  addOnlinePeople(context, payload) {
    context.commit('ADD_ONLINE_PEOPLE', payload)
  }
}
