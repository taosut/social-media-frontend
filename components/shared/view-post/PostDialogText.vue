<template>
  <v-col cols="12" md="4" class="d-flex flex-column align-start justify-center">
    <div class="d-flex mt-3 flex-row align-center justify-center">
      <v-avatar size="40">
        <v-img :src="creator.profileImage.location">
          <template v-slot:placeholder>
            <v-progress-circular indeterminate color="grey"></v-progress-circular>
          </template>
        </v-img>
      </v-avatar>
      <v-badge
        offset-y="2"
        offset-x="15"
        :value="this.$store.getters['user/getUserFollowers'].length > 5"
        icon="mdi-check-decagram"
      >
        <span class="mx-2 font-weight-bold">{{ creator.username }}</span>
      </v-badge>
      <span>&bullet;</span>
      <app-follow-btn v-if="creator.username !== $auth.user.username" :userId="creator._id"></app-follow-btn>
    </div>
    <v-divider class="full-width mt-6"></v-divider>
    <v-card
      class="remove-scrollbar pt-6 d-flex flex-column align-start"
      :style="{'overflow-y': 'scroll'}"
      height="400px"
      max-height="400px"
      flat
    >
      <div class="d-flex my-3 flex-row align-start justify-start">
        <v-avatar size="40" class="mr-1">
          <v-img :src="creator.profileImage.location"></v-img>
        </v-avatar>
        <p class="ml-1 body-2">
          <v-badge
            offset-y="2"
            offset-x="15"
            :value="this.$store.getters['user/getUserFollowers'].length > 5"
            icon="mdi-check-decagram"
          >
            <span class="mx-2 font-weight-bold ml-0">{{ creator.username }}:</span>
          </v-badge>
          <span>{{ showDescription }}</span>
        </p>
      </div>
      <v-btn
        v-if="postDescription.length > 100"
        @click="descriptionReadMore = !descriptionReadMore"
        fab
        x-small
        class="mb-3 mx-auto"
      >
        <v-icon>{{ descriptionReadMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      <div v-for="n in 0" :key="n" class="d-flex my-3 flex-row align-start justify-start">
        <v-avatar size="40" class="mr-1">
          <v-img src="/avatar.png"></v-img>
        </v-avatar>
        <p class="ml-1 body-2">
          <v-badge offset-y="2" offset-x="15" :value="[].length > 5" icon="mdi-check-decagram">
            <span class="mx-2 font-weight-bold ml-0">username:</span>
          </v-badge>
          <span>some random text for post description... Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        </p>
      </div>
    </v-card>
    <v-card flat width="100%" class="my-1">
      <v-divider></v-divider>
      <app-like-btn :postId="postId"></app-like-btn>
      <v-btn icon>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
      <br />
      <span
        class="body-1 font-weight-bold"
      >{{showPostLikes}} {{ showPostLikes == 1 ? 'like' : 'likes'}}</span>
      <br />
      <span
        class="body-2"
      >{{ new Date(postCreatedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' }) }}</span>
    </v-card>
    <v-card width="100%" flat>
      <v-divider></v-divider>
      <v-card-actions class="d-flex align-center justify-center">
        <v-textarea no-resize rows="2" clearable label="Enter comment"></v-textarea>
        <v-btn icon>
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import AppFollowBtn from '@/components/shared/AppFollowBtn'
import AppLikeBtn from '@/components/shared/AppLikeBtn'

import isLikedPostMixin from '@/mixins/isLikedPostMixin'

export default {
  components: {
    AppFollowBtn,
    AppLikeBtn
  },
  filters: {},
  mixins: [isLikedPostMixin],
  props: {
    postId: {
      type: String,
      required: true
    },
    postDescription: {
      type: String,
      required: true
    },
    postCreatedAt: {
      type: String,
      required: true
    },
    postLikes: {
      type: Number,
      required: true
    },
    creator: {
      type: Object,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      descriptionReadMore: false,
      alreadyLiked: false
    }
  },
  computed: {
    showDescription() {
      if (this.postDescription.length > 100) {
        if (this.descriptionReadMore) return this.postDescription
        else return this.postDescription.slice(0, 97) + '...'
      } else {
        return this.postDescription
      }
    },
    showPostLikes() {
      if (!this.alreadyLiked) {
        if (this.isLikedPost) {
          return this.postLikes + 1
        }
        return this.postLikes
      } else {
        if (this.isLikedPost) {
          return this.postLikes
        }
        return this.postLikes - 1
      }
    }
  },
  mounted() {
    this.alreadyLiked = this.isLikedPost ? true : false
  }
}
</script>

<style scoped lang="scss">
.remove-scrollbar {
  &::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
}
</style>