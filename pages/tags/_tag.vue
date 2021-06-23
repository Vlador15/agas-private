<template>
  <v-container class="cont-wrap" py-3 px-6>
    <v-row justify="center">
      <!------------------------ SCREAM LIST ----------------------->
      <v-col v-if="userScreams" cols="8" sm="8" order="1" order-sm="1">
        <!------------------------ SCREAM ITEM ----------------------->
        <v-card
          v-for="(scream, i) in userScreams"
          :key="i"
          class="mb-5"
          elevation="0"
        >
          <AppScreamCard :scream="scream"></AppScreamCard>
        </v-card>
        <!------------------------ END SCREAM ITEM ----------------------->
      </v-col>
      <v-col v-else cols="8" sm="8" order="1">
        <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
      </v-col>
      <!------------------------ END SCREAM LIST ----------------------->
    </v-row>
  </v-container>
</template>

<script>
// COMPONENTS
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'
import AppScreamCard from '@/components/Scream/AppScreamCard.vue'

// VUEX
import { mapGetters } from 'vuex'
// import { mapState } from 'vuex'

export default {
  components: {
    AppScreamContentLoader,
    AppScreamCard
  },
  computed: {
    ...mapGetters(['loadingUI']),
    userScreams() {
      return this.$store.state.screams.filter(scream => {
        if (scream.tags) {
          return scream.tags.includes(this.$route.params.tag)
        }
      })
    }
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.scrollTo(0, 0)
    }
  },
  beforeCreate() {
    this.$store.dispatch('GET_SCREAMS')
  }
}
</script>
