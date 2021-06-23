<template>
  <section class="ag-board-main-tabs">
    <v-btn
      v-for="link in $t('main_categories')"
      :key="link.routing"
      x-large
      color="primary"
      :disabled="link.key !== 'pets'"
      @click="$router.push(link.routing)"
    >
      {{ link.name }}
    </v-btn>
  </section>
</template>

<script>
export default {
  name: 'MainCategories'
}
</script>

<style lang="scss">
@import 'assets/styles/mixins';
@import 'assets/variables';

.ag-board-main-tabs {
  margin: 15px 0;
  align-items: flex-start;
  align-content: flex-start;
  @include setGrid(
    repeat(auto-fit, minmax(220px, 1fr)),
    20px,
    auto,
    25px,
    'both'
  );

  li {
    background: white;
  }

  a {
    text-decoration: none;
    font-size: $font-regular;
    color: #fff;
  }

  .v-btn--disabled a {
    color: rgba(0, 0, 0, 0.26) !important;
  }

  .v-btn {
    width: 100%;
    font-size: $button_font_md;
  }
}

.v-application--is-rtl {
  .ag-board-main-tabs .v-btn {
    font-size: $font-regular;
  }
}
</style>
