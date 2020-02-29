<template>
  <div class="loader" v-if="loading">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.loader {
  background: rgb(255, 255, 255);
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  z-index: 10000;
}
</style>