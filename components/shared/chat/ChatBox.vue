<template>
  <v-card>
    <v-toolbar height="35px" color="#663dfc" class="white--text">
      <v-toolbar-title>{{ chatbox.user.username }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="white" x-small @click.stop="removeChatbox(chatbox)" icon>
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
        :username="message.from"
        :profileImage="message.from === $auth.user.username ? $auth.user.profileImage.location : chatbox.user.profileImage.location"
        v-for="message in chatbox.messages"
        :key="message._id"
      ></chatbox-message>
    </v-list>
    <v-card-actions class="d-flex align-end justify-center">
      <v-text-field
        @keypress.enter="sendMessage"
        v-model="message.message"
        clearable
        hide-details
        label="Send message"
      ></v-text-field>
      <v-btn @click="sendMessage" :disabled="$v.$invalid" icon>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ChatboxMessage from '@/components/shared/chat/ChatboxMessage'

import { validationMixin } from 'vuelidate'
import { maxLength, required } from 'vuelidate/lib/validators'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    ChatboxMessage
  },
  mixins: [validationMixin],
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
        to: this.chatbox.user.username,
        from: this.$auth.user.username,
        createdAt: ''
      }
    }
  },
  validations: {
    message: {
      message: {
        required,
        maxLength: maxLength(2000)
      }
    }
  },
  computed: {},
  mounted() {
    this.$store.dispatch('chat/fetchMessages', this.chatbox.user.username)

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
  destroyed() {},
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
      if (!this.$v.$invalid) {
        this.message.createdAt = new Date()
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