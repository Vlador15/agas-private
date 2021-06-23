<template>
  <div>
    <v-container>
      <LayoutAppBreadcrumbs />
      <edit-ad-view />
      <v-snackbar v-model="snackbar" color="info" :timeout="snackTimeout" top>
        {{ snackText }}
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import editAdView from '@/components/board/editAdView'
import LayoutAppBreadcrumbs from '@/components/Layout/AppBreadcrumbs'
export default {
  components: {
    editAdView,
    LayoutAppBreadcrumbs
  },
  data() {
    return {
      newAd: null,
      user: null,
      showPhone: false,
      snackbar: false,
      snackText: '',
      snackTimeout: 1500,
      mobile: false
    }
  }
}
</script>

<style lang="scss">
.post-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .system-ad-bar {
    margin-left: 12px;
    .v-toolbar__content {
      @media screen and (min-width: 960px) {
        max-height: 20px;
      }
    }
    @media screen and (min-width: 960px) {
      max-height: 20px;
      margin-top: 18px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 0px;
      max-height: unset;
      height: unset;
    }
  }
  .ad-bar {
    max-height: 52px;
    @media screen and (max-width: 480px) {
      margin: 24px 0px;
    }
  }
  .show-phone-btn {
    display: block;
  }
  .country {
    margin-top: 0px;
    @media screen and (max-width: 1263px) {
      margin-top: 0px;
    }
  }
}
</style>
