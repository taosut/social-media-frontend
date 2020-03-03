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
              <v-text-field v-model="title" label="Post title"></v-text-field>
              <v-textarea v-model="description" label="Post description" counter="1500"></v-textarea>
            </v-card-text>
            <v-file-input v-model="file" clearable accept="image/*" label="Post image"></v-file-input>
            <v-card-actions class="d-flex align-center justify-space-between">
              <post-preview-dialog
                :title="title"
                :description="description"
                :author="{username:'marko'}"
                :image="imageUrl"
              ></post-preview-dialog>
              <v-btn>Create post</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import PostPreviewDialog from '@/components/upload/PostPreviewDialog'

export default {
  components: {
    PostPreviewDialog
  },
  data() {
    return {
      title: '',
      description: '',
      file: null,
      imageUrl: ''
    }
  },
  watch: {
    file: function(value) {
      if (!value) this.imageUrl = ''
      else {
        const reader = new FileReader()

        reader.addEventListener(
          'load',
          () => {
            this.imageUrl = reader.result
          },
          false
        )

        if (this.file) {
          reader.readAsDataURL(this.file)
        }
      }
    }
  },
  methods: {}
}
</script>

<style>
</style>