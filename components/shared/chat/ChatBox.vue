<template>
  <v-card>
    <v-toolbar height="35px" color="grey">
      <v-toolbar-title>{{ chatbox.username }}</v-toolbar-title>

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
      <chatbox-message
        :message="message.message"
        :createdAt="message.createdAt"
        :fromUser="message.from"
        v-for="message in messages"
        :key="message._id"
      ></chatbox-message>
    </v-list>
    <v-card-actions class="d-flex align-end justify-center">
      <v-text-field clearable hide-details label="Send message"></v-text-field>
      <v-btn icon>
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
      messages: [
        {
          to: {
            _id: '123123123',
            profileImage: this.$auth.user.profileImage.location,
            username: this.chatbox.username
          },
          from: {
            _id: '123123123' || this.$auth.user._id,
            profileImage: this.$auth.user.profileImage.location,
            username: this.$auth.user.username
          },
          createdAt: new Date(),
          message:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, placeat enim quo iusto id, distinctio quos beatae aspernatur vero, sit non exercitationem laborum voluptates possimus hic consequuntur perferendis tempore velit illo quas aliquam voluptatibus officia! Veniam sed voluptatem modi atque quo quod ut consequatur obcaecati necessitatibus fugiat, dolorum quisquam dignissimos esse distinctio nihil voluptatum in. Non voluptatem deleniti, incidunt illo nihil architecto hic nemo veniam quam saepe asperiores molestiae necessitatibus sint dolorem fuga aliquam itaque fugit, quia voluptates quisquam? Praesentium quae nulla nemo sit suscipit eius temporibus? Excepturi dolore soluta nesciunt, iusto consectetur repellat earum repellendus voluptatum non temporibus ducimus necessitatibus nihil itaque ipsam animi magnam iste cum eveniet provident, quibusdam dolorum, asperiores molestiae dolores! Omnis ratione minima dolore. In tempora aliquid autem debitis non praesentium aliquam itaque quidem doloribus eius, amet voluptas deserunt placeat ut maxime possimus consequatur a impedit! Repudiandae veniam commodi, voluptas quis culpa eius asperiores iste natus nam quia! Itaque ea laboriosam, explicabo quo reiciendis similique nostrum modi commodi necessitatibus nisi, alias dolor aspernatur, molestias ipsum iste repellendus. Porro in placeat repudiandae neque maiores doloremque quam odit dolorum tempora quas velit tempore iste animi eius earum odio modi iusto assumenda explicabo suscipit, fugiat eum soluta officiis!',
          _id: '123123123123'
        }
      ]
    }
  },
  computed: {},
  mounted() {
    console.log('created chat box')
    if (process.client) this.scrollBottom()
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