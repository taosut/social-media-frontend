<template>
  <v-text-field
    @keypress.enter="searchForPeople(searchQuery)"
    solo
    dense
    clearable
    hide-details
    label="Search for people"
    append-icon="mdi-magnify"
    rounded
    v-model="searchQuery"
  ></v-text-field>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({}),
    searchQuery: {
      get() {
        return this.$store.getters.searchQuery
      },
      set(value) {
        this.$store.dispatch('changeSearchQuery', value)
      }
    }
  },
  methods: {
    ...mapActions({
      searchForPeople: 'searchForPeople'
    })
  }
}
</script>

<style>
</style>