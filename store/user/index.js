export const state = () => ({
  deletePostId: '',
  deletePostDialog: false,
  deleteAccountDialog: false,
  editProfileDialog: false,
  profile: null,
  userData: {
    followingNumber: null,
    following: [],
    followersNumber: null,
    followers: [],
    likedPosts: []
  }
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
  },
  userData(state) {
    return state.user
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
  setUserData(state, payload) {
    state.userData = payload
  },
  clearUserdata(state) {
    state.userData = {
      followingNumber: null,
      following: [],
      followersNumber: null,
      followers: [],
      likedPosts: []
    }
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
  setUserData(context, payload) {
    context.commit('setUserData', payload)
  },
  clearUserdata(context) {
    context.commit('clearUserdata')
  },
  removeProfilePost(context, payload) {
    context.commit('removeProfilePost', payload)
  },
  async fetchUserData(context) {
    try {
      const result = await this.$axios.$get(
        '/auth/user?projection=followersNumber followers followingNumber following likedPosts'
      )

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

      context.commit('setUserData', {
        followingNumber: result.user.followingNumber,
        following: result.user.following,
        followersNumber: result.user.followersNumber,
        followers: result.user.followers,
        likedPosts: result.user.likedPosts
      })
    } catch (err) {
      if (err.response) {
        context.dispatch(
          'alerts/setAlert',
          {
            status: err.response.status,
            message: err.response.data.message
          },
          { root: true }
        )
      } else {
        context.dispatch(
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
