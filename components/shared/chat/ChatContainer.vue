<template>
  <div class="chat-container" :style="{ 'z-index':  $vuetify.breakpoint.xsOnly ? '1' : '10' }">
    <chatbox
      v-for="(chatbox, index) in getChatboxes"
      :chatbox="chatbox"
      :key="index"
      :class="{'ml-2': getChatboxes.length > 1}"
    ></chatbox>
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
  z-index: 10;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #663dfc;
  border-radius: 5px;
  background-color: #333;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #663dfc;
  border-radius: 10px;
}
</style>