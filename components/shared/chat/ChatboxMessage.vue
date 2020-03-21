<template>
  <v-list-item>
    <v-list-item-avatar v-if="!isLoggedUserSender">
      <v-img :src="fromUser.profileImage"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title
        class="font-weight-bold mb-2"
        :class="{'text-right': isLoggedUserSender}"
      >{{ isLoggedUserSender ? 'Me' : fromUser.username }}</v-list-item-title>
      <span
        class="body-2 pa-2"
        :class="{'grey lighten-2': isLoggedUserSender && !$vuetify.theme.dark, 'grey darken-3': isLoggedUserSender && $vuetify.theme.dark }"
        :style="{ 'border-radius': '5px' }"
      >{{ message }}</span>
    </v-list-item-content>
    <v-list-item-avatar v-if="isLoggedUserSender">
      <v-img :src="fromUser.profileImage"></v-img>
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    fromUser: {
      type: Object,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  },
  computed: {
    isLoggedUserSender() {
      if (this.fromUser._id === this.$auth.user._id) return true
      else return false
    }
  }
}
</script>

<style>
</style>