<template>
  <v-switch
    class="theme-switch"
    v-model="$vuetify.theme.dark"
    :hide-details="true"
    label="Dark Theme"
  ></v-switch>
</template>

<script>
export default {
  watch: {
    '$vuetify.theme.dark': function(value) {
      this.$cookies.set('dark_theme', value, { expire: '2038-01-19 04:14:07' })
    }
  }
}
</script>

<style>
</style>