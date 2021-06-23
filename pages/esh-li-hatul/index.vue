<template>
  <v-container ref="infinityWrapper" pa-3 style="min-height: 100vh">
    <v-row>
      <!------------------------ SCREAM LIST ----------------------->
      <v-col v-if="isLoading" cols="12" sm="8" order="1">
        <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
      </v-col>
      <v-col v-else cols="12" sm="8" order="1" order-sm="1">
        <!------------------------ SCREAM ITEM ----------------------->
        <AppNewPost v-if="owner" />
        <div v-for="(scream, i) in userScreamList" :key="i">
          <v-card class="mb-5" elevation="0">
            <AppScreamCard :scream="scream"></AppScreamCard>
          </v-card>
          <rhBanner v-if="bannerConditions(i)" />
          <v-card v-if="isLoadingNext" class="mb-5" elevation="0">
            <AppScreamContentLoader></AppScreamContentLoader>
          </v-card>
        </div>

        <!------------------------ END SCREAM ITEM ----------------------->
      </v-col>
      <!------------------------ END SCREAM LIST ----------------------->

      <!------------------------ PROFILE ----------------------->
      <v-col cols="12" sm="4" order="-1" order-sm="2">
        <v-card class="mt-3" elevation="0">
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
import rhBanner from '@/components/banners/rhBanner'
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
    AppScreamCard,
    rhBanner
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
        this.userCredentials.userId === '5aPyMl74Y4gMrnfbAPak2igSUB63'
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
  async mounted() {
    if (!this.userScreamList.length) {
      await this.$store.dispatch('GET_USER_SCREAMS', {
        uid: '5aPyMl74Y4gMrnfbAPak2igSUB63',
        lastScreamCreatedAt: null
      })
    }
    this.isLoading = false
  },
  beforeCreate() {
    this.$store.dispatch('GET_USER', '5aPyMl74Y4gMrnfbAPak2igSUB63')
    // this.$store.dispatch('GET_SCREAMS')
  },
  beforeDestroy() {
    this.$store.commit('RESET_USER_SCREAMS')
  },
  methods: {
    async getNext() {
      return await this.$store.dispatch('GET_USER_SCREAMS', {
        uid: '5aPyMl74Y4gMrnfbAPak2igSUB63',
        lastScreamCreatedAt: this.lastScream
      })
    },
    bannerConditions(i) {
      if ((i + 1) % 5 === 0) {
        return true
      }
    }
  }
}
</script>
