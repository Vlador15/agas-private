<template>
  <v-form ref="form" class="ag-search-block">
    <v-text-field
      v-model="search_text"
      :label="$t('text_search')"
      solo
      clearable
    />
    <v-btn depressed color="primary">
      {{ $t('search') }}
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'SearchBoxMain',
  data() {
    return {
      search_text: ''
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/mixins';

.ag-search-block {
  align-items: center;
  @include setGrid(1fr auto, 15px, null, null, 'columns');

  .v-text-field__details {
    display: none;
  }

  .v-input__slot {
    margin-bottom: 0;
  }
}
</style>
