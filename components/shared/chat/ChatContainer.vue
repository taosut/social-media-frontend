<template>
  <div class="chat-container">
    <chatbox v-for="(chatbox, index) in getChatboxes" :chatbox="chatbox" :key="index" class="mr-2"></chatbox>
  </div>
</template>

<script>
import Chatbox from '@/components/shared/chat/Chatbox'

import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Chatbox
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapGetters({
      getChatboxes: 'chat/getChatboxes'
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