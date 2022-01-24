<template>
  <v-container ref="infinityWrapper" class="cont-wrap" py-3 px-6>
    <v-row justify="center">
      <!------------------------ SCREAM LIST ----------------------->
      <v-col v-if="isLoading" cols="12" md="8" order="1">
        <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
      </v-col>
      <v-col v-else cols="12" md="8" order="1" order-md="1">
        <!------------------------ NEW SCREAM ITEM ----------------------->
        <AppNewPost v-if="isAuthenticated" />
        <!------------------------ END NEW SCREAM ITEM ---------------------->
        <!------------------------ SCREAM ITEM ----------------------->
        <v-card v-for="(scream, i) in screamList" :key="i" class="mb-5">
          <AppScreamCard :scream="scream"></AppScreamCard>
        </v-card>
        <v-card v-if="isLoadingNext" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
        <!------------------------ END SCREAM ITEM ----------------------->
      </v-col>

      <!------------------------ END SCREAM LIST ----------------------->
    </v-row>
  </v-container>
</template>

<script>
// COMPONENTS
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'
import AppScreamCard from '@/components/Scream/AppScreamCard.vue'
import AppNewPost from '@/components/Scream/AppNewPost.vue'
import infinityScroll from '@/mixins/infinityScroll'

// VUEX
import { mapGetters } from 'vuex'

export default {
  components: {
    AppScreamCard,
    AppScreamContentLoader,
    AppNewPost
  },
  mixins: [infinityScroll],
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'userCredentials',
      'screamList',
      'loadingUI',
      'isAuthenticated'
    ])
  },
  beforeDestroy() {
    this.$store.commit('RESET_SCREAMS')
  },
  async mounted() {
    // this.getProducts()
    if (!this.screamList.length) {
      await this.$store.dispatch('GET_LAST_SCREAMS', null)
    }
    this.isLoading = false
  },
  methods: {
    async getNext() {
      return await this.$store.dispatch('GET_LAST_SCREAMS', this.lastScream)
    },
    async getProducts() {
      await this.$store.dispatch('GET_PRODUCTS')
    }
  }
}
</script>
