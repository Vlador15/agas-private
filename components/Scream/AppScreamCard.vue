<template>
  <div v-if="scream" class="screamcard">
    <img
      v-if="scream.imgUrls && scream.imgUrls[0] !== 'no_img'"
      class="post-img"
      :src="scream.imgUrls"
    />
    <v-toolbar flat class="pt-3 mb-3 ml-4 mr-4">
      <v-avatar
        class="ml-0 mr-3 hover screamcard__avatar"
        size="60"
        @click="getUser"
      >
        <v-img :src="profileImg"></v-img>
      </v-avatar>
      <v-toolbar-title
        class="h5 font-weight-bold hover"
        style="line-height: 17px"
      >
        <div @click="getUser">{{ scream.userName }}</div>
        <nuxt-link :to="postLink" class="postlink">
          <span class="text-caption text--secondary">{{
            scream.createdAt | day
          }}</span>
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!--------------------------- SCREAM EDIT DELETE MODAL -------------------------->
      <div v-if="isAuthenticated && userCredentials" class="editwrap">
        <ScreamAppEditScream
          v-if="userCredentials.handle === scream.userHandle"
          :scream="scream"
        />
      </div>
      <div v-if="isAuthenticated && userCredentials" class="deletewrap">
        <ScreamAppDeleteScream
          v-if="userCredentials.handle === scream.userHandle"
          :scream="scream"
        />
      </div>

      <!--------------------------- END SCREAM EDIT DELETE MODAL -------------------------->
    </v-toolbar>
    <v-card-text style="white-space: pre-line" class="text-subtitle-1">{{
      scream.body
    }}</v-card-text>
    <!--------------------------- END SCREAM BODY -------------------------->
    <v-col cols="12" md="12">
      <v-chip
        v-for="(tag, i) in scream.tags"
        :key="i"
        class="ma-2"
        color="primary lighten-1"
        small
        @click="
          // TODO i18n routes
          $route.path !== `/tags/${tag}` ? $router.push(`/tags/${tag}`) : ''
        "
      >
        #{{ tag }}
      </v-chip>
    </v-col>
    <v-col cols="12" md="12" class="relative">
      <v-card-actions class="px-0 emo-actions">
        <!---------------------- SCREAM LIKE ACTION -------------------->
        {{ scream.likeCount }}
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'like')"
        >
          <v-icon v-if="isLikeActive('like')" color="red lighten-1">{{
            svg.heart
          }}</v-icon>
          <v-icon v-else color="red lighten-1">{{ svg.heartOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'pleasure')"
        >
          <v-icon v-if="isLikeActive('pleasure')" color="pink">{{
            svg.pleasure
          }}</v-icon>
          <v-icon v-else color="pink">{{ svg.pleasureOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'lol')"
        >
          <v-icon v-if="isLikeActive('lol')" color="yellow">{{
            svg.lol
          }}</v-icon>
          <v-icon v-else color="yellow">{{ svg.lolOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'happy')"
        >
          <v-icon v-if="isLikeActive('happy')" color="green lighten-1">{{
            svg.happy
          }}</v-icon>
          <v-icon v-else color="green lighten-1">{{ svg.happyOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'confused')"
        >
          <v-icon v-if="isLikeActive('confused')" color="brown">{{
            svg.confused
          }}</v-icon>
          <v-icon v-else color="brown">{{ svg.confusedOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'neutral')"
        >
          <v-icon v-if="isLikeActive('neutral')" color="grey">{{
            svg.neutral
          }}</v-icon>
          <v-icon v-else color="grey">{{ svg.neutralOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'sad')"
        >
          <v-icon v-if="isLikeActive('sad')" color="light-blue">{{
            svg.sad
          }}</v-icon>
          <v-icon v-else color="light-blue">{{ svg.sadOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'angry')"
        >
          <v-icon v-if="isLikeActive('angry')" color="red darken-4">{{
            svg.angry
          }}</v-icon>
          <v-icon v-else color="red darken-4">{{ svg.angryOut }}</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#2c003e"
          class="px-0 mx-0"
          @click="likeScream(isAuthenticated, scream, 'cry')"
        >
          <v-icon v-if="isLikeActive('cry')" color="black">{{
            svg.cry
          }}</v-icon>
          <v-icon v-else color="black">{{ svg.cryOut }}</v-icon>
        </v-btn>
        <!---------------------- END SCREAM LIKE ACTION -------------------->
        <v-spacer></v-spacer>
        <v-btn color="#2c003e" text small @click="showComments">
          {{ $t('scream.comments') }}
          <v-icon left>{{ svg.comment }}</v-icon>
          {{ scream.commentCount }}
          <v-icon>{{ show ? svg.up : svg.down }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-if="show">
          <v-divider></v-divider>
          <!---------------------- SCREAM COMMENTS MODAL ------------------->
          <ScreamAppCommentsExpand :data="scream" />
          <!---------------------- END SCREAM COMMENTS MODAL ------------------>
        </div>
      </v-expand-transition>
    </v-col>
  </div>
</template>

<script>
// VUEX
import { mapGetters } from 'vuex'
import ScreamAppEditScream from '@/components/Scream/AppEditScream'
import ScreamAppDeleteScream from '@/components/Scream/AppDeleteScream'
import ScreamAppCommentsExpand from '@/components/Scream/AppCommentsExpand'

// COMPONENTS
// import AppDeleteScream from '@/components/Scream/AppDeleteScream.vue'

// SVG ICONS
import {
  mdiEmoticonHappyOutline,
  mdiEmoticonHappy,
  mdiEmoticonCryOutline,
  mdiEmoticonCry,
  mdiEmoticonAngryOutline,
  mdiEmoticonAngry,
  mdiEmoticonSadOutline,
  mdiEmoticonSad,
  mdiEmoticonConfusedOutline,
  mdiEmoticonConfused,
  mdiEmoticonNeutralOutline,
  mdiEmoticonNeutral,
  mdiEmoticonOutline,
  mdiEmoticon,
  mdiEmoticonLolOutline,
  mdiEmoticonLol,
  mdiCommentMultipleOutline,
  mdiHeartOutline,
  mdiHeart,
  mdiDotsHorizontal,
  mdiChevronUp,
  mdiChevronDown
} from '@mdi/js'

// MIXINS
import { likeMethod } from '@/mixins/mixins'
export default {
  components: {
    ScreamAppEditScream,
    ScreamAppDeleteScream,
    ScreamAppCommentsExpand
  },
  mixins: [likeMethod],
  props: {
    scream: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false,
    svg: {
      comment: mdiCommentMultipleOutline,
      heart: mdiHeart,
      heartOut: mdiHeartOutline,
      pleasure: mdiEmoticon,
      pleasureOut: mdiEmoticonOutline,
      lolOut: mdiEmoticonLolOutline,
      lol: mdiEmoticonLol,
      happy: mdiEmoticonHappy,
      happyOut: mdiEmoticonHappyOutline,
      neutral: mdiEmoticonNeutral,
      neutralOut: mdiEmoticonNeutralOutline,
      confused: mdiEmoticonConfused,
      confusedOut: mdiEmoticonConfusedOutline,
      sad: mdiEmoticonSad,
      sadOut: mdiEmoticonSadOutline,
      angry: mdiEmoticonAngry,
      angryOut: mdiEmoticonAngryOutline,
      cry: mdiEmoticonCry,
      cryOut: mdiEmoticonCryOutline,
      dots: mdiDotsHorizontal,
      up: mdiChevronUp,
      down: mdiChevronDown
    },
    sizeAvatar: 110,
    isFakeUnLiked: false,
    isFakeLiked: false,
    toched: false,
    toched_dis: false
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'userLikes', 'userCredentials']),
    likeType() {
      if (this.isAuthenticated && this.userLikes) {
        const findIfScreamIsLiked = this.userLikes.findIndex(
          scream => scream.screamId === this.scream.screamId
        )
        return this.userLikes[findIfScreamIsLiked].type
      }
      return false
    },
    isLiked() {
      if (this.isAuthenticated && this.userLikes) {
        const findIfScreamIsLiked = this.userLikes.findIndex(
          scream => scream.screamId === this.scream.screamId
        )
        return findIfScreamIsLiked >= 0
      }
      return false
    },
    profileImg() {
      return this.scream.userImage
    },
    postLink() {
      switch (true) {
        case this.$route.path.includes('republic-haifa') ||
          this.scream.userHandle === 'huj28zZ9TzWdprn0xwylmJ1rfkL2':
          return this.localePath(`/republic-haifa/${this.scream.screamId}`)
        case this.$route.path.includes('esh-li-hatul') ||
          this.scream.userHandle === '5aPyMl74Y4gMrnfbAPak2igSUB63':
          return this.localePath(`/esh-li-hatul/${this.scream.screamId}`)
        default:
          return this.localePath(
            `/users/${this.scream.userHandle}/p/${this.scream.screamId}`
          )
      }
    }
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    if (process.client && window.innerWidth < 500) {
      this.sizeAvatar = 150
    }
  },
  methods: {
    showComments() {
      this.show = !this.show
    },
    isLikeActive(type) {
      if (this.isLiked && this.likeType === type) {
        return true
      }
    },
    getUser() {
      switch (this.scream.userHandle) {
        case 'huj28zZ9TzWdprn0xwylmJ1rfkL2':
          this.$router.push(this.localePath('/republic-haifa'))
          break
        case '5aPyMl74Y4gMrnfbAPak2igSUB63':
          this.$router.push(this.localePath('/esh-li-hatul'))
          break
        default:
          this.$router.push(this.localePath(`/users/${this.scream.userHandle}`))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.postlink:hover {
  text-decoration: underline;
}
.screamcard ::v-deep .v-toolbar__content {
  padding-right: 0px !important;
  padding-left: 0px !important;
}
.v-application--is-rtl {
  .screamcard__avatar {
    margin-left: 12px !important;
    margin-right: 0 !important;
  }
}

.post-img {
  width: 100%;
  object-fit: cover;
  // max-height: 250px;
  object-position: top;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.emo-actions {
  @media screen and (max-width: 1132px) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }
}

.editwrap {
  display: block;
  position: relative;
  margin-top: -64px;
  margin-right: 54px;
}

.v-application--is-rtl .deletewrap {
  left: 126px;
  position: relative;
  top: -32px;
}

.v-application--is-rtl .editwrap {
  margin-right: unset;
  margin-left: 78px;
}
</style>
