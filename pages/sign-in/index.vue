<template>
  <v-content>
    <v-container>
      <v-row class="align-center justify-center row--height">
        <v-col cols="12" sm="8" md="6" xl="4">
          <v-card outlined>
            <v-card-text>
              <v-card-title class="d-flex align-center justify-center">
                <h1>LOGO</h1>
              </v-card-title>
              <v-text-field label="Enter email"></v-text-field>
              <v-text-field label="Enter password"></v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex flex-column justify-center">
              <v-btn block>Login</v-btn>
              <p class="my-2 text-center or-paragraph full-width">or</p>
              <v-btn block>Sign In</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  layout: 'auth'
}
</script>

<style lang="scss" scoped>
.or-paragraph {
  position: relative;
  &::before {
    content: '';
    width: 40%;
    border: 0.2px solid hsla(0, 0%, 0%, 0.2);
    position: absolute;
    transform: translate(-110%, 10px);
  }
  &::after {
    content: '';
    width: 40%;
    border: 0.2px solid hsla(0, 0%, 0%, 0.2);
    position: absolute;
    transform: translate(10%, 10px);
  }
}

.row--height {
  min-height: 90vh;
}
</style>