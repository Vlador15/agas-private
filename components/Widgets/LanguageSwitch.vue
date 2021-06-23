<template>
  <div class="ag-lang-widget">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <country-flag :country="getCurrentLocale.flag" size="small" />
          <span>{{ getCurrentLocale.name }}</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="locale in availableLocales" :key="locale.code">
            <div class="ag-language" @click="switchLocale(locale.code)">
              <country-flag :country="locale.flag" size="small" />
              <span>{{ locale.name }}</span>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { Constants } from '@/scripts/conf/Constants'

export default {
  name: 'LanguageSwitch',
  components: {
    CountryFlag
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    getCurrentLocale() {
      return this.$i18n.locales.find(i => i.code === this.$i18n.locale)
    }
  },
  watch: {
    '$i18n.locale'(val) {
      this.$vuetify.rtl = Constants.rtlLanguages.includes(val)
    }
  },
  methods: {
    switchLocale(localeCode) {
      this.$vuetify.lang.current = localeCode
      this.$dayjs.locale(localeCode)
      this.$router.push(this.switchLocalePath(localeCode))
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/mixins';
@import 'assets/variables';

.ag-lang-widget {
  display: flex;
  justify-content: flex-end;

  .v-btn__content {
    font-size: 14px;
    align-items: center;
    @include setGridAuto(auto, 7px, 'columns');
  }
}

.ag-language {
  color: black;
  text-decoration: none;
  font-size: 15px;
  align-items: center;
  @include setGridAuto(auto, 5px, 'columns');

  a {
    color: black;
  }
}
</style>
