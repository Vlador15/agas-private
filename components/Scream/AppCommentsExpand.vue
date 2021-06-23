<template>
  <!------------------------ COMMENTS ----------------------->
  <v-card-text class="pa-0">
    <div v-if="data.commentCount > 0">
      <!---------------------  COMMENTS PROFILE------------------->
      <div v-if="comments" class="mt-5">
        <AppCommentProfile
          v-for="(commentProfile, i) in comments"
          :key="i"
          :data="commentProfile"
        >
        </AppCommentProfile>
        <v-divider></v-divider>
      </div>
      <!-------------------- END COMMENTS PROFILE ------------------>

      <!---------------------- LOADER -------------------->
      <div v-if="loadingUser" class="text-center mt-5">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <!---------------------- END LOADER -------------------->
    </div>
    <div v-else class="text-overline text-center mt-8">
      {{ $t('scream.beFirstComment') }}
    </div>
    <!--------------------- AUTH COMMENT FORM -------------------->
    <div class="mt-5 mb-n3 center">
      <AppNewCommentForm
        v-if="isAuthenticated"
        :screamId="data.screamId"
      ></AppNewCommentForm>
      <router-link v-else :to="localePath('login')">
        <v-btn class="mb-6" elevation="0" color="primary" dark>{{
          $t('scream.doComment')
        }}</v-btn>
      </router-link>
    </div>
    <!---------------------- END AUTH COMMENT FORM -------------------->
  </v-card-text>
</template>

<script>
// COMPONENTS
import AppCommentProfile from '@/components/Scream/AppCommentProfile.vue'
import AppNewCommentForm from '@/components/Scream/AppNewCommentForm.vue'

// SVG ICONS
import { mdiCommentMultipleOutline, mdiHeartOutline, mdiHeart } from '@mdi/js'

// VUEX
import { mapGetters } from 'vuex'

// MIXINS
import { likeMethod } from '@/mixins/mixins'

export default {
  components: {
    AppCommentProfile,
    AppNewCommentForm
  },
  mixins: [likeMethod],
  props: {
    data: {
      type: Object,
      required: true
    }
    // iconText: {
    //   type: String,
    //   default: this.$t('scream.comments')
    // }
  },
  data() {
    return {
      svg: {
        comment: mdiCommentMultipleOutline,
        heart: mdiHeart,
        heartOut: mdiHeartOutline
      },
      comments: null
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'userLikes',
      'userCredentials',
      'loadingUser',
      'selectedScream'
    ]),
    isLiked() {
      if (this.isAuthenticated && this.userLikes) {
        const findScreamLiked = this.userLikes.findIndex(
          scream => scream.screamId === this.data.screamId
        )
        return findScreamLiked >= 0
      }
      return false
    }
  },
  mounted() {
    // OPEN DIALOG WHEN NOTIFICATION IS ACTIVE
    // if (this.data.screamId === this.$route.params.screamId) {
    //   this.getScream()
    // }
    this.getScream()
  },
  destroyed() {
    if (!this.$route.params.post) {
      this.$store.dispatch('CLEAN_SELECTED_SCREAM')
    }
  },
  methods: {
    showComments() {
      this.show = !this.show

      if (this.show) {
        this.getScream()
      } else {
        this.closeModal()
      }
    },
    async getScream() {
      if (!this.$route.params.post) {
        try {
          await this.$store
            .dispatch('GET_SCREAM', this.data.screamId)
            .then(() => {
              this.comments = this.selectedScream.comments
            })
        } catch (e) {
          console.log(e)
        }
      }
      this.comments = this.selectedScream.comments
    },
    closeModal() {
      if (!this.$route.params.post) {
        this.dialog = false
        setTimeout(() => {
          this.$store.dispatch('CLEAN_SELECTED_SCREAM')
        }, 100)
      }
    }
  }
}
</script>
