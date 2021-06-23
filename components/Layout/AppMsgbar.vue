<template>
  <div class="msg-sidebar">
    <v-navigation-drawer fixed right clipped app :mini-variant.sync="mini">
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link two-line>
          <v-badge
            v-if="item.online"
            bordered
            bottom
            color="light-green"
            dot
            offset-x="10"
            offset-y="10"
            class="mr-4"
          >
            <v-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-avatar>
          </v-badge>
          <v-avatar v-else class="mr-4">
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn
        class="mx-3"
        dark
        text
        icon
        color="blue lighten-1"
        @click="toggleMsgbar"
      >
        <v-icon dark>mdi-arrow-{{ mini ? 'left' : 'right' }} </v-icon>
      </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mini: true
    }
  },
  methods: {
    toggleMsgbar() {
      this.mini = !this.mini
      if (this.mini) {
        document.querySelector('.msg-sidebar').classList.add('mini')
      } else {
        document.querySelector('.msg-sidebar').classList.remove('mini')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-sidebar {
  .v-navigation-drawer--mini-variant {
    .v-list-item {
      padding-left: 4px;
    }
  }
}
</style>
