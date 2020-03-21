<template>
  <v-card>
    <v-toolbar height="35px" color="grey">
      <v-toolbar-title>{{ chatbox.user.username }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click.stop="removeChatbox(chatbox)" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list
      max-height="370px"
      height="370px"
      width="300px"
      class="grey--text text--darken-4 chatbox-list"
      three-line
      ref="chatbox-list"
    >
      <p class="text-center title mt-auto" v-if="!chatbox.messages.length">Be first and say Hello</p>
      <chatbox-message
        :message="message.message"
        :createdAt="new Date(message.createdAt)"
        :fromUser="message.from"
        v-for="message in chatbox.messages"
        :key="message._id"
      ></chatbox-message>
    </v-list>
    <v-card-actions class="d-flex align-end justify-center">
      <v-text-field v-model="message.message" clearable hide-details label="Send message"></v-text-field>
      <v-btn @click="sendMessage" :disabled="false" icon>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ChatboxMessage from '@/components/shared/chat/ChatboxMessage'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ChatboxMessage
  },
  props: {
    chatbox: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      message: {
        message: '',
        to: {
          username: this.chatbox.user.username,
          profileImage: this.chatbox.user.profileImage.location
        },
        from: {
          username: this.$auth.user.username,
          profileImage: this.$auth.user.profileImage.location
        },
        createdAt: new Date()
      }
    }
  },
  computed: {},
  mounted() {
    this.chatSocket = this.$nuxtSocket({
      name: 'default',
      channel: `/chat?user1=${this.$auth.user.username}&user2=${this.chatbox.user.username}`
    })

    this.chatSocket.on('new message', message => {
      this.$store.commit('chat/ADD_CHATBOX_MESSAGE', {
        username: this.chatbox.user.username,
        message: message
      })
    })

    if (process.client) {
      this.scrollBottom()
    }
  },
  updated() {
    this.scrollBottom()
  },
  destroyed() {
    console.log('deleted chat box')
  },
  methods: {
    ...mapActions({
      removeChatbox: 'chat/removeChatbox'
    }),
    scrollBottom() {
      this.$refs['chatbox-list'].$el.scrollTop = this.$refs[
        'chatbox-list'
      ].$el.scrollHeight
    },
    sendMessage() {
      this.chatSocket.emit('new message', this.message)

      const message = Object.assign({}, this.message)

      this.$store.commit('chat/ADD_CHATBOX_MESSAGE', {
        username: this.chatbox.user.username,
        message
      })

      this.message.message = ''
    }
  }
}
</script>

<style scoped lang="scss">
.chatbox-list {
  &::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  overflow-y: scroll;
}
</style>