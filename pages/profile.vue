<template>
  <v-container class="cont-wrap" py-3 px-6>
    <v-row>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          background-color="#E3F2FD"
          corol="primary"
          centered
          icons-and-text
          show-arrows
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            v-for="tb in $t('profile.tabs')"
            :key="tb.link"
            :href="tb.link"
            >{{ tb.name }}</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <v-row style="background: #e3f2fd">
          <v-col cols="12" md="8" order="1" order-md="1" class="mt-3">
            <v-card>
              <AppEditForm
                v-if="isAuthenticated && userCredentials"
                :data="userCredentials"
              ></AppEditForm>
            </v-card>
          </v-col>
          <!------------------------ PROFILE----------------------->
          <v-col cols="12" md="4" order="-1" order-md="2" class="mt-3">
            <v-card min-height="300" elevation="0">
              <AppPerfilContentLoader
                v-show="isAuthenticated && !userCredentials"
              ></AppPerfilContentLoader>

              <!------------------------ PROFILE CARD ----------------------->
              <AppProfile
                v-if="isAuthenticated"
                :data="userCredentials"
              ></AppProfile>
              <!------------------------ END PROFILE CARD ----------------------->

              <AppDisabledProfile
                v-show="!isAuthenticated"
              ></AppDisabledProfile>
            </v-card>
          </v-col>
        </v-row>
        <!------------------------ END PROFILE ----------------------->
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-row style="background: #e3f2fd" justify="center">
          <v-col v-if="isLoading" cols="12" md="8" order="1">
            <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
              <AppScreamContentLoader></AppScreamContentLoader>
            </v-card>
          </v-col>
          <v-col
            v-if="isAuthenticated && userCredentials"
            cols="12"
            sm="8"
            order="1"
            order-sm="1"
          >
            <!------------------------ NEW SCREAM ITEM ----------------------->
            <AppNewPost />
            <!------------------------ END NEW SCREAM ITEM ---------------------->

            <!------------------------ SCREAM LIST ----------------------->
            <!------------------------ SCREAM ITEM ----------------------->
            <v-card
              v-for="(scream, i) in userScreams"
              :key="i"
              class="mb-6"
              hover
            >
              <AppScreamCard :scream="scream"></AppScreamCard>
            </v-card>
            <!------------------------ END SCREAM ITEM ----------------------->
            <!------------------------ END SCREAM LIST ----------------------->
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
// COMPONENTS
import AppPerfilContentLoader from '@/components/Loaders/AppPerfilLoader.vue'
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'
import AppProfile from '@/components/Profile/AppProfile.vue'
import AppEditForm from '@/components/Profile/AppEditForm.vue'
import AppDisabledProfile from '@/components/Profile/AppDisabledProfile.vue'
import AppScreamCard from '@/components/Scream/AppScreamCard.vue'
import AppNewPost from '@/components/Scream/AppNewPost.vue'

// VUEX
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  components: {
    AppScreamContentLoader,
    AppScreamCard,
    AppProfile,
    AppDisabledProfile,
    AppPerfilContentLoader,
    AppNewPost,
    AppEditForm
  },
  data() {
    return {
      tab: null,
      isLoading: true
    }
  },
  computed: {
    ...mapState(['screams', 'status']),
    ...mapGetters([
      'userCredentials',
      'screamList',
      'loadingUI',
      'isAuthenticated'
    ]),
    userScreams() {
      return this.screamList.filter(
        scream => scream.userHandle === this.userCredentials.handle
      )
    }
  },
  mounted() {
    this.getNext()
    // this.fetchUser()
  },
  methods: {
    // async fetchUser() {
    //   if (!this.userCredentials)
    //   await this.$store.dispatch('FETCH_AUTH_USER')
    // },
    async getNext() {
      if (!this.screamList.length) {
        await this.$store.dispatch('GET_SCREAMS')
      }
      this.isLoading = false
    }
  }
}
</script>
