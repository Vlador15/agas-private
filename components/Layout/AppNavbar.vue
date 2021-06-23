<template>
  <v-app-bar fixed app clipped-right clipped-left color="white" elevate>
    <v-app-bar-nav-icon
      class="mr-2"
      color="blue"
      @click="TOGGLE_SIDEBAR()"
    ></v-app-bar-nav-icon>
    <!--------------------------- NAVBAR LOGO---------------------------->
    <AppLogo class="mr-2 hover"></AppLogo>

    <!--------------------------- END NAVBAR LOGO---------------------------->

    <!--------------------------- NAVBAR TITLE ---------------------------->

    <!--------------------------- END NAVBAR TITLE ---------------------------->
    <v-spacer></v-spacer>

    <v-avatar
      class="mr-3 hover"
      @click="
        $route.path !== '/profile'
          ? $router.push({ name: `profile___${$i18n.locale}` })
          : ''
      "
    >
      <img
        v-if="userCredentials"
        :src="userCredentials.imageUrl"
        :alt="userCredentials.handle"
        size="128"
        style="object-fit: cover"
      />
    </v-avatar>

    <!--------------------------- NOTIFICATIONS BUTTON ---------------------------->
    <AppNotificationsMenu
      v-if="isAuthenticated"
      class="mr-2"
    ></AppNotificationsMenu>
    <!--------------------------- END NOTIFICATIONS BUTTON ---------------------------->

    <!--------------------------- LOGOUT BUTTON MODAL ---------------------------->
    <AppLogoutModal v-if="isAuthenticated"></AppLogoutModal>
    <!--------------------------- END LOGOUT BUTTON MODAL ---------------------------->

    <!--------------------------- LOGIN/SIGNUP BUTTONS ---------------------------->
    <div v-if="!isAuthenticated" class="center">
      <v-btn
        exact
        :to="localePath('login')"
        icon
        color="primary"
        dark
        class="mr-2"
      >
        <v-icon>{{ svg.login }}</v-icon>
      </v-btn>

      <v-btn
        exact
        :to="localePath('signup')"
        icon
        color="primary"
        dark
        class="mr-2"
      >
        <v-icon>{{ svg.logout }}</v-icon>
      </v-btn>
    </div>
    <!--------------------------- END LOGIN/SIGNUP BUTTONS ---------------------------->
  </v-app-bar>
</template>

<script>
// COMPONENTS
import AppLogoutModal from '@/components/AppLogoutModal.vue'
import AppNotificationsMenu from '@/components/Notifications/AppNotificationsMenu.vue'
import AppLogo from '@/components/AppLogo.vue'

// VUEX
import { mapGetters, mapMutations } from 'vuex'

// SVG ICONS
import { mdiAccountPlusOutline, mdiHome, mdiLogin } from '@mdi/js'

export default {
  components: {
    AppLogoutModal,
    AppNotificationsMenu,
    AppLogo
  },
  data: () => ({
    svg: {
      home: mdiHome,
      login: mdiLogin,
      logout: mdiAccountPlusOutline
    }
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'userNotifications', 'userCredentials'])
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR_DRAWER', 'TOGGLE_SIDEBAR_DRAWER_MINI']),
    TOGGLE_SIDEBAR() {
      if (window.innerWidth < 768) {
        this.TOGGLE_SIDEBAR_DRAWER()
      } else {
        this.TOGGLE_SIDEBAR_DRAWER_MINI()
      }
    }
  }
}
</script>
