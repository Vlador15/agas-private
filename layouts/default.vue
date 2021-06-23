<template>
  <v-app id="app">
    <v-main>
      <Sidebar />
      <Navbar />
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/Layout/AppNavbar.vue'
import Sidebar from '@/components/Layout/AppSidebar.vue'
import Footer from '@/components/Layout/AppFooter.vue'
import layoutDirMixin from '@/mixins/layoutDirMixin'
// import Msgbar from '~/components/Layout/AppMsgbar'

export default {
  // middleware: 'auth',
  components: {
    Navbar,
    Sidebar,
    Footer
    // Msgbar
  },
  mixins: [layoutDirMixin],
  beforeMount() {
    this.$vuetify.rtl = this.getViewDirection()
    this.$vuetify.lang.current = this.$i18n.locale
    if (
      this.$store.getters.isAuthenticated &&
      !this.$store.getters.userCredentials
    ) {
      this.$store.dispatch('FETCH_AUTH_USER')
    }
  }
}
</script>
