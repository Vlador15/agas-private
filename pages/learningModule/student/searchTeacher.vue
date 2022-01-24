<template>
  <header>
    <v-form v-if="!isLoading" ref="form" v-model="valid" lazy-validation>
      <div class="inner">
        <span style="font-size: 200%">{{
          $t('studentProfile.searchOnlineClasses')
        }}</span
        ><br />

        <span class="main-text">
          {{ $t('studentProfile.searchTeacherRightNow') }}
        </span>
        <div class="fields">
          <v-select
            v-model="nameCategory"
            background-color="white"
            :label="$t('studentProfile.subCategory')"
            filled
            :rules="[v => !!v || $t('studentProfile.fieldRules')]"
            :items="categoryItem"
            required
            @change="getSubject"
          ></v-select>
          <v-select
            v-if="openSubject"
            v-model="name"
            background-color="white"
            :label="$t('studentProfile.subName')"
            filled
            :rules="[v => !!v || $t('studentProfile.fieldRules')]"
            :items="subjectItem"
            required
          ></v-select>
          <v-text-field
            v-model="city"
            clearable
            background-color="white"
            height="56px"
            :label="$t('studentProfile.location')"
          ></v-text-field>
        </div>
        <v-btn :disabled="!valid" class="search" x-large @click="pageTeachers">
          {{ $t('studentProfile.search') }}
        </v-btn>
      </div>
    </v-form>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      dataFilter: {},
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
      // itemSub: [],
      itemTeacher: [
        this.$t('studentProfile.moscow'),
        this.$t('studentProfile.volgograd')
      ],
      name: '',
      city: '',
      nameCategory: '',
      valid: true,
      isLoading: true,
      categoryItem: [],
      subjectItem: [],
      openSubject: false
    }
  },
  computed: {
    ...mapGetters(['getCategoryList', 'getSubjects'])
  },
  async mounted() {
    await this.getCategory()
    // if (this.$i18n.locale === 'ru') {
    //   this.itemSub = [...this.ruItem]
    // } else {
    //   this.itemSub = [...this.heItem]
    // }
    this.isLoading = false
  },
  methods: {
    async getCategory() {
      await this.$store.dispatch('GET_CATEGORY', this.$i18n.locale)
      this.categoryItem = [...this.getCategoryList]
    },
    async sendSearchTeacher() {
      this.dataFilter.subject = this.name
      if (this.city) {
        this.dataFilter.citiesForLessons = [this.city]
      }
      await this.$store.dispatch('POST_TEACHER_FILTER', this.dataFilter)
      // this.$router.push({
      //   name: `learningModule-listTeachers___${this.$i18n.locale}`
      // })
      this.$router.push({
        name: `learningModule-listTeachers___${this.$i18n.locale}`,
        params: { dataFilter: this.dataFilter }
      })
    },
    async getSubject() {
      const object = { ln: this.$i18n.locale, name: this.nameCategory }
      this.dataFilter.nameCategory = this.nameCategory
      await this.$store.dispatch('GET_SUBJECTS', object)
      this.subjectItem = this.getSubjects
      this.openSubject = true
    },
    pageTeachers() {
      if (this.$refs.form.validate()) {
        this.sendSearchTeacher()
      }
    }
  }
}
</script>
<style scoped>
header {
  position: relative;
  background: url(https://cdn.discordapp.com/attachments/914528007132180521/930445892153114664/12-frustrated-student.png)
    center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
}

header:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.main-text {
  position: relative;
  top: 100px;
  display: inline-block;
  font-size: 20px;
}

.search {
  position: relative;
  top: 150px;

  display: inline-block;
}
.fields {
  position: relative;
  top: 150px;
  width: 50%;
}

.inner {
  display: inline-block;
  position: relative;
  z-index: 3;
  right: 160px;
  bottom: 100px;

  color: #fff;
  text-align: left;
  padding: 200px;
}
</style>
