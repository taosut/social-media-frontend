<template>
  <v-autocomplete
    solo
    dense
    clearable
    hide-details
    label="Search for people"
    rounded
    v-model="model"
    :search-input.sync="search"
    :loading="loading"
    :items="users"
    hide-no-data
    return-object
    item-text="username"
    item-value="username"
    hint
  >
    <template v-slot:item="data">
      <template>
        <v-list-item @click="goToProfile(data.item.username)">
          <v-list-item-avatar>
            <v-img :src="data.item.profileImage.location"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.username"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      model: null,
      search: null,
      loading: false,
      users: [],
      searchDeley: false
    }
  },
  computed: {
    ...mapGetters({})
  },
  watch: {
    async search(value) {
      if (!this.loading && value && !this.searchDeley) {
        try {
          this.searchDeley = true
          setTimeout(() => (this.searchDeley = false), 300)
          this.loading = true
          const result = await this.$axios.$get(`/users/search/${value}`)

          if (!result) users = []

          this.users = result.users
        } finally {
          this.loading = false
        }
      }
    }
  },
  methods: {
    ...mapActions({}),
    goToProfile(username) {
      this.$router.push(`/${username}`)
      this.model = null
      this.search = null
      this.users = []
    }
  }
}
</script>

<style>
</style>