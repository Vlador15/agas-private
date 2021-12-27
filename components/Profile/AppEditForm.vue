<template>
  <v-form ref="form" class="mb-4" @submit.prevent="handleSubmit">
    <v-row class="px-12 pt-6 justify-center">
      <!----------- PERSONAL ---------------------->
      <v-row class="pb-12 justify-center">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="userDetails.name"
            :prepend-inner-icon="svg.user"
            :label="$t('profile.name')"
            :disabled="disabled"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="userDetails.lastName"
            :prepend-inner-icon="svg.users"
            :label="$t('profile.surname')"
            :disabled="disabled"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            key="value"
            v-model="userDetails.sex"
            :prepend-inner-icon="svg.gender"
            :label="$t('profile.gender')"
            :items="genders"
            :disabled="disabled"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="userDetails.bornDate"
                :disabled="disabled"
                :label="$t('profile.birthday')"
                :prepend-inner-icon="svg.calendarStar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="userDetails.bornDate"
              locale="ru"
              :max="new Date().toISOString().substr(0, 10)"
              min="1930-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="userDetails.bornPlace"
            :prepend-inner-icon="svg.bornMap"
            :label="$t('profile.birthplace')"
            :disabled="disabled"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="userDetails.location"
            :prepend-inner-icon="svg.location"
            :label="$t('profile.location')"
            :disabled="disabled"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="userDetails.maritalStatus"
            :prepend-inner-icon="svg.manWoman"
            :label="$t('profile.rStatus')"
            :items="maritalStatus"
            item-value="key"
            :disabled="disabled"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="userDetails.phone"
            :prepend-inner-icon="svg.phone"
            :label="$t('profile.phone')"
            :disabled="disabled"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="userDetails.visible"
            :prepend-inner-icon="svg.eye"
            :label="$t('profile.profileVisibility')"
            :items="visability"
            item-value="key"
            :disabled="disabled"
          ></v-select>
        </v-col>
      </v-row>
      <!----------- PERSONAL END ------------------>
      <!----------- COUNTRIES --------------------->
      <v-col cols="12">
        <div class="text-h5 center">{{ $t('profile.places') }}</div>
      </v-col>
      <v-col cols="12" class="pb-12">
        <v-row
          v-for="(place, i) in userDetails.places"
          :key="i"
          class="justify-center"
        >
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="place.country"
              :prepend-inner-icon="svg.country"
              :label="$t('profile.country')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="place.city"
              :prepend-inner-icon="svg.city"
              :label="$t('profile.city')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-menu
              ref="menuRange"
              :v-model="menuPlaces[i]"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="userPlaces[i].yearsStr"
                  :disabled="disabled"
                  :label="$t('profile.timeOfStay')"
                  :prepend-inner-icon="svg.range"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="pickerRange"
                v-model="place.years"
                :selected-items-text="userPlaces[i].yearsStr"
                range
                locale="ru"
                @change="savePlacesDate(i)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            v-if="!disabled"
            cols="1"
            class="d-flex justify-start align-center"
          >
            <v-btn
              class="mx-2"
              icon
              small
              color="primary"
              @click="removePlace(i)"
            >
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="!disabled" class="center">
          <v-btn class="mx-2" fab small color="primary" @click="addPlace()">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
      <!----------- COUNTRIES END ----------------->
      <!----------- EDUCATION --------------------->
      <v-col cols="12" class="pb-12">
        <v-col cols="12">
          <div class="text-h5 center">{{ $t('profile.education') }}</div>
        </v-col>
        <v-row
          v-for="(edu, i) in userDetails.edu"
          :key="i"
          class="justify-center mb"
        >
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" md="6">
            <v-col>
              <v-text-field
                v-model="edu.title"
                :prepend-inner-icon="svg.bank"
                :label="$t('profile.institution')"
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-menu
                ref="menuEduRange"
                v-model="menuEdu[i]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="userEdu[i].yearsStr"
                    :disabled="disabled"
                    :label="$t('profile.eduYears')"
                    :prepend-inner-icon="svg.range"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="pickerEduRange"
                  v-model="edu.years"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1960-01-01"
                  :selected-items-text="userEdu[i].yearsStr"
                  type="month"
                  range
                  locale="ru"
                  @change="saveEduDate(i)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-col>
          <v-col cols="12" md="5">
            <v-col>
              <v-text-field
                v-model="edu.speciality"
                :prepend-inner-icon="svg.school"
                :label="$t('profile.specialty')"
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-file-input
                v-model="edu.diplomImg"
                :prepend-inner-icon="svg.diplom"
                prepend-icon=""
                :rules="uploadRules"
                accept="image/*"
                :label="$t('profile.dPhoto')"
                :disabled="disabled"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
          </v-col>
          <v-col
            v-if="!disabled"
            cols="1"
            class="flex-grow-2 d-flex justify-start align-center"
          >
            <v-btn
              class="mx-2"
              icon
              small
              color="primary"
              @click="removeEdu(i)"
            >
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="!disabled" class="center">
          <v-btn class="mx-2" fab small color="primary" @click="addEdu()">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
      <!----------- EDUCATION END ----------------->
      <!----------- JOB --------------------------->
      <v-col cols="12" class="pb-12">
        <v-col cols="12">
          <div class="text-h5 center">{{ $t('profile.job') }}</div>
        </v-col>
        <v-row
          v-for="(job, i) in userDetails.job"
          :key="i"
          class="justify-center mb"
        >
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" md="6">
            <v-col>
              <v-text-field
                v-model="job.title"
                :prepend-inner-icon="svg.office"
                :label="$t('profile.place')"
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-menu
                ref="menuJobRange"
                v-model="menuJob[i]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="userJob[i].yearsStr"
                    :disabled="disabled"
                    :label="$t('profile.workYears')"
                    :prepend-inner-icon="svg.range"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="pickerJobRange"
                  v-model="job.years"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1960-01-01"
                  :selected-items-text="userJob[i].yearsStr"
                  type="month"
                  range
                  locale="ru"
                  @change="saveJobDate(i)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-col>
          <v-col cols="12" md="5">
            <v-col>
              <v-text-field
                v-model="job.speciality"
                :prepend-inner-icon="svg.human"
                :label="$t('profile.position')"
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-file-input
                v-model="job.recomendationImg"
                :prepend-inner-icon="svg.recImg"
                prepend-icon=""
                :rules="uploadRules"
                accept="image/*"
                :label="$t('profile.recLetter')"
                :disabled="disabled"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
          </v-col>
          <v-col
            v-if="!disabled"
            cols="1"
            class="flex-grow-2 d-flex justify-start align-center"
          >
            <v-btn
              class="mx-2"
              icon
              small
              color="primary"
              @click="removeJob(i)"
            >
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="!disabled" class="center">
          <v-btn class="mx-2" fab small color="primary" @click="addJob()">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
      <!----------- JOB END ----------------------->
      <!----------- LANGS ------------------------->
      <v-col cols="12" class="pb-12">
        <v-col cols="12">
          <div class="text-h5 center">{{ $t('profile.languages') }}</div>
        </v-col>
        <v-row
          v-for="(lang, i) in userDetails.languages"
          :key="i"
          class="justify-center"
        >
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="lang.lang"
              :prepend-inner-icon="svg.lang"
              :label="$t('profile.language')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              v-model="lang.level"
              :prepend-inner-icon="svg.skill"
              :label="$t('profile.level')"
              :items="langLvl"
              item-value="key"
              :disabled="disabled"
            ></v-select>
          </v-col>
          <v-col
            v-if="!disabled"
            cols="1"
            class="flex-grow-2 d-flex justify-start align-center"
          >
            <v-btn
              class="mx-2"
              icon
              small
              color="primary"
              @click="removeLang(i)"
            >
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="!disabled" class="center">
          <v-btn class="mx-2" fab small color="primary" @click="addLang()">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
      <!----------- LANGS END --------------------->
      <!----------- ABOUT ------------------------->
      <v-col cols="12" class="pb-12">
        <v-row class="justify-center">
          <v-col cols="12">
            <div class="text-h5 center">{{ $t('profile.about') }}</div>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="userDetails.hobby"
              :prepend-inner-icon="svg.handBall"
              :label="$t('profile.hobbies')"
              :disabled="disabled"
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="userDetails.interests"
              :prepend-inner-icon="svg.accHeart"
              :label="$t('profile.interests')"
              :disabled="disabled"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <!----------- ABOUT END --------------------->
      <!----------- BUSINESS ------------------------->
      <v-col cols="12" class="pb-12">
        <v-row class="justify-center">
          <v-col cols="12">
            <div class="text-h5 center">{{ $t('profile.business') }}</div>
          </v-col>
          <v-col cols="12" md="12" class="text-center">
            <v-checkbox
              v-model="userDetails.businessProfile"
              class="max-width: 160px; margin: 0 auto"
              :label="$t('profile.businessProfile')"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="userDetails.businessTitle"
              :prepend-inner-icon="svg.business"
              :label="$t('profile.title')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="userDetails.businessLocation"
              :prepend-inner-icon="svg.location"
              :label="$t('profile.bizLocation')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="userDetails.businessType"
              :prepend-inner-icon="svg.info"
              :label="$t('profile.activityType')"
              :disabled="disabled"
            ></v-text-field>
          </v-col>
          <v-col class="pb-12">
            <v-col cols="12">
              <div class="text-h5 center">{{ $t('profile.swLinks') }}</div>
            </v-col>
            <v-row
              v-for="(link, i) in userDetails.businessLinks"
              :key="i"
              class="justify-center"
            >
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="link.url"
                  :prepend-inner-icon="svg.link"
                  :label="$t('profile.link')"
                  :disabled="disabled"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="!disabled"
                cols="1"
                class="flex-grow-2 d-flex justify-start align-center"
              >
                <v-btn
                  class="mx-2"
                  icon
                  small
                  color="primary"
                  @click="removeLink(i)"
                >
                  <v-icon dark>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <div v-if="!disabled" class="center">
              <v-btn class="mx-2" fab small color="primary" @click="addLink()">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <!----------- BUSINESS END --------------------->
    </v-row>
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
            {{ $t('profile.cancel') }}
          </v-btn>
          <v-btn color="primary" :loading="loadingForm" type="submit">
            {{ $t('profile.save') }}
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import Vue from 'vue'

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
  mdiLink
} from '@mdi/js'

