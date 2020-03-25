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
  SET_USER_DYNAMIC_DATA(
    state,
    { following, followers, likedPosts, notifications }
  ) {
    state.following = following
    state.followers = followers
    state.likedPosts = likedPosts
    state.notifications = notifications
  },
  REMOVE_USER_DYNAMIC_DATA(state) {
    state.following = []
    state.followers = []
    state.likedPosts = []
    state.notifications = []
  },
  REMOVE_PROFILE_POST(state, payload) {
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
  },
  ADD_NOTIFICATION(state, payload) {
    let sameNotificationIndex = state.notifications.findIndex(
      notification =>
        notification.from === payload.from && notification.type === payload.type
    )

    if (sameNotificationIndex !== -1) {
      state.notifications[sameNotificationIndex].number++
    } else {
      state.notifications.push(payload)
    }
  },
  REMOVE_NOTIFICATION(state, payload) {
    console.log('remove chat notification', payload)
    state.notifications = state.notifications.filter(
      notification =>
        notification.type !== payload.type && notification.from !== payload.from
    )
  }
}
