<template>
  <v-container fluid pa-3 style="min-height: 100vh">
    <v-row>
      <!------------------------ SCREAM LIST ----------------------->
      <v-col v-if="userScreams" cols="12" sm="8" order="1" order-sm="1">
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
      <v-col v-else cols="12" sm="8" order="1">
        <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
          <AppScreamContentLoader></AppScreamContentLoader>
        </v-card>
      </v-col>
      <!------------------------ END SCREAM LIST ----------------------->

      <!------------------------ PROFILE ----------------------->
      <v-col cols="12" sm="4" order="-1" order-sm="2">
        <v-card min-height="300" min-width="150" elevation="0">
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
  computed: {
    ...mapGetters(['loadingUI', 'userSelected']),
    userScreams() {
      return this.$store.state.screams.filter(
        scream => scream.userHandle === this.$route.params.handle
      )
    }
  },
  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.scrollTo(0, 0)
    }
  },
  beforeCreate() {
    this.$store.dispatch('GET_USER', this.$route.params.handle)
    this.$store.dispatch('GET_SCREAMS')
  }
}
</script>
