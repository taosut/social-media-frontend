<template>
  <v-row class="align-center justify-center">
    <v-col
      class="d-flex flex-column flex-sm-row align-center justify-center"
      cols="12"
      sm="12"
      md="11"
      lg="9"
      xl="8"
    >
      <v-col class="page-header d-flex align-start justify-center" cols="3">
        <v-avatar class="avatar-border" color="primary" size="130">
          <v-img :src="profileImage"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="page-header" cols="12" sm="7" md="6">
        <div class="d-flex align-center justify-start">
          <h2>{{ username }}</h2>
          <v-btn
            v-if="$auth.user && $route.params.profile !== $auth.user.username"
            color="primary mx-3"
            depressed
          >Follow</v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                v-if="$auth.user && $route.params.profile === $auth.user.username"
                icon
                class="mx-3"
              >
                <v-icon>mdi-cog-outline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Edit profile</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$store.dispatch('user/changeDeleteAccountDialog', true)">
                <v-list-item-icon>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Delete profile</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="d-flex align-center justify-start">
          <div>
            <span class="body-1 font-weight-bold">{{ postsNumber }}</span>
            <span class="body-1">posts</span>
          </div>
          <div class="ma-3">
            <span class="body-1 font-weight-bold">{{ followersNumber }}</span>
            <span class="body-1">followers</span>
          </div>
          <div>
            <span class="body-1 font-weight-bold">{{ followingNumber }}</span>
            <span class="body-1">following</span>
          </div>
        </div>
        <p class="ma-0 description">{{ description }}</p>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    profileImage: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    followersNumber: {
      type: Number,
      required: true
    },
    followingNumber: {
      type: Number,
      required: true
    },
    postsNumber: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-border {
  border: 5px solid rgb(228, 68, 68);
}

.description {
  white-space: pre-wrap;
}
</style>