<template>
  <v-dialog
    v-model="postDialog"
    :width=" $vuetify.breakpoint.xsOnly ? '100%' :'80%'"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    transition="scroll-y-transition"
  >
    <v-card class="d-flex flex-column justify-center">
      <v-btn
        @click="$store.dispatch('changePostDialog', false)"
        absolute
        :style="{top: '5px', right: '5px', 'z-index': '1'}"
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div
        v-if="getPost && !isLoadingPost"
        class="ma-0 px-6 d-flex flex-column flex-md-row align-center justify-center"
      >
        <v-col class="pa-0 m-0" cols="12" md="8">
          <v-img
            :class="{'mr-6': $vuetify.breakpoint.mdAndUp, 'mt-6': $vuetify.breakpoint.smAndDown}"
            max-height="700px"
            contain
            :src="getPost.image.location"
          ></v-img>
        </v-col>
        <post-dialog-text
          :creator="getPost.creator"
          :postDescription="getPost.description"
          :postId="getPost._id"
          :comments="getPost.comments"
          :postLikes="getPost.likes"
          :postCreatedAt="getPost.createdAt"
        ></post-dialog-text>
      </div>
      <v-progress-circular
        class="mx-auto progress"
        v-else
        indeterminate
        size="64"
        width="6"
        color="primary"
      ></v-progress-circular>
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
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getPost: 'feed/getPost',
      isLoadingPost: 'feed/isLoadingPost'
    }),
    postDialog: {
      get() {
        return this.$store.getters.isPostDialog
      },
      set(value) {
        this.$store.dispatch('changePostDialog', value)
      }
    }
  },
  watch: {
    $route(to, from) {
      if (this.$store.getters.isPostDialog)
        this.$store.dispatch('changePostDialog', false)
    }
  },
  methods: {
    ...mapActions({})
  }
}
</script>

<style scoped lang="scss">
.progress {
  margin: 25vh auto;
}
</style>