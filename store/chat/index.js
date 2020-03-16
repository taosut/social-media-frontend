export const state = () => ({
  chatboxes: []
})

export const getters = {
  getChatboxes(state) {
    return state.chatboxes
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
  }
}
