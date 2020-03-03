<template>
  <v-alert
    :width="$vuetify.breakpoint.xsOnly ? '95%' : '60%'"
    class="alert"
    transition="scale-transition"
    :type="alert.type"
    border="left"
    prominent
    dismissible
    v-model="showAlert"
  >{{ alert.text }}</v-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      type: ''
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alerts/alert'
    }),
    showAlert: {
      get() {
        return this.alert.show
      },
      set(value) {
        this.$store.dispatch('alerts/setShowAlert', value)
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions({})
  }
}
</script>

<style scoped lang="scss">
.alert {
  left: 50%;
  transform: translate(-50%, 0%);
  position: fixed;
  height: auto;
  bottom: 5%;
  z-index: 10000;
}
</style>