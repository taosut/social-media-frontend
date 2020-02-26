<template>
  <v-app :dark="false" :style="{height: '200vh'}">
    <the-app-navbar></the-app-navbar>
    <v-content></v-content>
    <v-footer app>
      <span>&copy; 2020 Marko Zlatar</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheAppNavbar from '@/components/shared/navbar/TheAppNavbar'

export default {
  components: {
    TheAppNavbar
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
