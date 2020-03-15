export default {
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
  },
  async setUserLikedPosts(context, payload) {
    console.log(payload)
    try {
      const result = await this.$axios.$put('/users/user/set-liked-posts', {
        postId: payload
      })
      console.log(result)
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

      context.commit('setUserLikedPosts', result.likedPosts)
    } catch (err) {
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
