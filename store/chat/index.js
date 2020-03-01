export const state = () => ({
  chatboxes: []
})

export const getters = {
  chatboxes(state) {
    return state.chatboxes
  }
}

export const mutations = {
  createChatbox(state, payload) {
    state.chatboxes.push(payload)
  },
  removeChatbox(state, payload) {
    state.chatboxes = state.chatboxes.filter(chatbox => {
      return chatbox.userId !== payload.userId
    })
  }
}

export const actions = {
  createChatbox(context, payload) {
    const chatboxExist = context.getters.chatboxes.some(chatbox => {
      return chatbox.username === payload.username
    })
    if (!chatboxExist) context.commit('createChatbox', payload)
    else {
    }
  },
  removeChatbox(context, payload) {
    context.commit('removeChatbox', payload)
  }
}
