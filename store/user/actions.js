export default {
  changeEditProfileDialog(context, payload) {
    context.commit('SET_EDIT_PROFILE_DIALOG', payload)
  },
  changeDeletePostDialog(context, payload) {
    context.commit('SET_DELETE_POST_DIALOG', payload)
  },
  changeDeleteAccountDialog(context, payload) {
    context.commit('SET_DELETE_ACCOUNT_DIALOG', payload)
  },
  setDeletePostId(context, payload) {
    context.commit('SET_DELETE_POST_ID', payload)
  },
  setProfile(context, payload) {
    context.commit('SET_PROFILE', payload)
  },
  clearUserDynamicData(context) {
    context.commit('REMOVE_USER_DYNAMIC_DATA')
  },
  removeProfilePost(context, payload) {
    context.commit('REMOVE_PROFILE_POST', payload)
  },
  async fetchUserDynamicData(context) {
    try {
      const result = await this.$axios.$get(
        '/auth/user?projection=followers following likedPosts'
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

      context.commit('SET_USER_DYNAMIC_DATA', {
        following: result.user.following,
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
    try {
      const result = await this.$axios.$put('/users/user/set-liked-posts', {
        postId: payload
      })
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

      context.commit('SET_USER_LIKED_POSTS', result.likedPosts)
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
  },
  async setUserFollowing(context, payload) {
    try {
      const result = await this.$axios.$put('/users/user/set-following', {
        userId: payload
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
      context.commit('SET_USER_FOLLOWING', result.following)
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
