export default {
  SET_DELETE_POST_ID(state, payload) {
    state.deletePostId = payload
  },
  SET_DELETE_POST_DIALOG(state, payload) {
    state.deletePostDialog = payload
  },
  SET_DELETE_ACCOUNT_DIALOG(state, payload) {
    state.deleteAccountDialog = payload
  },
  SET_EDIT_PROFILE_DIALOG(state, payload) {
    state.editProfileDialog = payload
  },
  SET_PROFILE(state, payload) {
    state.profile = payload
  },
  SET_USER_DYNAMIC_DATA(state, { following, followers, likedPosts }) {
    state.following = following
    state.followers = followers
    state.likedPosts = likedPosts
  },
  REMOVE_USER_DYNAMIC_DATA(state) {
    state.following = []
    state.followers = []
    state.likedPosts = []
  },
  REMOVE_PROFILE_POST(state, payload) {
    console.log(payload)
    let profile = state.profile
    profile.posts = profile.posts.filter(post => {
      return post._id !== payload
    })

    state.profile = profile
  },
  SET_USER_LIKED_POSTS(state, payload) {
    state.likedPosts = payload
  },
  SET_USER_FOLLOWING(state, payload) {
    state.following = payload
  }
}
