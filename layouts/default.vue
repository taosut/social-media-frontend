<template>
  <v-app :dark="false" :style="{height: '200vh'}">
    <the-navbar></the-navbar>
    <v-content></v-content>
    <v-footer app>
      <span>&copy; 2020 Marko Zlatar</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/shared/navbar/TheNavbar'

export default {
  components: {
    TheNavbar
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
