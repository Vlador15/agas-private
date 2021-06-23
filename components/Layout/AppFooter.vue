<template>
  <v-footer class="ag-app-footer" fixed>
    <language-switch></language-switch>
  </v-footer>
</template>

<script>
import LanguageSwitch from '@/components/Widgets/LanguageSwitch'

export default {
  name: 'AppFooter',
  components: {
    LanguageSwitch
  }
}
</script>
<style lang="scss">
@import 'assets/styles/mixins';
.ag-app-footer {
  justify-content: flex-end;
  z-index: 10;
  @include setGridAuto(auto, 20px, 'columns');
}
</style>
