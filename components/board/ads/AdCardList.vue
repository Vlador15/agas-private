<template>
  <v-row ref="infinityWrapper" class="mt-n3">
    <v-col v-if="isLoading">
      <v-card v-for="n in 5" :key="n" class="mb-5" elevation="0">
        <AppPetAdLoader></AppPetAdLoader>
      </v-card>
    </v-col>
    <v-col
      v-for="(ad, i) in adList"
      v-else-if="$store.getters['board/filteredList'].length"
      :key="i"
      cols="12"
      order="1"
      order-sm="1"
    >
      <v-card class="" elevation="0">
        <AdCard :ad="ad" />
      </v-card>
    </v-col>
    <v-col v-else-if="!isLoading">
      <p class="headline text-center">Nothing found</p>
    </v-col>
    <v-col v-if="isLoadingNext" order="2">
      <v-card class="mb-5" elevation="0">
        <AppPetAdLoader></AppPetAdLoader>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AdCard from '@/components/board/ads/AdCard'
import infinityScroll from '@/mixins/infinityScroll'
import AppPetAdLoader from '@/components/Loaders/AppPetAdLoader.vue'

export default {
  components: {
    AdCard,
    AppPetAdLoader
  },
  mixins: [infinityScroll],
  async fetch() {
    if (!this.$store.getters['board/filteredList'].length) {
      await this.$store.dispatch('board/FETCH_FILTERED_ADS')
      this.isLoading = false
    }
  },
  // props: {
  //   adsList: {
  //     type: Array,
  //     default() {
  //       return []
  //     }
  //   }
  // },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    adList() {
      return this.$store.getters['board/filteredList']
    },
    lastAdId() {
      return this.adList[this.adList.length - 1].id
    }
  },
  beforeDestroy() {
    this.$store.commit('board/RESET_ADS_LIST')
  },
  methods: {
    async getNext() {
      // console.log('---------')
      // console.log(this.$store.getters['board/filter'])
      // console.log(this.adList)
      // console.log('GET NEXT')
      let query
      if (this.$store.getters['board/filter']) {
        query = {
          ...this.$store.getters['board/filter'],
          startAfterId: this.lastAdId
        }
      } else {
        query = {
          startAfterId: this.lastAdId
        }
      }

      return await this.$store.dispatch('board/FETCH_FILTERED_ADS', query)
    }
  }
}
</script>

<style lang="scss" scoped></style>
