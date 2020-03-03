<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" md="7" xl="5" class="mx-auto">
          <v-card>
            <v-card-title>
              <h2 class="text-center full-width font-weight-light">New post</h2>
            </v-card-title>
            <v-card-text>
              <v-text-field label="Post title"></v-text-field>
              <v-textarea label="Post description" counter="1500"></v-textarea>
            </v-card-text>
            <v-file-input clearable accept="image/*" label="Post image"></v-file-input>
            <v-card-actions class="d-flex align-center justify-space-between">
              <v-btn>Post preview</v-btn>
              <v-btn>Create post</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {}
</script>

<style>
</style>