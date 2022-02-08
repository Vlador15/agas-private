<template>
  <div v-if="!isLoading">
    <v-row class="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="ma-6">
          <v-row class="ma-2">
            <v-col cols="12" md="4" class="filter-row">
              <v-select
                v-model="sex"
                clearable
                :items="itemSex"
                :label="$t('studentProfile.gender')"
                class="filter"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" class="filter-row">
              <v-text-field
                v-model="city"
                clearable
                :label="$t('studentProfile.city')"
                class="filter"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="filter-row">
              <!-- <v-select
                v-model="subject"
                clearable
                :items="itemSubject"
                :label="$t('studentProfile.subName')"
              ></v-select> -->
              <v-select
                v-model="nameCategory"
                background-color="white"
                :label="$t('studentProfile.subCategory')"
                clearable
                :items="categoryItem"
                class="filter"
                @change="getSubject"
              ></v-select>
              <v-select
                v-if="openSubject"
                v-model="subject"
                :label="$t('studentProfile.subName')"
                clearable
                :items="subjectItem"
                class="filter"
              ></v-select>
            </v-col>
            <v-col cols="12" class="filter-row">
              <v-slider
                v-model="rating"
                max="5"
                :label="$t('studentProfile.rating')"
                thumb-label
                class="filter"
              ></v-slider>
            </v-col>
            <v-col cols="12" md="2" class="filter-row">
              <h4>{{ $t('studentProfile.subprice') }}</h4>
            </v-col>
            <v-col md="10" class="px-4 filter-row">
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(range, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>
            <v-col cols="12" md="2">
              <h4>{{ $t('studentProfile.age') }}</h4>
            </v-col>
            <v-col md="10" class="px-4 filter-row">
              <v-range-slider
                v-model="rangeAge"
                :max="maxAge"
                :min="minAge"
                hide-details
                class="align-center"
              >
                <template v-slot:prepend>
                  <v-text-field
                    :value="rangeAge[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(rangeAge, 0, $event)"
                  ></v-text-field>
                </template>
                <template v-slot:append>
                  <v-text-field
                    :value="rangeAge[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="$set(rangeAge, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>
            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="ageMax"
                :rules="numRules"
                clearable
                :label="$t('studentProfile.max')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="ageMin"
                :rules="numRules"
                clearable
                :label="$t('studentProfile.min')"
              ></v-text-field>
            </v-col> -->

            <v-col cols="12">
              <v-btn @click="filter"> {{ $t('studentProfile.filter') }} </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" md="12" class="pa-4">
        <div v-for="(sub, i) in dataListTeachers" :key="i">
          <cardTeacher :dataCard="sub"> </cardTeacher>
        </div>
        <div v-if="dataListTeachers.length === 0">
          <h1 style="text-align: center">
            {{ $t('studentProfile.noProfiles') }}
          </h1>
        </div>
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <v-progress-circular
      style="margin-left: 45%; margin-top: 20%"
      :size="120"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import cardTeacher from '@/components/listTeachers/cardTeacher.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    cardTeacher
  },
  props: {},
  data() {
    return {
      dataListTeachers: [],
      isLoading: true,
      dataFilter: {},
      city: '',
      subject: '',
      sex: '',
      rating: 0,
      itemSex: [
        this.$t('studentProfile.sexItemMan'),
        this.$t('studentProfile.sexItemWoman')
      ],
      min: 0,
      max: 10000,
      range: [0, 10000],
      minAge: 0,
      maxAge: 90,
      rangeAge: [0, 90],
      nameCategory: '',
      categoryItem: [],
      subjectItem: [],
      openSubject: false
    }
  },
  computed: {
    ...mapGetters(['getTeacherFilter', 'getCategoryList', 'getSubjects']),
    numRules() {
      return [v => /^\d+$/.test(v) || this.$t('studentProfile.rulesPattern')]
    }
  },
  async mounted() {
    this.getFilter()
    await this.getCategory()
    await this.postTeachersList()
    this.isLoading = false
  },
  methods: {
    getFilter() {
      const { dataFilter } = this.$route.params

      if (dataFilter && dataFilter.subject) {
        this.dataFilter.subject = dataFilter.subject
        this.subject = dataFilter.subject
        this.nameCategory = dataFilter.nameCategory
        this.getSubject()
      }

      if (dataFilter && dataFilter.citiesForLessons) {
        this.dataFilter.citiesForLessons = [dataFilter.citiesForLessons[0]]
        this.city = dataFilter.citiesForLessons[0] || []
      }
    },
    async getCategory() {
      await this.$store.dispatch('GET_CATEGORY', this.$i18n.locale)
      this.categoryItem = [...this.getCategoryList]
    },
    async getSubject() {
      const object = { ln: this.$i18n.locale, name: this.nameCategory }
      await this.$store.dispatch('GET_SUBJECTS', object)
      this.subjectItem = this.getSubjects
      this.openSubject = true
    },
    async postTeachersList() {
      await this.$store.dispatch('POST_TEACHER_FILTER', this.dataFilter)
      this.dataListTeachers = [...this.getTeacherFilter]
    },
    async filter() {
      this.isLoading = true
      this.dataFilter = {}
      if (this.sex) {
        this.dataFilter.sex = this.sex
      }

      this.dataFilter.price = { ...this.dataFilter.price, min: this.range[0] }

      this.dataFilter.price = { ...this.dataFilter.price, max: this.range[1] }

      this.dataFilter.age = { ...this.dataFilter.age, min: this.rangeAge[0] }

      this.dataFilter.age = { ...this.dataFilter.age, max: this.rangeAge[1] }

      if (this.city) {
        this.dataFilter.citiesForLessons = [this.city]
      }
      if (this.subject && this.nameCategory) {
        this.dataFilter.subject = this.subject
      }
      if (this.rating > 0) {
        this.dataFilter.rating = this.rating
      }

      await this.$store.dispatch('POST_TEACHER_FILTER', this.dataFilter)
      this.dataListTeachers = [...this.getTeacherFilter]
      this.isLoading = false
    }
  }
}
</script>

<style>
.filter {
  margin: 0;
  margin-top: 0;
}

.filter-row {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
