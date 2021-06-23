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
            v-for="tb in $t('board.tabs')"
            :key="tb.link"
            :href="tb.link"
            >{{ tb.name }}</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab" :style="{ background: '#E3F2FD' }">
      <v-tab-item value="tab-1">
        <!-- <search-box-main v-if="showBoardElements" /> -->
        <main-categories v-if="showBoardElements" />
        <NuxtChild />
      </v-tab-item>
      <v-tab-item value="tab-2">
        <new-post-view />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
// import SearchBoxMain from '@/components/board/main/SearchBoxMain'
import MainCategories from '@/components/board/main/MainCategories'
import NewPostView from '@/components/board/profile/NewPostView'

export default {
  name: 'Board',
  components: {
    // SearchBoxMain,
    MainCategories,
    NewPostView
  },
  data() {
    return {
      tab: null,
      isLoading: true
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    showBoardElements() {
      const allowed = ['/ru/board', '/en/board', '/board']
      return allowed.some(p => p === this.$route.path)
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/mixins';

.ag-main-content {
  @include setGrid(1fr, null, null, null, 'columns');
}
</style>
