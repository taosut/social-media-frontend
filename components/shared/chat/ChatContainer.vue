<template>
  <div class="chat-container">
    <chat-box v-for="(chatbox, index) in chatboxes" :chatbox="chatbox" :key="index" class="mr-2"></chat-box>
  </div>
</template>

<script>
import ChatBox from '@/components/shared/chat/ChatBox'

import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ChatBox
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters({
      chatboxes: 'chat/chatboxes'
    })
  },
  methods: {
    ...mapActions({})
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  position: fixed;
  bottom: 36px;
  left: 8px;
  display: flex;
  width: auto;
  height: auto;
  max-width: 100%;
  overflow-x: scroll;
  z-index: 100;
}
</style>