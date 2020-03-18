<template>
  <v-navigation-drawer
    v-model="changeNavDrawer"
    app
    clipped
    right
    :permanent="$vuetify.breakpoint.mdAndUp"
    hide-overlay
  >
    <v-list-item>
      <v-list-item-content>
        <v-col cols="9">
          <v-list-item-title class="title">Chat</v-list-item-title>
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
      <v-subheader>Recent contacts</v-subheader>
      <v-list-item @click="openChat(user)" v-for="user in recentContacts" :key="user._id">
        <v-list-item-avatar>
          <v-img src="/avatar.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>mdi-message</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>People online</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-if="!peopleOnline.length"></v-list-item>
        <v-list-item v-else @click="openChat(user)" v-for="user in peopleOnline" :key="user._id">
          <v-list-item-avatar>
            <v-img src="/avatar.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-message</v-icon>
          </v-list-item-icon>
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
      peopleOnline: 'chat/getPeopleOnline'
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
  methods: {
    ...mapActions({
      changeChatDrawer: 'changeChatDrawer',
      createChatbox: 'chat/createChatbox'
    }),
    openChat() {
      console.log('chat oppened')
      this.createChatbox({ userId: Date.now().toString(), username: 'marko' })
    }
  }
}
</script>

<style>
</style>