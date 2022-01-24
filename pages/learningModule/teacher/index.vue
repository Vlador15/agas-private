<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-card>
        <v-form v-if="!isLoading" ref="form" v-model="valid" lazy-validation>
          <h1 class="pa-6 ml-2">{{ $t('learningModule.myForm') }}</h1>
          <v-row>
            <v-col cols="6" md="5" class="ma-2 ms-8">
              <v-text-field
                v-model="formTeacher.fullName"
                :counter="50"
                :rules="fullNameRules"
                :label="$t('learningModule.fullName')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="5" class="ma-2 ms-10">
              <v-file-input
                v-model="formTeacher.photo"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-camera"
                :label="$t('learningModule.pickPhoto')"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="5" class="ma-2 ms-8">
              <v-select
                v-model="formTeacher.sex"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :items="sexItem"
                :label="$t('learningModule.pickSex')"
                required
              ></v-select>
            </v-col>
            <v-col cols="4" md="5" class="ma-2 ms-10">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="formTeacher.birthday"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formTeacher.birthday"
                    :rules="[v => !!v || $t('learningModule.rulesField')]"
                    :label="$t('learningModule.birthday')"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formTeacher.birthday"
                  no-title
                  scrollable
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1930-01-01"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    {{ $t('learningModule.cancel') }}
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(formTeacher.birthday)"
                  >
                    {{ $t('learningModule.save') }}
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="5" class="ma-2 ms-8">
              <v-autocomplete
                v-model="formTeacher.cityOfResidence.country"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :items="countryNames"
                :label="$t('learningModule.country')"
                required
                @input="onInput"
              ></v-autocomplete>
              <!-- <v-select
                v-model="formTeacher.cityOfResidence.country"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :items="countryItems"
                :label="$t('learningModule.country')"
                required
                @input="onInput"
              ></v-select> -->
            </v-col>
            <v-col
              v-if="formTeacher.cityOfResidence.country"
              cols="6"
              md="5"
              class="ma-2 ms-10"
            >
              <v-text-field
                v-model="formTeacher.cityOfResidence.city"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :label="$t('learningModule.residenceCity')"
                required
              ></v-text-field>
              <!-- <v-select
                v-model="formTeacher.cityOfResidence.city"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :items="cityItems"
                :label="$t('learningModule.residenceCity')"
                required
              ></v-select> -->
            </v-col>
          </v-row>

          <v-row>
            <v-col
              v-if="formTeacher.cityOfResidence.city"
              cols="6"
              md="6"
              class="ma-2 ms-8"
            >
              <h3>{{ $t('learningModule.cityLessons') }}</h3>
              <div v-for="(cityField, i) in cities" :key="i">
                <v-row>
                  <v-col cols="6" md="6" class="ma-2">
                    <v-text-field
                      v-model="cityField.value"
                      :rules="[v => !!v || $t('learningModule.rulesField')]"
                      :label="cityField.labelCity"
                      required
                    ></v-text-field>
                    <!-- <v-select
                      v-model="cityField.value"
                      :rules="[v => !!v || $t('learningModule.rulesField')]"
                      :items="cityLessonItems"
                      :label="cityField.labelCity"
                      required
                    ></v-select> -->
                  </v-col>
                  <v-col cols="4" md="4" class="mt-5">
                    <v-btn class="error" @click="removeCity(i)">{{
                      $t('learningModule.deleteCity')
                    }}</v-btn>
                  </v-col>
                </v-row>
              </div>

              <div cols="6" md="6" class="ma-2">
                <v-btn class="primary" @click="addCity">{{
                  $t('learningModule.addCity')
                }}</v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="5" class="ma-2 ms-8">
              <v-text-field
                v-model="formTeacher.phone"
                :rules="phoneRules"
                placeholder="89999999999"
                :label="$t('learningModule.phone')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="5" class="ma-2 ms-10">
              <v-text-field
                v-model="formTeacher.email"
                :rules="emailRules"
                :label="$t('learningModule.email')"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="5" class="ma-2 ms-8">
              <v-select
                v-model="formTeacher.education"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :items="educationItems"
                :label="$t('learningModule.education')"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="8" class="pa-5 my-n10 ms-5">
              <v-textarea
                v-model="formTeacher.contactInformation"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                clearable
                auto-grow
                clear-icon="mdi-close-circle"
                :label="$t('learningModule.contactInformation')"
                value=""
                required
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" md="8" class="pa-5 my-n4 ms-5">
              <v-textarea
                v-model="formTeacher.placeOfWork"
                clearable
                auto-grow
                clear-icon="mdi-close-circle"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                :label="$t('learningModule.placeOfWork')"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="8" class="pa-5 my-n4 ms-5">
              <v-textarea
                v-model="formTeacher.aboutMe"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                clearable
                auto-grow
                clear-icon="mdi-close-circle"
                :label="$t('learningModule.aboutMe')"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="8" class="pa-5 my-n4 ms-5">
              <v-textarea
                v-model="formTeacher.descriptionLesson"
                :rules="[v => !!v || $t('learningModule.rulesField')]"
                clearable
                auto-grow
                clear-icon="mdi-close-circle"
                :label="$t('learningModule.descriptionLesson')"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="6" class="pa-5 my-n2 ms-5">
              <h3>{{ $t('learningModule.mySubjects') }}</h3>

              <div
                v-for="(textField, i) in subjectsSecond"
                :key="i"
                class="card-subject"
              >
                <v-select
                  v-model="textField.value0"
                  background-color="white"
                  :label="textField.label0"
                  filled
                  :rules="[v => !!v || $t('studentProfile.fieldRules')]"
                  :items="categoryItem"
                  required
                  @change="getSubject(textField.value0, i)"
                ></v-select>
                <v-select
                  v-if="textField.openSubject"
                  v-model="textField.value1"
                  background-color="white"
                  :label="textField.label1"
                  filled
                  :rules="[v => !!v || $t('studentProfile.fieldRules')]"
                  :items="textField.subjectItems"
                  required
                ></v-select>
                <!-- <v-select
                  v-model="textField.value1"
                  background-color="white"
                  :label="textField.label1"
                  filled
                  :rules="[v => !!v || $t('learningModule.rulesField')]"
                  :items="itemSub"
                  required
                ></v-select> -->

                <v-checkbox
                  v-model="selected"
                  :rules="checkboxRules"
                  :label="$t('learningModule.subRemotely')"
                  :value="subRemotely"
                  required
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  :rules="checkboxRules"
                  :label="$t('learningModule.subHomeTeacher')"
                  :value="subHomeTeacher"
                  required
                ></v-checkbox>

                <v-checkbox
                  v-model="selected"
                  :rules="checkboxRules"
                  :label="$t('learningModule.subHomeStudent')"
                  :value="subHomeStudent"
                  required
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  :rules="checkboxRules"
                  :label="$t('learningModule.subHomeTeacherOrStudent')"
                  :value="subHomeTeacherOrStudent"
                  required
                ></v-checkbox>
                <v-text-field
                  v-model="textField.value3"
                  :rules="numRules"
                  :label="textField.label3"
                  required
                ></v-text-field>

                <v-select
                  v-model="textField.value4"
                  :rules="[v => !!v || $t('learningModule.rulesField')]"
                  :label="textField.label4"
                  :items="CurrencyItem"
                  required
                ></v-select>

                <v-col cols="6" md="6" class="ma-2">
                  <v-btn class="error" @click="remove(i)">{{
                    $t('learningModule.delete')
                  }}</v-btn>
                </v-col>
              </div>

              <v-col cols="6" md="6" class="ma-2">
                <v-btn class="primary" @click="add">{{
                  $t('learningModule.addField')
                }}</v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col md="4" offset-md="10" class="ma-2 ms-5">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                {{ $t('learningModule.create') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
const countriesRu = require('@/assets/lang/country/ru/countries.json')
// const countriesEn = require('@/assets/lang/country/en/countries.json')
const countriesHe = require('@/assets/lang/country/he/countries.json')

const countries = require('./countries.json')

export default {
  name: 'Teacher',
  components: {},
  data() {
    return {
      formTeacher: {
        fullName: '',
        photo: null,
        sex: null,
        birthday: null,
        cityOfResidence: {
          country: '',
          city: ''
        },
        citiesForLessons: [],
        email: '',
        phone: '',
        contactInformation: '',
        education: '',
        placeOfWork: '',
        aboutMe: '',
        descriptionLesson: '',
        subjects: []
      },
      nameSubjects: '',
      lessonLocationSubjects: [],
      priceSubjects: 0,
      currencySubjects: '',
      cities: [{ labelCity: this.$t('learningModule.labelCity'), value: '' }],
      valid: true,
      mainCoutry: '',

      sexItem: [
        this.$t('learningModule.sexItemMan'),
        this.$t('learningModule.sexItemWoman')
      ],
      city: '',
      menu: false,
      countrySecond: '',
      countryItems: this.getCountries('ru'),
      cityItems: [],
      cityLesson: '',
      cityLessonItems: [],

      // cityFields: [],
      checkboxRemotely: false,
      checkboxTeacherHouse: false,
      checkboxStudentHouse: false,
      checkboxStudentTeacherHouse: false,
      subjectsSecond: [
        {
          openSubject: false,
          subjectItems: [],
          label0: this.$t('studentProfile.subCategory'),
          value0: '',
          label1: this.$t('learningModule.subFieldName'),
          value1: '',
          label3: this.$t('learningModule.subFieldPrice'),
          value3: '',
          label4: this.$t('learningModule.subFieldCurrency'),
          value4: ''
        }
      ],

      selectCurrency: null,
      CurrencyItem: ['USD', 'RUB', 'EUR'],
      selected: [],
      educationItems: [
        this.$t('learningModule.educationitemsHigher'),
        this.$t('learningModule.educationitemsInitialGeneral'),

        this.$t('learningModule.educationitemsLowerSecondary'),

        this.$t('learningModule.educationitemsCompleteSecondary'),

        this.$t('learningModule.educationitemsSecondaryVocational')
      ],
      subRemotely: this.$t('learningModule.subRemotely'),
      subHomeTeacher: this.$t('learningModule.subHomeTeacher'),
      subHomeStudent: this.$t('learningModule.subHomeStudent'),
      subHomeTeacherOrStudent: this.$t(
        'learningModule.subHomeTeacherOrStudent'
      ),
      countryNames: [],

      isLoading: true,
      categoryItem: [],
      subjectItem: []
    }
  },
  computed: {
    ...mapGetters(['getCategoryList', 'getSubjects']),
    currentRouteName() {
      return this.$route.name
    },
    fullNameRules() {
      return [
        v => !!v || this.$t('learningModule.nameRules'),
        v => (v && v.length <= 50) || this.$t('learningModule.nameRulesPattern')
      ]
    },
    emailRules() {
      return [
        v => !!v || this.$t('learningModule.emailRules'),
        v => /.+@.+\..+/.test(v) || this.$t('learningModule.rulesPattern')
      ]
    },
    phoneRules() {
      return [
        v => !!v || this.$t('learningModule.phoneRules'),
        v => {
          const pattern = /^(\d){1,11}$/g
          return pattern.test(v) || this.$t('learningModule.rulesPattern')
        }
      ]
    },
    numRules() {
      return [
        v => !!v || this.$t('learningModule.rulesField'),
        v => /^\d+$/.test(v) || this.$t('learningModule.rulesPattern')
      ]
    },
    checkboxRules() {
      return [this.selected.length > 0 || this.$t('learningModule.rulesField')]
    }
  },
  async mounted() {
    this.countryGetName('name')
    await this.getCategory()
    this.isLoading = false
  },
  methods: {
    async getCategory() {
      await this.$store.dispatch('GET_CATEGORY', this.$i18n.locale)
      this.categoryItem = [...this.getCategoryList]
    },
    // async getSubject(sub, i) {
    //   const object = { ln: this.$i18n.locale, name: sub }
    //   await this.$store.dispatch('GET_SUBJECTS', object)
    //   // this.subjectItem = this.getSubjects
    //   this.subjectsSecond[i].subjectItems = this.getSubjects
    //   this.subjectsSecond[i].openSubject = true
    // },
    async getSubject(category, i) {
      const object = { ln: this.$i18n.locale, name: category }
      await this.$store.dispatch('GET_SUBJECTS', object)

      if (i !== undefined) {
        this.subjectsSecond[i].subjectItems.splice(0, 100, ...this.getSubjects)
        this.subjectsSecond[i].name = ''
        this.subjectsSecond[i].openSubject = true
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
    onInput(selected) {
      // this.countrySecond = selected
      // this.cityItems = this.getCities('ru', this.countrySecond)
      // this.cityLessonItems = this.getCities('ru', this.countrySecond)
    },
    addCity() {
      this.cities.push({
        labelCity: this.$t('learningModule.rulesField'),
        value: ''
      })
    },
    removeCity(index) {
      this.cities.splice(index, 1)
    },
    add() {
      this.subjectsSecond.push({
        openSubject: false,
        subjectItems: [],
        label0: this.$t('studentProfile.subCategory'),
        value0: '',
        label1: this.$t('learningModule.subFieldName'),
        value1: '',
        label3: this.$t('learningModule.subFieldPrice'),
        value3: '',
        label4: this.$t('learningModule.subFieldCurrency'),
        value4: ''
      })
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.cities.forEach((item, index) => {
          this.formTeacher.citiesForLessons[index] = item.value
        })
        const sub = []
        this.subjectsSecond.forEach((item, index) => {
          if (this.lessonLocationSubjects.length === 0) {
            this.lessonLocationSubjects.push(this.selected)
          } else {
            this.lessonLocationSubjects.splice(0)
            this.lessonLocationSubjects.push(this.selected)
          }

          sub.push({
            categoryName: item.value0,
            name: item.value1,
            price: item.value3,
            currency: item.value4,
            lessonLocation: this.selected
          })
        })
        this.formTeacher.subjects = sub
        const photo = this.formTeacher.photo
        const formData = new FormData()
        formData.append('photo', photo, photo.name)
        formData.append('data', JSON.stringify(this.formTeacher))
        this.sendFormTeacher(formData)
        console.log(this.formTeacher)
        setTimeout(() => this.nextPage(), 3000)
      } else {
        alert(this.$t('learningModule.alert'))
      }
    },
    remove(index) {
      this.subjectsSecond.splice(index, 1)
    },
    nextPage() {
      this.$router.push({
        name: `learningModule-teacher-teacherProfile___ru`
      })
    },
    getCountries: lan => {
      return countries.map(x => {
        return x[lan]
      })
    },

    getCities(lan, country) {
      // console.log(this.formTeacher.cityOfResidence.country)
      const search = countries.filter(x => x[lan] === country)
      if (!search.length) return []
      const cities = search.map(x => x.cities)[0]
      return cities.map(x => x[lan])
    },
    async sendFormTeacher(formData) {
      await this.$store.dispatch('AUTH_FORM_TEACHER', formData)
    }
    // opa() {

    // }
  }
}
</script>
<style lang="scss">
.card-subject {
  width: 300px;
}
</style>
