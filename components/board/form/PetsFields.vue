<template>
  <section>
    <div class="ag-filters-grid">
      <v-select
        v-model="modelObject.deal_type"
        :items="deal_type_opts"
        :rules="rules.dealTypeRules"
        :label="$t('deal_type')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
      <v-select
        v-model="modelObject.animal_type"
        :items="animal_types"
        :rules="rules.animalTypeRules"
        :label="$t('animal_type')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
      <v-select
        v-if="modelObject.animal_type"
        v-model="modelObject.breed"
        :items="getBreeds"
        :rules="rules.breedRules"
        :label="$t('breed')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
      <v-spacer v-if="!modelObject.animal_type" />
      <!-- <v-range-slider
        v-if="isFilter"
        v-model="modelObject.ageRange"
        :label="$t('age')"
        step="1"
        min="0"
        max="30"
        thumb-label="always"
      /> -->
      <v-text-field
        v-if="priceFieldConditon"
        v-model="modelObject.price"
        :rules="rules.priceRules"
        :label="$t('price')"
        outlined
        dense
        :append-icon="svg.ils"
      ></v-text-field>
      <v-spacer v-else-if="isFilter" />
      <v-list-item v-if="isFilter" two-line class="mt-n5">
        <v-list-item-content>
          <v-list-item-subtitle>{{ $t('price') }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-text-field
              v-model="modelObject.priceRange[0]"
              outlined
              dense
              :append-icon="svg.ils"
              :prefix="$t('price_from')"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="modelObject.priceRange[1]"
              outlined
              dense
              :append-icon="svg.ils"
              :prefix="$t('price_to')"
              type="number"
            ></v-text-field>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-slider
        v-if="!isFilter"
        v-model="modelObject.age"
        :rules="rules.ageRules"
        :label="$t('age')"
        step="1"
        min="0"
        max="20"
        thumb-label="always"
      />
      <v-select
        v-model="modelObject.gender"
        :items="genders"
        :rules="rules.genderRules"
        :label="$t('gender')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
      <v-select
        v-model="modelObject.country"
        :items="countries"
        :rules="rules.countryRules"
        :label="$t('country')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
      <v-select
        v-if="modelObject.country"
        v-model="modelObject.city"
        :items="getCities"
        :rules="rules.cityRules"
        :label="$t('board.city')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
    </div>
    <section v-if="!isFilter">
      <v-text-field
        v-model="modelObject.title"
        count
        :rules="rules.titleRules"
        :label="$t('board.title')"
        outlined
        dense
      ></v-text-field>
      <v-textarea
        v-model="modelObject.description"
        outlined
        rows="1"
        :label="$t('description')"
      ></v-textarea>
      <v-text-field
        v-model="modelObject.name"
        :rules="rules.nameRules"
        :label="$t('board.contactName')"
        outlined
        dense
      ></v-text-field>
      <v-text-field
        v-model="modelObject.phone"
        :rules="rules.phoneRules"
        :label="$t('phone_num')"
        outlined
        dense
      ></v-text-field>
      <v-textarea
        v-model="modelObject.delivery"
        outlined
        rows="1"
        :label="$t('delivery_conditions')"
      ></v-textarea>
      <v-select
        v-model="modelObject.status"
        :items="getStatuses"
        :label="$t('board.status')"
        item-value="key"
        outlined
        dense
        :menu-props="{ top: false, offsetY: true }"
      />
      <v-switch
        v-model="modelObject.allow_comments"
        style="display: none"
        :label="$t('allow_comments')"
        color="primary"
        hide-details
      ></v-switch>
    </section>
  </section>
</template>

<script>
import { mdiCurrencyIls } from '@mdi/js'

export default {
  props: {
    modelObject: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {
        return {
          titleRules: [true],
          dealTypeRules: [true],
          animalTypeRules: [true],
          phoneRules: [true]
        }
      }
    },
    isFilter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: true,
      svg: {
        ils: mdiCurrencyIls
      },
      deal_type_opts: [
        { key: null, text: '' },
        { key: 'sale', text: this.$t('deal_type_opts.sale') },
        { key: 'buying', text: this.$t('deal_type_opts.buying') },
        { key: 'passing', text: this.$t('deal_type_opts.passing') },
        { key: 'found', text: this.$t('deal_type_opts.found') },
        { key: 'delayed', text: this.$t('deal_type_opts.delayed') },
        { key: 'adoption', text: this.$t('deal_type_opts.adoption') },
        { key: 'mating', text: this.$t('deal_type_opts.mating') }
      ],
      animal_types: [
        { key: null, text: '' },
        { key: 'cats', text: this.$t('animal_types.cats') },
        { key: 'dogs', text: this.$t('animal_types.dogs') },
        { key: 'birds', text: this.$t('animal_types.birds') },
        { key: 'fishes', text: this.$t('animal_types.fishes') },
        { key: 'other', text: this.$t('animal_types.other') }
      ],
      breeds_cats: [
        { key: 'siam', text: this.$t('breeds_cats.siam') },
        { key: 'himalaya', text: this.$t('breeds_cats.himalaya') },
        { key: 'ragdoll', text: this.$t('breeds_cats.ragdoll') },
        { key: 'mainecoon', text: this.$t('breeds_cats.mainecoon') },
        { key: 'scottish', text: this.$t('breeds_cats.scottish') },
        { key: 'persian', text: this.$t('breeds_cats.persian') },
        { key: 'british', text: this.$t('breeds_cats.british') },
        { key: 'sphinx', text: this.$t('breeds_cats.sphinx') },
        { key: 'burma', text: this.$t('breeds_cats.burma') },
        { key: 'angora', text: this.$t('breeds_cats.angora') },
        { key: 'siberian', text: this.$t('breeds_cats.siberian') }
      ],
      genders: [
        { key: 'male', text: this.$t('genders_pets.male') },
        { key: 'female', text: this.$t('genders_pets.female') }
      ],
      countries: [{ key: 'isr', text: 'ישראל' }]
    }
  },
  computed: {
    priceFieldConditon() {
      if (
        !this.isFilter &&
        (this.dealType === 'sale' ||
          this.dealType === 'buying' ||
          this.dealType === 'delayed' ||
          this.dealType === 'adoption' ||
          this.dealType === 'mating')
      ) {
        return true
      } else {
        return false
      }
    },
    getBreeds() {
      return this[`breeds_${this.modelObject.animal_type}`]
    },
    getCities() {
      return this.$t(`cities_${this.modelObject.country}`)
    },
    animalType() {
      return this.modelObject.animal_type
    },
    dealType() {
      return this.modelObject.deal_type
    },
    getStatuses() {
      return this.$t('board.statuses')
    }
  },
  watch: {
    animalType() {
      this.modelObject.breed = ''
    }
  },
  mounted() {
    if (
      !this.isFilter &&
      this.$store.getters.userCredentials &&
      this.$store.getters.userCredentials.phone
    ) {
      this.modelObject.phone = this.$store.getters.userCredentials.phone
      this.modelObject.name = this.$store.getters.userCredentials.name
    }
  }
}
</script>
