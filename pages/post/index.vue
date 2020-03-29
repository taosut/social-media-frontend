<template>
  <v-content></v-content>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Welcome to Post page'
        }
      ]
    }
  },
  validate() {
    return false
  },
  data() {
    return {
      title: 'Post Page'
    }
  }
}
</script>

<style>
</style>