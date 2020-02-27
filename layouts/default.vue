<template>
  <v-app>
    <the-navbar></the-navbar>
    <nuxt />
    <the-navigation-drawer-chat></the-navigation-drawer-chat>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/shared/navbar/TheNavbar'
import AppFooter from '@/components/shared/footer/AppFooter'
import TheNavigationDrawerChat from '@/components/shared/navbar/TheNavigationDrawerChat'

export default {
  components: {
    TheNavbar,
    AppFooter,
    TheNavigationDrawerChat
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
