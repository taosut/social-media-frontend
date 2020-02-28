<template>
  <v-navigation-drawer
    v-model="changeNavDrawer"
    app
    clipped
    right
    :permanent="$vuetify.breakpoint.mdAndUp"
  >
    <v-list-item>
      <v-list-item-content>
        <v-col cols="9">
          <v-list-item-title class="title">Chat</v-list-item-title>
        </v-col>
        <v-col class="hidden-md-and-up" cols="3">
          <button @click="changeDrawer(false)" icon>
            <v-icon>mdi-close</v-icon>
          </button>
        </v-col>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-subheader>Recent chat</v-subheader>
      <v-list-item @click="openChat" v-for="n in 5" :key="n">
        <v-list-item-avatar>
          <v-img src="/avatar.png"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="'First ' + 'Last'"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>mdi-message</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-group value="true">
        <template v-slot:activator>
          <v-list-item-title>Online friends</v-list-item-title>
        </template>
        <v-list-item @click="openChat" v-for="n in 5" :key="n">
          <v-list-item-avatar>
            <v-img src="/avatar.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="'First ' + 'Last'"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-message</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({}),
    changeNavDrawer: {
      get() {
        return this.$store.getters.drawer
      },
      set(value) {
        this.changeDrawer(value)
      }
    }
  },
  watch: {},
  methods: {
    ...mapActions({
      changeDrawer: 'changeDrawer'
    }),
    openChat() {
      console.log('chat oppened')
    }
  }
}
</script>

<style>
</style>