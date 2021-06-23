<template>
  <v-list-item
    :class="data.read ? 'white' : 'background'"
    @click="viewNotification"
  >
    <v-list-item-action>
      <v-btn
        :class="
          data.read ? 'grey--text text--accent-3' : 'red--text text--darken-1'
        "
        icon
      >
        <v-icon v-show="data.type === 'like'">{{ svg.heart }}</v-icon>
        <v-icon v-show="data.type === 'comment'">{{ svg.comment }}</v-icon>
      </v-btn>
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title :class="data.read ? '' : 'text-secundario'">
        {{ data.sender }}&nbsp;&nbsp;
        <span
          v-if="data.read === false"
          class="cyan--text text--darken-1 caption font-weight-medium"
          >New</span
        >
      </v-list-item-title>
      <v-list-item-subtitle :class="data.read ? '' : 'text-secundario'">{{
        data.createdAt | day
      }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mdiHeart, mdiCommentText } from '@mdi/js'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    data: {
      type: Object
    }
  },
  data() {
    return {
      svg: {
        heart: mdiHeart,
        comment: mdiCommentText
      }
    }
  },
  methods: {
    viewNotification() {
      // TODO i18n routes

      const notificationId = [this.data.notificationId]
      if (this.data.read === false) {
        this.$store.dispatch('MARK_NOTIFICATIONS', notificationId)
        this.$store.dispatch('GET_USER', this.data.recipient)
        this.$router.push(
          `/users/${this.data.recipient}/scream/${this.data.screamId}`
        )
      } else {
        this.$store.dispatch('GET_USER', this.data.recipient)
        this.$router.push(
          `/users/${this.data.recipient}/scream/${this.data.screamId}`
        )
      }
    }
  }
}
</script>
