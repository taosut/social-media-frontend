export const state = () => ({
  deletePostId: '',
  deletePostDialog: false,
  deleteAccountDialog: false,
  profile: null
})

export const getters = {
  deletePostId(state) {
    return state.deletePostId
  },
  deletePostDialog(state) {
    return state.deletePostDialog
  },
  deleteAccountDialog(state) {
    return state.deleteAccountDialog
  },
  profile(state) {
    return state.profile
  }
}

export const mutations = {
  setDeletePostId(state, payload) {
    state.deletePostId = payload
  },
  changeDeletePostDialog(state, payload) {
    state.deletePostDialog = payload
  },
  changeDeleteAccountDialog(state, payload) {
    state.deleteAccountDialog = payload
  },
  setProfile(state, payload) {
    state.profile = payload
  },
  removeProfilePost(state, payload) {
    console.log(payload)
    let profile = state.profile
    profile.posts = profile.posts.filter(post => {
      return post._id !== payload
    })
    profile.postsNumber -= 1

    state.profile = profile
  }
}

export const actions = {
  changeDeletePostDialog(context, payload) {
    context.commit('changeDeletePostDialog', payload)
  },
  changeDeleteAccountDialog(context, payload) {
    context.commit('changeDeleteAccountDialog', payload)
  },
  setDeletePostId(context, payload) {
    context.commit('setDeletePostId', payload)
    context.commit('changeDeletePostDialog', true)
  },
  setProfile(context, payload) {
    context.commit('setProfile', payload)
  },
  removeProfilePost(context, payload) {
    context.commit('removeProfilePost', payload)
  }
}