import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visability: this.$t('profile.visibilityTypes'),
      genders: this.$t('profile.genders'),
      uploadRules: [
        value => !value || value.size < 2000000 || this.$t('imageLegthErr')
      ],
      menuPlaces: [],
      menuEdu: [],
      menuJob: [],
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
        link: mdiLink
      },
      date: null,
      menu: false,
      menuRange: false,
      userDetails: {}
    }
  },
  computed: {
    maritalStatus() {
      return this.$t('profile.martialStatuses')
    },
    langLvl() {
      return this.$t('profile.langTypes')
    },
    ...mapGetters(['loadingForm', 'profileEditable']),
    disabled() {
      return !this.profileEditable
    },
    userPlaces() {
      return this.userDetails.places.map(p => {
        p.yearsStr = p.years.join(' ~ ')
        return p
      })
    },
    userEdu() {
      return this.userDetails.edu.map(p => {
        p.yearsStr = p.years.join(' ~ ')
        return p
      })
    },
    userJob() {
      return this.userDetails.job.map(p => {
        p.yearsStr = p.years.join(' ~ ')
        return p
      })
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    menuEdu: {
      deep: true,
      handler(val) {
        val &&
          setTimeout(() => {
            this.$refs.pickerEduRange.forEach(item => {
              item.activePicker = 'YEAR'
            })
          })
      }
    },
    menuJob: {
      deep: true,
      handler(val) {
        val &&
          setTimeout(() => {
            this.$refs.pickerJobRange.forEach(item => {
              item.activePicker = 'YEAR'
            })
          })
      }
    }
  },
  mounted() {
    if (this.data) {
      this.userDetails = this.data
    }
    // this.data.bio ? (this.userDetails.bio = this.data.bio) : ''
    // this.data.website ? (this.userDetails.website = this.data.website) : ''
    // this.data.location ? (this.userDetails.location = this.data.location) : ''
  },
  methods: {
    handleSubmit() {
      console.log(this.userDetails)
      this.$store.dispatch('EDIT_USER_DETAILS', this.userDetails).then(res => {
        this.$emit('click')
        this.cancelEdit()
      })
    },
    cancelEdit() {
      this.$store.state.profileEditable = false
    },
    save(date) {
      this.$refs.menu.save(date)
    },
    savePlacesDate(i) {
      this.$refs.menuRange[i].save()
    },
    addPlace() {
      if (this.userDetails.places) {
        this.userDetails.places.push({
          country: '',
          city: '',
          years: []
        })
      } else {
        Vue.set(this.userDetails, 'places', [
          {
            country: '',
            city: '',
            years: []
          }
        ])
      }
    },
    removePlace(i) {
      this.userDetails.places.splice(i, 1)
    },
    saveEduDate(i) {
      this.$refs.menuEduRange[i].save()
    },
    addEdu() {
      if (this.userDetails.edu) {
        this.userDetails.edu.push({
          title: '',
          speciality: '',
          years: [],
          diplomImg: []
        })
      } else {
        Vue.set(this.userDetails, 'edu', [
          {
            title: '',
            speciality: '',
            years: [],
            diplomImg: []
          }
        ])
      }
    },
    removeEdu(i) {
      this.userDetails.edu.splice(i, 1)
    },
    saveJobDate(i) {
      this.$refs.menuJobRange[i].save()
    },
    addJob() {
      if (this.userDetails.job) {
        this.userDetails.job.push({
          title: '',
          speciality: '',
          years: [],
          recomendationImg: []
        })
      } else {
        Vue.set(this.userDetails, 'job', [
          {
            title: '',
            speciality: '',
            years: [],
            recomendationImg: []
          }
        ])
      }
    },
    removeJob(i) {
      this.userDetails.job.splice(i, 1)
    },
    addLang() {
      if (this.userDetails.languages) {
        this.userDetails.languages.push({
          lang: '',
          level: ''
        })
      } else {
        Vue.set(this.userDetails, 'languages', [
          {
            lang: '',
            level: ''
          }
        ])
      }
    },
    removeLang(i) {
      this.userDetails.languages.splice(i, 1)
    },
    addLink() {
      if (this.userDetails.businessLinks) {
        this.userDetails.businessLinks.push({
          url: ''
        })
      } else {
        Vue.set(this.userDetails, 'businessLinks', [
          {
            url: ''
          }
        ])
      }
    },
    removeLink(i) {
      this.userDetails.businessLinks.splice(i, 1)
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
