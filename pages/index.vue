<template>
  <v-container ref="infinityWrapper" class="cont-wrap" py-3 px-6>
    <v-row justify="center">
      <AppScreamContentLoader></AppScreamContentLoader>
    </v-row>
  </v-container>
</template>

<script>
// COMPONENTS
import AppScreamContentLoader from '@/components/Loaders/AppScreamLoader.vue'

export default {
  components: {
    AppScreamContentLoader
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {},
  beforeDestroy() {
    this.$store.commit('RESET_SCREAMS')
  },
  mounted() {
    this.redirect()
  },
  methods: {
    redirect() {
      console.log(this.$i18n)
      this.$router.push({
        name: `learningModule___${this.$i18n.locale}`
      })
    }
  }
}
</script>
