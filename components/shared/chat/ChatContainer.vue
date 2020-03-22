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
/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 5px;
  background-color: #f4f4f4;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b8b8b8f1;
  border-radius: 10px;
}
</style>