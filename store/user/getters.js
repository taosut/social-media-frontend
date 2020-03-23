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
    console.log(state.notifications, username)
    return state.notifications.filter(
      notification =>
        notification.from === username && notification.type === 'message'
    )
  }
}
