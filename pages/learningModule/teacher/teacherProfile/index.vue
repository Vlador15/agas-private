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
            v-for="tb in $t('teacherProfile.tabs')"
            :key="tb.link"
            :href="tb.link"
            >{{ tb.name }}</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <v-row v-if="!isLoading" style="background: #e3f2fd">
          <v-col cols="12" md="8" order="1" order-md="1" class="mt-n3">
            <v-card>
              <AppEditFormTeacher
                v-if="isAuthenticated && userCredentials"
                :data="dataTeacher"
              ></AppEditFormTeacher>
            </v-card>
          </v-col>

          <!------------------------ PROFILE----------------------->
          <v-col cols="12" md="4" order="-1" order-md="2" class="mt-3">
            <v-card min-height="300" elevation="0">
              <!-- <AppPerfilContentLoader
                v-show="isAuthenticated && !userCredentials"
              ></AppPerfilContentLoader> -->

              <!------------------------ PROFILE CARD ----------------------->
              <AppProfileTeacher
                v-if="isAuthenticated"
                :dataTeacher="dataTeacher"
                :data="userCredentials"
              ></AppProfileTeacher>
              <!------------------------ END PROFILE CARD ----------------------->

              <AppDisabledProfile
                v-show="!isAuthenticated"
              ></AppDisabledProfile>
            </v-card>

            <v-card cols="12" md="4" order="-1" order-md="2" class="mt-8">
              <AppSubscriptionTeacher :data="dataTeacher">
              </AppSubscriptionTeacher>
            </v-card>
          </v-col>
        </v-row>

        <!-- <v-spacer> </v-spacer>
        <reviews
          v-if="isAuthenticated"
          style="background: #e3f2fd"
          class="pr-16 pt-10"
          :data="feedbacks"
        >
        </reviews> -->
      </v-tab-item>

      <v-tab-item value="tab-2">
        <v-row style="background: #e3f2fd">
          <v-col cols="12" md="12" class="mt-3">
            <v-card>
              <topCourses
                v-if="isAuthenticated && userCredentials"
              ></topCourses>
            </v-card>
          </v-col>
          <v-col cols="12" md="12" class="mt-3">
            <v-card min-height="300" elevation="0">
              <botCourses
                v-if="isAuthenticated && userCredentials"
              ></botCourses>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>
      <!------------------------ END PROFILE ----------------------->
    </v-tabs-items>
  </v-container>
</template>

<script>
// COMPONENTS
// import AppPerfilContentLoader from '@/components/Loaders/AppPerfilLoader.vue'
import AppProfileTeacher from '@/components/teacherProfile/AppProfileTeacher.vue'
import AppEditFormTeacher from '@/components/teacherProfile/AppEditFormTeacher.vue'
import AppDisabledProfile from '@/components/Profile/AppDisabledProfile.vue'
import AppSubscriptionTeacher from '@/components/teacherProfile/AppSubscriptionTeacher.vue'
// import reviews from '@/components/teacherProfile/reviews.vue'
import topCourses from '@/components/teacherProfile/freeCourses/topCourses.vue'
import botCourses from '@/components/teacherProfile/freeCourses/botCourses.vue'
// VUEX
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  components: {
    AppProfileTeacher,
    AppSubscriptionTeacher,
    AppDisabledProfile,
    AppEditFormTeacher,
    topCourses,
    botCourses
  },
  data() {
    return {
      tab: null,
      isLoading: true,
      feedbacks: [],
      dataTeacher: {}
    }
  },
  computed: {
    ...mapState(['status']),
    ...mapGetters([
      'profileTeacherGet',
      'userCredentials',
      'loadingUI',
      'isAuthenticated',
      'feedbacksGet'
    ])
  },
  async mounted() {
    await this.getForm()
    await this.getFeedBacks()
    this.validTeacher()
    this.isLoading = false
    // this.fetchUser()
  },
  methods: {
    validTeacher() {
      if (!this.dataTeacher) {
        this.$router.push({
          name: `learningModule___ru`
        })
        // this.$router.push('learningModule___ru')
      }
    },
    async getForm() {
      await this.$store.dispatch('GET_FORM_TEACHER')
      this.dataTeacher = this.profileTeacherGet
      console.log(this.dataTeacher)
    },
    async getFeedBacks() {
      await this.$store.dispatch('GET_FEEDBACKS')
      this.feedbacks = this.feedbacksGet
    }
  }
}
</script>
