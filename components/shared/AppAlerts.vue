<template>
  <v-alert
    :width="$vuetify.breakpoint.xsOnly ? '95%' : '60%'"
    class="alert"
    transition="scale-transition"
    :type="getAlert.type"
    border="left"
    prominent
    dismissible
    v-model="showAlert"
  >{{ getAlert.text }}</v-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getAlert: 'alerts/getAlert'
    }),
    showAlert: {
      get() {
        return this.getAlert.show
      },
      set(value) {
        this.$store.dispatch('alerts/changeShowAlert', value)
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