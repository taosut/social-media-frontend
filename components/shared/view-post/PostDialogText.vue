<template>
  <v-col cols="12" md="4" class="d-flex flex-column align-start justify-center">
    <div class="d-flex mt-3 flex-row align-center justify-center">
      <v-avatar size="40">
        <v-img src="/avatar.png">
          <template v-slot:placeholder>
            <v-progress-circular indeterminate color="grey"></v-progress-circular>
          </template>
        </v-img>
      </v-avatar>
      <v-badge offset-y="2" offset-x="15" :value="true" icon="mdi-check-decagram">
        <span class="mx-2 font-weight-bold">username</span>
      </v-badge>
      <span>&bullet;</span>
      <v-btn color="primary" text>Follow</v-btn>
    </div>
    <v-divider class="full-width mt-6"></v-divider>
    <v-card
      class="remove-scrollbar pt-6"
      :style="{'overflow-y': 'scroll'}"
      height="400px"
      max-height="400px"
      flat
    >
      <div v-for="n in 10" :key="n" class="d-flex my-3 flex-row align-start justify-center">
        <v-avatar size="40" class="mr-1">
          <v-img src="/avatar.png"></v-img>
        </v-avatar>
        <p class="ml-1 body-2">
          <v-badge offset-y="2" offset-x="15" :value="true" icon="mdi-check-decagram">
            <span class="mx-2 font-weight-bold ml-0">username:</span>
          </v-badge>
          <span>some random text for post description... Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        </p>
      </div>
    </v-card>
    <v-card flat width="100%" class="my-1">
      <v-divider></v-divider>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-chat</v-icon>
      </v-btn>
      <br />
      <span class="body-1 font-weight-bold">41,123 likes</span>
      <br />
      <span class="body-2">{{ new Date().toLocaleDateString() }}</span>
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
export default {}
</script>

<style scoped lang="scss">
.remove-scrollbar {
  &::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
}
</style>