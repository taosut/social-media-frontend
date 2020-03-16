<template>
  <v-card>
    <v-toolbar height="35px" color="grey">
      <v-toolbar-title>{{ chatbox.username }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click.stop="removeChatbox(chatbox)" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list
      max-height="370px"
      height="370px"
      width="300px"
      class="grey--text text--darken-4 chatbox-list"
      three-line
      ref="chatbox-list"
    >
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-avatar v-if="index % 2 == 0">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-bold mb-auto"
            :class="{'text-right': index % 2 != 0}"
          >username</v-list-item-title>
          <span
            class="body-2 pa-2"
            :class="{'grey lighten-2': index % 2 != 0 && !$vuetify.theme.dark, 'grey darken-3': index % 2 != 0 && $vuetify.theme.dark }"
            :style="{ 'border-radius': '5px' }"
          >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nisi ex, laudantium praesentium provident, tenetur consequatur sunt unde similique hic veritatis quo repudiandae non neque.</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions class="d-flex align-end justify-center">
      <v-text-field clearable hide-details label="Send message"></v-text-field>
      <v-btn
        @click="items.push( {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            `<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
        })"
        icon
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    chatbox: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    }
  },
  computed: {},
  mounted() {
    if (process.client) this.scrollBottom()
  },
  updated() {
    this.scrollBottom()
  },
  methods: {
    ...mapActions({
      removeChatbox: 'chat/removeChatbox'
    }),
    scrollBottom() {
      this.$refs['chatbox-list'].$el.scrollTop = this.$refs[
        'chatbox-list'
      ].$el.scrollHeight
    }
  }
}
</script>

<style scoped lang="scss">
.chatbox-list {
  &::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  overflow-y: scroll;
}
</style>