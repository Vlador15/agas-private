<template>
  <v-container>
    <v-form v-if="!isLoading" ref="form" class="mb-4">
      <v-row class="px-12 pt-6 justify-center">
        <!----------- PERSONAL ---------------------->
        <v-row class="pb-12 justify-center">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="dataTeacher.fullName"
              clearable
              :rules="fullNameRules"
              :prepend-inner-icon="svg.user"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.name')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              key="value"
              v-model="dataTeacher.sex"
              :prepend-inner-icon="svg.gender"
              :items="sexItem"
              :label="$t('teacherProfile.gender')"
              :disabled="disabled"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="birthday"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birthday"
                  :disabled="disabled"
                  :label="$t('teacherProfile.birthday')"
                  clearable
                  clear-icon="mdi-close-circle"
                  :prepend-inner-icon="svg.calendarStar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="birthday"
                no-title
                scrollable
                :max="new Date().toISOString().substr(0, 10)"
                min="1930-01-01"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  {{ $t('learningModule.cancel') }}
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(birthday)">
                  {{ $t('learningModule.save') }}
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <!-- <v-col cols="12" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birthday"
                  :disabled="disabled"
                  :label="$t('teacherProfile.birthday')"
                  clearable
                  clear-icon="mdi-close-circle"
                  :prepend-inner-icon="svg.calendarStar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="birthday"
                locale="ru"
                :max="new Date().toISOString().substr(0, 10)"
                min="1930-01-01"
              ></v-date-picker>
            </v-menu>
          </v-col> -->
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="country"
              :rules="[() => !!country || $t('teacherProfile.fieldRules')]"
              :items="countryNames"
              :prepend-inner-icon="svg.bornMap"
              :label="$t('teacherProfile.birthplace')"
              :disabled="disabled"
              @input="onInput"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="city"
              :label="$t('teacherProfile.location')"
              :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
              clearable
              clear-icon="mdi-close-circle"
              :disabled="disabled"
            ></v-text-field>
            <!-- <v-autocomplete
              v-model="city"
              :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
              :items="cityItems"
              :prepend-inner-icon="svg.location"
              :label="$t('teacherProfile.location')"
              :disabled="disabled"
            ></v-autocomplete> -->
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="dataTeacher.phone"
              :prepend-inner-icon="svg.phone"
              :rules="phoneRules"
              placeholder="89999999999"
              clearable
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.phone')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="dataTeacher.email"
              :prepend-inner-icon="svg.email"
              :rules="emailRules"
              clearable
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.email')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-textarea
              v-model="dataTeacher.contactInformation"
              clearable
              auto-grow
              rows="2"
              row-height="10"
              :prepend-inner-icon="svg.info"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.contactInformation')"
              :disabled="disabled"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              v-model="dataTeacher.education"
              :items="educationItems"
              :prepend-inner-icon="svg.diplom"
              :label="$t('teacherProfile.education')"
              :disabled="disabled"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-textarea
              v-model="dataTeacher.placeOfWork"
              clearable
              auto-grow
              rows="2"
              row-height="10"
              :prepend-inner-icon="svg.office"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.placeOfWork')"
              :disabled="disabled"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-textarea
              v-model="dataTeacher.aboutMe"
              clearable
              auto-grow
              rows="1"
              row-height="10"
              :prepend-inner-icon="svg.human"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.about')"
              :disabled="disabled"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="4">
            <v-textarea
              v-model="dataTeacher.descriptionLesson"
              clearable
              auto-grow
              rows="2"
              row-height="10"
              :prepend-inner-icon="svg.skill"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.descriptionLesson')"
              :disabled="disabled"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-row>
      <v-row class="pt-n10 px-7 justify-center">
        <v-col v-for="(cityField, i) in cities" :key="i" cols="6" md="4">
          <!-- <v-select
            v-model="cityField.value"
            :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
            :items="cityLessonItems"
            :label="$t('teacherProfile.citiesForLessons')"
            :disabled="disabled"
            class="d-flex flex-row mb-6"
            style="min-width: 174px"
          ></v-select> -->
          <!-- <v-autocomplete
            v-model="cityField.value"
            :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
            :items="cityLessonItems"
            :label="$t('teacherProfile.citiesForLessons')"
            :disabled="disabled"
            class="d-flex flex-row mb-6"
            style="min-width: 174px"
          ></v-autocomplete> -->
          <v-text-field
            v-model="cityField.value"
            :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
            :label="$t('teacherProfile.citiesForLessons')"
            :disabled="disabled"
            class="d-flex flex-row mb-6"
            style="min-width: 174px"
          ></v-text-field>
          <v-btn
            v-if="profileEditable"
            class="error"
            :disabled="disabled"
            @click="removeCity(i)"
            >{{ $t('teacherProfile.delete') }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="pt-n10 px-7 justify-center">
        <v-col v-if="profileEditable" cols="12" md="4" class="pt-7">
          <v-btn class="primary" @click="addCity">{{
            $t('teacherProfile.addCity')
          }}</v-btn>
        </v-col>
      </v-row>
      <v-row class="px-12 pt-6 justify-center">
        <v-col cols="12" md="6">
          <h2 class="text-h5 center">{{ $t('teacherProfile.subjects') }}</h2>
        </v-col>
        <v-col cols="12" md="6" class="pa-5 my-n2 ms-5">
          <div v-for="(sub, i) in dataTeacher.subjects" :key="i">
            <v-divider v-if="i >= 1" class="my-4"></v-divider>

            <!-- <v-select
              v-if="sub.name"
              v-model="sub.name"
              :prepend-inner-icon="svg.range"
              clearable
              clear-icon="mdi-close-circle"
              :label="$t('studentProfile.subName')"
              :items="itemSub"
              disabled
            ></v-select> -->
            <div>
              <v-select
                v-model="sub.categoryName"
                :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
                background-color="white"
                :label="$t('studentProfile.subCategory')"
                clearable
                :items="categoryItem"
                :disabled="disabled"
                @change="getSubject(sub.categoryName, i)"
              ></v-select>
              <v-select
                v-if="sub.openSubject"
                v-model="sub.name"
                background-color="white"
                :label="$t('studentProfile.subName')"
                clearable
                :items="sub.subjectItems"
                :disabled="disabled"
              ></v-select>
            </div>
            <v-checkbox
              v-model="sub.lessonLocation"
              :label="$t('teacherProfile.subRemotely')"
              :value="$t('teacherProfile.subRemotely')"
              :disabled="disabled"
            ></v-checkbox>
            <v-checkbox
              v-model="sub.lessonLocation"
              :label="$t('teacherProfile.subHomeTeacher')"
              :value="$t('teacherProfile.subHomeTeacher')"
              :disabled="disabled"
            ></v-checkbox>

            <v-checkbox
              v-model="sub.lessonLocation"
              :label="$t('teacherProfile.subHomeStudent')"
              :value="$t('teacherProfile.subHomeStudent')"
              :disabled="disabled"
            ></v-checkbox>
            <v-checkbox
              v-model="sub.lessonLocation"
              :label="$t('teacherProfile.subHomeTeacherOrStudent')"
              :value="$t('teacherProfile.subHomeTeacherOrStudent')"
              :disabled="disabled"
            ></v-checkbox>

            <v-text-field
              v-model="sub.price"
              :prepend-inner-icon="svg.bank"
              clearable
              :rules="numRules"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.subPrice')"
              :disabled="disabled"
            ></v-text-field>

            <v-select
              v-model="sub.currency"
              :prepend-inner-icon="svg.currency"
              :items="CurrencyItem"
              :label="$t('teacherProfile.subCurrency')"
              :disabled="disabled"
            ></v-select>

            <v-col v-if="profileEditable" cols="6" md="6" class="ma-2">
              <v-btn class="error" @click="remove(i)">{{
                $t('teacherProfile.delete')
              }}</v-btn>
            </v-col>
          </div>
          <v-col v-if="profileEditable" cols="6" md="6" class="ma-2">
            <v-btn class="primary" @click="add">{{
              $t('teacherProfile.addField')
            }}</v-btn>
          </v-col>
        </v-col>
      </v-row>

      <!----------- PERSONAL END ------------------>

      <v-row class="px-4 pb-1 justify-center">
        <v-col>
          <v-card-actions v-if="profileEditable">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="loadingForm"
              text
              @click="cancelEdit()"
            >
              {{ $t('teacherProfile.cancel') }}
            </v-btn>
            <v-btn color="primary" :loading="loadingForm" @click="save">
              {{ $t('teacherProfile.save') }}
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
// ICONS
import {
  mdiHandball,
  mdiAccountHeart,
  mdiAccount,
  mdiAccountMultiple,
  mdiPodium,
  mdiWeb,
  mdiCameraAccount,
  mdiHuman,
  mdiOfficeBuilding,
  mdiGenderMaleFemale,
  mdiCalendarStar,
  mdiMapMarker,
  mdiMapMarkerRadius,
  mdiEarth,
  mdiCityVariant,
  mdiCalendarMultipleCheck,
  mdiHumanMaleFemale,
  mdiSchool,
  mdiBank,
  mdiBook,
  mdiEye,
  mdiAccountTie,
  mdiInformation,
  mdiCellphone,
  mdiAt,
  mdiLink,
  mdiCurrencyUsd
} from '@mdi/js'

import { mapGetters } from 'vuex'

const countriesRu = require('@/assets/lang/country/ru/countries.json')
// const countriesEn = require('@/assets/lang/country/en/countries.json')
const countriesHe = require('@/assets/lang/country/he/countries.json')
const citiesRu = require('@/assets/lang/cities/ru/cities.json')
// const citiesEn = require('@/assets/lang/cities/en/cities.json')
const citiesHe = require('@/assets/lang/cities/he/cities.json')
export default {
  components: {},
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visability: this.$t('profile.visibilityTypes'),
      uploadRules: [
        value => !value || value.size < 2000000 || this.$t('imageLegthErr')
      ],
      svg: {
        user: mdiAccount,
        users: mdiAccountMultiple,
        gender: mdiGenderMaleFemale,
        calendarStar: mdiCalendarStar,
        bornMap: mdiMapMarker,
        location: mdiMapMarkerRadius,
        country: mdiEarth,
        city: mdiCityVariant,
        range: mdiCalendarMultipleCheck,
        manWoman: mdiHumanMaleFemale,
        school: mdiSchool,
        bank: mdiBank,
        diplom: mdiBook,
        office: mdiOfficeBuilding,
        human: mdiHuman,
        recImg: mdiCameraAccount,
        lang: mdiWeb,
        skill: mdiPodium,
        accHeart: mdiAccountHeart,
        handBall: mdiHandball,
        eye: mdiEye,
        business: mdiAccountTie,
        info: mdiInformation,
        phone: mdiCellphone,
        email: mdiAt,
        link: mdiLink,
        currency: mdiCurrencyUsd
      },
      date: null,
      menu: null,
      dataTeacher: {},
      country: '',
      city: '',
      birthday: '',
      sexItem: [
        this.$t('teacherProfile.sexItemWoman'),
        this.$t('teacherProfile.sexItemMan')
      ],
      cityItems: [],
      cityLessonItems: [],
      countrySecond: '',
      cities: [],
      CurrencyItem: ['USD', 'RUB', 'EUR'],
      educationItems: [
        this.$t('teacherProfile.educationitemsHigher'),
        this.$t('teacherProfile.educationitemsInitialGeneral'),

        this.$t('teacherProfile.educationitemsLowerSecondary'),

        this.$t('teacherProfile.educationitemsCompleteSecondary'),

        this.$t('teacherProfile.educationitemsSecondaryVocational')
      ],
      countryNames: [],
      countryCode: '',
      nameCategory: '',
      valid: true,
      isLoading: true,
      categoryItem: [],
      openSubject: false,
      dataFilter: {}
      // ruItem: [
      //   this.$t('studentProfile.math'),
      //   this.$t('studentProfile.language'),
      //   this.$t('studentProfile.physics'),
      //   this.$t('studentProfile.geography')
      // ],
      // heItem: [
      //   'תמטיקה תיכון 3 יח',
      //   'מתמטיקה תיכון 4 יח',
      //   'מתמטיקה תיכון 5 יחידות',
      //   'אלגברה',
      //   'חדוא 1',
      //   'חדוא 2',
      //   'חדוא 3',
      //   'אינפי 1',
      //   'אינפי 2',
      //   'אינפי 3',
      //   'תורת הקבוצות',
      //   'קומבינטוריקה',
      //   'הסתברות'
      // ],
      // itemSub: []
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    ...mapGetters([
      'loadingForm',
      'profileEditable',
      'getCategoryList',
      'getSubjects'
    ]),
    disabled() {
      return !this.profileEditable
    },
    fullNameRules() {
      return [
        v => !!v || this.$t('teacherProfile.fieldRules'),
        v => (v && v.length <= 50) || this.$t('teacherProfile.nameRulesPattern')
      ]
    },
    emailRules() {
      return [
        v => !!v || this.$t('teacherProfile.emailRules'),
        v => /.+@.+\..+/.test(v) || this.$t('teacherProfile.rulesPattern')
      ]
    },
    phoneRules() {
      return [
        v => !!v || this.$t('teacherProfile.phoneRules'),
        v => {
          const pattern = /^(\d){1,11}$/g
          return pattern.test(v) || this.$t('teacherProfile.rulesPattern')
        }
      ]
    },
    numRules() {
      return [
        v => !!v || this.$t('teacherProfile.fieldRules'),
        v => /^\d+$/.test(v) || this.$t('teacherProfile.rulesPattern')
      ]
    }
  },
  watch: {},
  async mounted() {
    if (this.data) {
      this.dataTeacher = { ...this.data }
      for (const item of this.dataTeacher.subjects) {
        item.subjectItems = await this.getSubject(item.categoryName)
        item.openSubject = true
      }
      this.birthday = this.dataTeacher.birthday.substr(0, 10)
      this.country = this.dataTeacher.cityOfResidence.country
      this.city = this.dataTeacher.cityOfResidence.city
      this.cities = this.dataTeacher.citiesForLessons.map(item => {
        return {
          value: item
        }
      })
    }
    await this.getCategory()
    this.countryGetName('name')
    this.onInput()
    this.isLoading = false
  },
  methods: {
    async getCategory() {
      await this.$store.dispatch('GET_CATEGORY', this.$i18n.locale)
      this.categoryItem = [...this.getCategoryList]
    },
    async getSubject(category, i) {
      const object = { ln: this.$i18n.locale, name: category }
      await this.$store.dispatch('GET_SUBJECTS', object)

      if (i !== undefined) {
        this.dataTeacher.subjects[i].subjectItems.splice(
          0,
          100,
          ...this.getSubjects
        )
        this.dataTeacher.subjects[i].name = ''
        this.dataTeacher.subjects[i].openSubject = true
      } else {
        return this.getSubjects
      }
    },
    countryGetName(lan) {
      if (this.currentRouteName.substr(-2) === 'ru') {
        this.countryNames = countriesRu.map(x => {
          return x[lan]
        })
      } else if (this.currentRouteName.substr(-2) === 'he') {
        this.countryNames = countriesHe.map(x => {
          return x[lan]
        })
      }
    },
    removeCity(index) {
      this.cities.splice(index, 1)
    },
    addCity() {
      this.cities.push({
        value: ''
      })
    },
    remove(index) {
      this.dataTeacher.subjects.splice(index, 1)
    },
    add() {
      this.dataTeacher.subjects.push({
        name: '',
        lessonLocation: [],
        price: 0,
        currency: '',
        categoryName: '',
        openSubject: false,
        subjectItems: []
      })
    },
    cancelEdit() {
      this.$store.commit('PROFILE_EDITABLE_OFF')
      this.dataTeacher = { ...this.data }
      this.country = this.dataTeacher.cityOfResidence.country
      this.birthday = this.dataTeacher.birthday
      this.city = this.dataTeacher.cityOfResidence.city
      this.cities = this.dataTeacher.citiesForLessons.map(item => {
        return {
          value: item
        }
      })
      // this.$store.state.profileEditable = false
    },
    save() {
      console.log(this.dataTeacher)
      this.dataTeacher.cityOfResidence = {
        city: this.city,
        country: this.country
      }
      this.dataTeacher.citiesForLessons = this.cities.map(item => item.value)
      this.dataTeacher.birthday = this.birthday
      this.$store.dispatch('PUT_TEACHER', {
        data: this.dataTeacher
      })
      this.$store.commit('PROFILE_EDITABLE_OFF')
    },

    onInput() {
      // this.countrySecond = this.country
      // this.cityItems = this.getCities(this.countrySecond)
      // // console.log(this.cityItems)
      // this.cityLessonItems = this.getCities(this.countrySecond)
    },
    getCities(country) {
      if (!country) return []
      if (this.currentRouteName.substr(-2) === 'ru') {
        const search = countriesRu.filter(x => x.name === country)
        if (!search.length) return []
        this.countryCode = search[0].code
        const searchCity = citiesRu.filter(
          x => x.country_code === this.countryCode
        )
        return searchCity.map(x => x.name)
      } else if (this.currentRouteName.substr(-2) === 'he') {
        const search = countriesHe.filter(x => x.name === country)
        if (!search.length) return []
        this.countryCode = search[0].code
        const searchCity = citiesHe.filter(
          x => x.country_code === this.countryCode
        )
        return searchCity.map(x => x.name)
      }
    },
    // getCities(country) {
    //   console.log(citiesRu)
    //   const search = citiesRu.filter(x => x.name === country)
    //   if (!search.length) return []
    //   const cities = search.map(x => x.cities)[0]
    //   return cities.map(x => x[lan])
    // },
    async sendFormTeacher(formData) {
      await this.$store.dispatch('AUTH_FORM_TEACHER', formData)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep input[type='number'] {
  -moz-appearance: textfield;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
