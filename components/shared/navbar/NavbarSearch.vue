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
  ></v-autocomplete>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      model: null,
      search: null,
      loading: false,
      users: []
    }
  },
  computed: {
    ...mapGetters({})
  },
  watch: {
    async search(value) {
      if (!this.loading) {
        try {
          this.loading = true
          const result = await this.$axios.$get(`/users/search/${value}`)

          if (!result) users = []

          this.loading = false
          this.users = result.users
        } catch (err) {
          this.loading = false
        }
      }
    }
  },
  methods: {
    ...mapActions({})
  }
}
</script>

<style>
</style>