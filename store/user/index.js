export const state = () => ({
  deletePostId: '',
  deletePostDialog: false,
  deleteAccountDialog: false,
  editProfileDialog: false,
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
  editProfileDialog(state) {
    return state.editProfileDialog
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
  changeEditProfileDialog(state, payload) {
    state.editProfileDialog = payload
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
  changeEditProfileDialog(context, payload) {
    context.commit('changeEditProfileDialog', payload)
  },
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
