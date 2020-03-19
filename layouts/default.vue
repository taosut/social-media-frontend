<template>
  <v-app>
    <the-navbar></the-navbar>
    <nuxt />
    <the-navigation-drawer-chat></the-navigation-drawer-chat>
    <post-dialog></post-dialog>
    <chat-container></chat-container>
    <app-alerts></app-alerts>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/shared/navbar/TheNavbar'
import AppFooter from '@/components/shared/footer/AppFooter'
import TheNavigationDrawerChat from '@/components/shared/navbar/TheNavigationDrawerChat'
import PostDialog from '@/components/shared/view-post/PostDialog'
import ChatContainer from '@/components/shared/chat/ChatContainer'
import AppAlerts from '@/components/shared/AppAlerts'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TheNavbar,
    AppFooter,
    TheNavigationDrawerChat,
    PostDialog,
    ChatContainer,
    AppAlerts
  },
  data() {
    return {}
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
  },
  mounted() {
    if (this.$auth.loggedIn && !this.user) {
      this.socket = this.$nuxtSocket({
        name: 'default',
        reconnect: false
      })
      console.log(this.socket)


      this.fetchOnlinePeople()
      this.fetchUserDynamicData()
    }
  },
  destroyed() {},
  methods: {
    ...mapActions({
      setError: 'setError',
      fetchUserDynamicData: 'user/fetchUserDynamicData',
      fetchOnlinePeople: 'chat/fetchOnlinePeople'
    })
  }
}
</script>
