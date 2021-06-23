<template>
  <v-container>
    <section class="ag-board-content">
      <LayoutAppBreadcrumbs />
      <v-tabs
        v-model="tab"
        background-color="#E3F2FD"
        corol="primary"
        centered
        icons-and-text
        show-arrows
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="tb in $t('board.tabs')" :key="tb.link" :href="tb.link">{{
          tb.name
        }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="{ background: '#E3F2FD' }">
        <v-tab-item value="tab-1">
          <filters-hub name="pets" style="margin-bottom: 20px" />
          <AdCardList />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <new-post-view />
        </v-tab-item>
      </v-tabs-items>
    </section>
  </v-container>
</template>

<script>
import LayoutAppBreadcrumbs from '@/components/Layout/AppBreadcrumbs'
import AdCardList from '@/components/board/ads/AdCardList'
import NewPostView from '@/components/board/profile/NewPostView'
import FiltersHub from '~/components/board/filters/FiltersHub'

export default {
  components: {
    FiltersHub,
    AdCardList,
    LayoutAppBreadcrumbs,
    NewPostView
  },
  data() {
    return {
      tab: null
    }
  }
}
</script>
