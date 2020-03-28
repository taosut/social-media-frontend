<template>
  <v-app>
    <app-theme-switch class="theme-switch"></app-theme-switch>
    <nuxt />
    <app-alerts></app-alerts>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppFooter from '@/components/shared/footer/AppFooter'
import AppAlerts from '@/components/shared/AppAlerts'
import AppThemeSwitch from '@/components/shared/AppThemeSwitch'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AppFooter,
    AppAlerts,
    AppThemeSwitch
  },
  computed: {
    ...mapGetters({
      getError: 'getError',
      getErrorStatusCode: 'getErrorStatusCode'
    })
  },
  watch: {
    getErrorStatusCode: function(value) {
      throw this.getError
    }
  },
  mounted() {
    if (process.client) {
      this.$vuetify.theme.dark = this.$cookies.get('dark_theme')
    }
  }
}
</script>

<style scoped lang="scss">
.theme-switch {
  position: fixed;
  top: 0px;
  right: 10px;
  z-index: 1;
}
</style>