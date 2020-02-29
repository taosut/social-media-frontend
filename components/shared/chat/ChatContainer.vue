<template>
  <div class="chat-container">
    <chat-box class="mr-2"></chat-box>
  </div>
</template>

<script>
import ChatBox from '@/components/shared/chat/ChatBox'

export default {
  data() {
    return {
      show: true
    }
  },
  components: {
    ChatBox
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
  z-index: 1000000;
}
</style>