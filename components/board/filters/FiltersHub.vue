<template>
  <div class="ag-filters-block">
    <v-expansion-panels focusable>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <div>
            <v-icon>mdi-filter</v-icon>
            {{ $t('filters') }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="ag-filters-content">
          <component
            :is="`${name}-fields`"
            :is-filter="true"
            :model-object="filters_obj"
          />
          <filters-footer :filters="filters_obj" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import FiltersFooter from '@/components/board/filters/FiltersFooter'
import PetsFields from '@/components/board/form/PetsFields'
import Instruments from '~/mixins/instruments'

export default {
  name: 'FiltersHub',
  components: {
    PetsFields,
    FiltersFooter
  },
  mixins: [Instruments],
  props: {
    name: {
      type: String,
      default: 'pets'
    }
  },
  data() {
    return {
      filters_obj: this.getCategoryScheme(this.name)
    }
  },
  computed: {
    filterData() {
      return {
        // price_range: this.filters_obj.priceRange || null,
        animal_type: this.filters_obj.animal_type || null,
        breed: this.filters_obj.breed || null,
        city: this.filters_obj.city || null,
        deal_type: this.filters_obj.deal_type || null,
        gender: this.filters_obj.gender || null,
        // age: this.filters_obj.ageRange || null,
        // country: this.filters_obj.country || null,
        minPrice: this.filters_obj.priceRange[0]
          ? this.filters_obj.priceRange[0]
          : null,
        maxPrice: this.filters_obj.priceRange[1]
          ? this.filters_obj.priceRange[1]
          : null
      }
    }
  },
  created() {
    this.$nuxt.$on('filter_pets', () => {
      this.filter()
    })
    this.$nuxt.$on('clear_filter_pets', () => {
      this.clearFilter()
    })
  },
  methods: {
    async clearFilter() {
      this.filters_obj.animal_type = ''
      this.filters_obj.breed = ''
      this.filters_obj.city = ''
      this.filters_obj.deal_type = ''
      this.filters_obj.gender = ''
      this.filters_obj.priceRange = [null, null]
      this.$store.commit('board/RESET_ADS_LIST')
      await this.$store.dispatch('board/FETCH_FILTERED_ADS')
    },
    async filter() {
      this.$store.commit('SET_INF_DATA_TO_LOAD', true)
      this.$store.commit('board/RESET_ADS_LIST')
      await this.$store.dispatch('board/FETCH_FILTERED_ADS', this.filterData)
      // const filteredAdsByPrice = []
      // let adsList

      // if (filteredAdsByPrice.length) {
      //   adsList = filteredAdsByPrice
      // } else {
      //   adsList = this.$store.getters['board/filteredList']
      // }

      // const filteredAds = adsList.filter(item => {
      //   for (const key in this.filterData) {
      //     if (this.filterData[key] === null) return true
      //     if (item[key] !== this.filterData[key]) return false
      //   }
      // })

      // console.log('FA', filteredAds)
    }
  }
}
</script>
<style lang="scss">
@import 'assets/styles/mixins';
/*HIDE ARROWS FROM NUMBER TYPE INPUT */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
/*HIDE ARROWS FROM NUMBER TYPE INPUT */

.ag-filters-block {
  // padding: 15px 120px 0 120px;

  .v-text-field__details {
    display: none;
  }

  .v-expansion-panel-content__wrap {
    padding: 15px;
  }

  .v-input__slot {
    margin: 0;
  }

  .v-messages {
    display: none;
  }
}
</style>
