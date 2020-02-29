<template>
  <v-dialog v-model="postDialog" width="80%">
    <v-card>
      <div class="ma-0 px-6 d-flex flex-column flex-md-row align-center justify-center">
        <v-col class="pa-0 m-0" cols="12" md="8">
          <v-img class="mr-6" max-height="700px" contain src="/feed-img.jpg"></v-img>
        </v-col>
        <post-dialog-text></post-dialog-text>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import PostDialogText from '@/components/shared/view-post/PostDialogText'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PostDialogText
  },
  computed: {
    ...mapGetters({}),
    postDialog: {
      get() {
        return this.$store.getters.postDialog
      },
      set(value) {
        this.$store.dispatch('changePostDialog', value)
      }
    }
  },
  methods: {
    ...mapActions({})
  }
}
</script>

<style scoped lang="scss">
</style>