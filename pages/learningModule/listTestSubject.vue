<template>
  <div v-if="!isLoading">
    <v-row>
      <v-col cols="12" md="8">
        <div v-for="(sub, i) in dataListTeachers" :key="i">
          <cardTeacher :dataCard="sub" class="ml-4"> </cardTeacher>
        </div>
        <div v-if="dataListTeachers.length === 0">
          <h1 style="text-align: center">
            {{ $t('studentProfile.noProfiles') }}
          </h1>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="ma-10">
          <v-row class="ma-2">
            <v-col cols="12" md="8">
              <v-text-field
                v-model="city"
                clearable
                :label="$t('studentProfile.city')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
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
                @change="getSubject"
              ></v-select>
              <v-select
                v-if="openSubject"
                v-model="subject"
                clearable
                background-color="white"
                :label="$t('studentProfile.subName')"
                :items="subjectItem"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-btn @click="filter"> {{ $t('studentProfile.filter') }} </v-btn>
            </v-col>
          </v-row>
        </v-card>
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
      nameCategory: '',
      valid: true,
      categoryItem: [],
      subjectItem: [],
      openSubject: false
      // itemSubject: [
      //   this.$t('studentProfile.language'),
      //   this.$t('studentProfile.math'),
      //   this.$t('studentProfile.geography'),
      //   this.$t('studentProfile.physics')
      // ]
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
      // itemSubject: []
    }
  },
  computed: {
    ...mapGetters(['getTestSubjectFilter', 'getCategoryList', 'getSubjects'])
  },
  async mounted() {
    this.getFilter()
    await this.getTeachersList()
    await this.getCategory()
    // if (this.$i18n.locale === 'ru') {
    //   this.itemSubject = [...this.ruItem]
    // } else {
    //   this.itemSubject = [...this.heItem]
    // }
    this.isLoading = false
  },
  methods: {
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
    async getTeachersList() {
      await this.$store.dispatch('GET_TEACHERS')
      this.dataListTeachers = [...this.getTestSubjectFilter]
      console.log(this.dataListTeachers)
    },
    async filter() {
      this.isLoading = true
      this.dataFilter = {}
      if (this.city) {
        this.dataFilter.citiesForLessons = [this.city]
      }

      if (this.subject && this.nameCategory) {
        this.dataFilter.subject = this.subject
      }

      await this.$store.dispatch('POST_TEST_SUBJECT_FILTER', this.dataFilter)
      this.dataListTeachers = [...this.getTestSubjectFilter]
      this.isLoading = false
    }
  }
}
</script>
