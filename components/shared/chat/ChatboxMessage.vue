<template>
  <v-list-item>
    <v-list-item-avatar v-if="!isLoggedUserSender">
      <v-img :src="profileImage"></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold" :class="{'text-right': isLoggedUserSender}">
        <span class="body-2 grey--text">{{ createdAt.toLocaleString() }}</span>
        <br />
        <span>{{ isLoggedUserSender ? 'Me' : username }}</span>
      </v-list-item-title>
      <p class="ma-0 d-flex align-center" :class="{ 'justify-end': isLoggedUserSender }">
        <span
          class="body-2 pa-2"
          :class="{
            'grey lighten-2': isLoggedUserSender && !$vuetify.theme.dark, 
            'grey lighten-4': !isLoggedUserSender && !$vuetify.theme.dark , 
            'grey darken-3': isLoggedUserSender && $vuetify.theme.dark, 
            'grey darken-2': !isLoggedUserSender && $vuetify.theme.dark }"
          :style="{ 'border-radius': '5px', width: 'auto' }"
        >{{ message }}</span>
      </p>
    </v-list-item-content>
    <v-list-item-avatar v-if="isLoggedUserSender">
      <v-img :src="profileImage"></v-img>
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
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    profileImage: {
      type: String,
      required: true
    }
  },
  computed: {
    isLoggedUserSender() {
      if (this.username === this.$auth.user.username) return true
      else return false
    }
  }
}
</script>

<style>
</style>