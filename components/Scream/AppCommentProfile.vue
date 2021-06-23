<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-avatar size="50" class="mt-4 align-self-start">
          <img
            :src="data.userImage"
            :alt="data.userName"
            style="object-fit: cover"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-card
            color="secondary lighten-1"
            outlined
            shaped
            class="comment-card"
          >
            <v-card-text>
              <v-list-item-title>
                <span
                  class="pointer font-weight-bold text--darken-1 h6 mr-2"
                  @click="getUser"
                  >{{ data.userName }}</span
                >
                <span
                  class="post-date font-weight-light text--darken-1 caption"
                  >{{ data.createdAt | day }}</span
                >
              </v-list-item-title>
              {{ data.body }}
            </v-card-text>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    exactDay(date) {
      return dayjs(date).format('h:mm a, MMMM DD YYYY')
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    fakeImg() {
      return (
        'https://randomuser.me/api/portraits/women/41.jpg' ||
        this.data.userImage
      )
    }
  },
  methods: {
    getUser() {
      // TODO i18n routes
      this.$router.push(`/users/${this.data.userHandle}`)
      this.$store.dispatch('GET_USER', this.data.userHandle)
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-date {
  font-size: 0.7rem !important;
}

.comment-card.v-card.v-sheet--outlined {
  border-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
