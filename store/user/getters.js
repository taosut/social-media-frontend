import { state } from '..'

export default {
  getDeletePostId(state) {
    return state.deletePostId
  },
  isDeletePostDialog(state) {
    return state.deletePostDialog
  },
  isDeleteAccountDialog(state) {
    return state.deleteAccountDialog
  },
  isEditProfileDialog(state) {
    return state.editProfileDialog
  },
  getProfile(state) {
    return state.profile
  },
  getUserFollowers(state) {
    return state.followers
  },
  getUserFollowing(state) {
    return state.following
  },
  getUserLikedPosts(state) {
    return state.likedPosts
  },
  getUserMessageNotifications: state => username => {
    return state.notifications.filter(
      notification =>
        notification.from === username && notification.type === 'message'
    )
  },
  getNumberOfAllNotifications(state, getters, rootState, rootGetters) {
    return state.notifications.reduce((sum, notification) => {
      let isUserInFollowing = rootGetters['chat/getOnlineUsers'].some(
        user => user.username === notification.from
      )

      if (isUserInFollowing) return sum + notification.number
      else return sum
    }, 0)
  }
}
