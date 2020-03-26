<template>
  <v-navigation-drawer
    v-model="changeNavDrawer"
    app
    clipped
    right
    :permanent="$vuetify.breakpoint.mdAndUp && $auth.loggedIn"
    hide-overlay
  >
    <v-list-item>
      <v-list-item-content>
        <v-col v-if="$auth && $auth.loggedIn" cols="9" class="d-flex align-center justify-center">
          <v-list-item-avatar size="60px">
            <v-avatar>
              <v-img :src="$auth.user.profileImage.location"></v-img>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title class="title">{{ $auth.user.username }}</v-list-item-title>
        </v-col>
        <v-col v-else class="d-flex align-center justify-center">
          <v-list-item-title>Chat</v-list-item-title>
        </v-col>
        <v-col class="hidden-md-and-up" cols="3">
          <button @click="changeChatDrawer(false)" icon>
            <v-icon>mdi-close</v-icon>
          </button>
        </v-col>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>People online</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-if="!onlineUsers.length"></v-list-item>
        <v-list-item
          v-else
          @click="openChat({user: user, messages: []})"
          v-for="user in onlineUsers"
          :key="user._id"
        >
          <v-list-item-avatar>
            <v-img :src="user.profileImage.location"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>
          <v-badge
            color="red"
            :content="Boolean(messageNotifications(user.username).length) ?  messageNotifications(user.username)[0].number : ''"
            :value="Boolean(messageNotifications(user.username).length)"
            offset-y="20"
            offset-x="30"
          >
            <v-list-item-icon>
              <v-icon>mdi-message</v-icon>
            </v-list-item-icon>
          </v-badge>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      recentContacts: 'chat/getRecentContacts',
      onlineUsers: 'chat/getOnlineUsers',
      messageNotifications: 'user/getUserMessageNotifications'
    }),
    changeNavDrawer: {
      get() {
        return this.$store.getters.isChatDrawer
      },
      set(value) {
        this.changeChatDrawer(value)
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapActions({
      changeChatDrawer: 'changeChatDrawer',
      createChatbox: 'chat/createChatbox'
    }),
    openChat(data) {
      this.$store.dispatch('chat/removeChatNotification', data.user.username)
      this.createChatbox(data)
    }
  }
}
</script>

<style>
</style>