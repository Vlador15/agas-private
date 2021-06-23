<template>
  <v-container class="cont-wrap" py-3 px-6>
    <v-row justify="center">
      <!------------------------ SCREAM LIST ----------------------->
      <v-col v-if="loadingUser" cols="12" md="8" order="1">
        <v-card class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
      </v-col>
      <v-col v-else-if="selectedScream" cols="12" md="8" order="1" order-md="1">
        <!------------------------ SCREAM ITEM ----------------------->
        <v-card class="mb-5">
          <AppScreamCard :scream="selectedScream"></AppScreamCard>
        </v-card>
        <!------------------------ END SCREAM ITEM ----------------------->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'
// COMPONENTS
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'
import AppScreamCard from '@/components/Scream/AppScreamCard.vue'

export default {
  components: {
    AppScreamCard,
    AppScreamContentLoader
  },
  async fetch() {
    await this.$store.dispatch('GET_SCREAM', this.$route.params.post)
  },
  computed: {
    ...mapGetters(['loadingUser', 'selectedScream']),
    snippet() {
      return {
        img:
          this.selectedScream &&
          this.selectedScream.imgUrls &&
          this.selectedScream.imgUrls[0] !== 'no_img'
            ? this.selectedScream.imgUrls
            : `${process.env.BASE_URL}/logo.png`,
        title:
          this.selectedScream && this.selectedScream.body
            ? this.selectedScream.body.substring(0, 250)
            : ''
      }
    }
  },
  head() {
    return {
      title: this.snippet.title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.snippet.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: ' '
        },
        {
          hid: 'description',
          name: 'description',
          content: this.snippet.title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.snippet.img
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
