export default {
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
