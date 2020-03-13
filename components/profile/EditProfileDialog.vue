<template>
  <v-dialog persistent v-model="editProfileDialog" max-width="550px">
    <v-card>
      <v-card-title>Edit your profile</v-card-title>
      <v-divider></v-divider>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="white" @click="$store.dispatch('user/changeEditProfileDialog', false)">Cancel</v-btn>
        <v-btn color="primary">Submit changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    editProfileDialog: {
      get() {
        return this.$store.getters['user/editProfileDialog']
      },
      set(value) {
        this.$store.dispatch('user/changeEditProfileDialog', value)
      }
    }
  }
}
</script>

<style>
</style>