<template>
  <v-content>
    <v-container>
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
              <v-img src="/avatar.png"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="page-header" cols="7" md="6">
            <div class="d-flex align-center justify-start">
              <h2>Marko Zlatar</h2>
              <v-btn color="primary mx-3" depressed>Fallow</v-btn>
            </div>
            <div class="d-flex align-center justify-start">
              <div class="cursor-pointer">
                <span class="body-1 font-weight-bold">36</span>
                <span class="body-1">posts</span>
              </div>
              <div class="ma-3 cursor-pointer">
                <span class="body-1 font-weight-bold">256k</span>
                <span class="body-1">fallowers</span>
              </div>
              <div class="cursor-pointer">
                <span class="body-1 font-weight-bold">36</span>
                <span class="body-1">fallow</span>
              </div>
            </div>
            <p>
              Description:
              <br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum ducimus eligendi veniam vero debitis. Optio vel cumque, ex aspernatur harum voluptates nisi minima consequatur sint?
            </p>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.avatar-border {
  border: 5px solid rgb(228, 68, 68);
}

.page-header {
  max-height: 250px;
  height: 250px;
}
</style>