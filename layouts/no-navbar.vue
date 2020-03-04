<template>
  <v-app>
    <nuxt />
    <app-alerts></app-alerts>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppFooter from '@/components/shared/footer/AppFooter'
import AppAlerts from '@/components/shared/AppAlerts'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AppFooter,
    AppAlerts
  },
  computed: {
    ...mapGetters({
      error: 'error',
      errorStatusCode: 'errorStatusCode'
    })
  },
  watch: {
    errorStatusCode: function(value) {
      throw this.error
    }
  }
}
</script>

<style scoped lang="scss">
</style>