<template>
  <v-footer absolute class="ag-filters-block-footer">
    <v-btn depressed color="blue-grey" class="white--text" @click="clearFilter">
      {{ $t('clear_ft') }}
    </v-btn>
    <v-btn depressed color="info" @click="filter">
      {{ $t('apply') }}
    </v-btn>
  </v-footer>
</template>

<script>
export default {
  name: 'FiltersFooter',
  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    filter() {
      this.$nuxt.$emit('filter_pets')
    },
    clearFilter() {
      this.$nuxt.$emit('clear_filter_pets')
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/mixins';

.ag-filters-block-footer {
  justify-content: flex-end;
  @include setGridAuto(auto, 15px, 'columns');
}
</style>
