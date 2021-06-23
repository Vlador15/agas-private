<template>
  <v-container ref="infinityWrapper" pa-3 style="min-height: 100vh">
    <v-row>
      <v-col v-if="isLoading" cols="12" md="8" order="1">
        <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
      </v-col>
      <!------------------------ SCREAM LIST ----------------------->
      <v-col v-else cols="12" sm="8" order="1" order-sm="1">
        <AppNewPost v-if="owner" />
        <!------------------------ SCREAM ITEM ----------------------->
        <v-card
          v-for="(scream, i) in userScreamList"
          :key="i"
          class="mb-5"
          elevation="0"
        >
          <AppScreamCard :scream="scream"></AppScreamCard>
        </v-card>
        <v-card v-if="isLoadingNext" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
        <!------------------------ END SCREAM ITEM ----------------------->
      </v-col>
      <!------------------------ END SCREAM LIST ----------------------->

      <!------------------------ PROFILE ----------------------->
      <v-col cols="12" sm="4" order="-1" order-sm="2">
        <v-card min-height="300" min-width="150" elevation="0" class="mt-3">
          <AppPerfilContentLoader v-if="loadingUI"></AppPerfilContentLoader>
          <AppProfile v-else :data="userSelected"></AppProfile>
        </v-card>
      </v-col>
      <!------------------------ END PROFILE ----------------------->
    </v-row>
  </v-container>
</template>

<script>
// COMPONENTS
import AppPerfilContentLoader from '@/components/Loaders/AppPerfilLoader.vue'
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'
import AppProfile from '@/components/Profile/AppProfile.vue'
// import AppDisabledProfile from '@/components/Profile/AppDisabledProfile.vue'
import AppScreamCard from '@/components/Scream/AppScreamCard.vue'
import infinityScroll from '@/mixins/infinityScroll'

// VUEX
import { mapGetters } from 'vuex'
// import { mapState } from 'vuex'

export default {
  components: {
    AppPerfilContentLoader,
    AppScreamContentLoader,
    AppProfile,
    // AppDisabledProfile,
    AppScreamCard
  },
  mixins: [infinityScroll],
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'loadingUI',
      'userSelected',
      'isAuthenticated',
      'userCredentials',
      'userScreamList'
    ]),
    owner() {
      if (
        this.isAuthenticated &&
        this.userCredentials &&
        this.userCredentials.userId === this.$route.params.user
      ) {
        return true
      } else return false
    }
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.scrollTo(0, 0)
    }
  },
  beforeCreate() {
    this.$store.dispatch('GET_USER', this.$route.params.user)
    // this.$store.dispatch('GET_SCREAMS')
  },
  beforeDestroy() {
    this.$store.commit('RESET_USER_SCREAMS')
  },
  async mounted() {
    if (!this.userScreamList.length) {
      await this.$store.dispatch('GET_USER_SCREAMS', {
        uid: this.$route.params.user,
        lastScreamCreatedAt: null
      })
    }
    this.isLoading = false
  },
  methods: {
    async getNext() {
      return await this.$store.dispatch('GET_USER_SCREAMS', {
        uid: this.$route.params.user,
        lastScreamCreatedAt: this.lastScream
      })
    }
  }
}
</script>
