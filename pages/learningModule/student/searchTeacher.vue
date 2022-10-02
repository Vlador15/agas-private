<template>
  <div class="block-search">
    <v-form
      v-if="!isLoading"
      ref="form"
      v-model="valid"
      class="block-search__container"
      lazy-validation
    >
      <div class="inner-block">
        <p style="font-size: 170%">
          {{ $t('studentProfile.searchOnlineClasses') }}
        </p>

        <p class="main-text">
          {{ $t('studentProfile.searchTeacherRightNow') }}
        </p>
        <div class="fields">
          <v-row class="d-flex">
            <v-select
              v-model="nameCategory"
              background-color="white"
              :label="$t('studentProfile.subCategory')"
              filled
              :rules="[v => !!v || $t('studentProfile.fieldRules')]"
              :items="categoryItem"
              required
              class="select"
              @change="getSubject"
            ></v-select>
            <v-select
              v-if="openSubject"
              v-model="name"
              background-color="white"
              :label="$t('studentProfile.subName')"
              filled
              :items="subjectItem"
              class="field-hint select"
              :hint="$t('optional')"
              persistent-hint
            ></v-select>
          </v-row>
          <v-row>
            <v-text-field
              v-model="city"
              clearable
              background-color="white"
              height="56px"
              class="search-city field-hint select"
              :label="$t('studentProfile.location')"
              :hint="$t('optional')"
              persistent-hint
            ></v-text-field>
          </v-row>
        </div>
        <v-row>
          <v-btn class="search" x-large @click="pageTeachers">
            {{ $t('studentProfile.search') }}
          </v-btn>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      dataFilter: {},
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
    this.isLoading = false
  },
  methods: {
    async getCategory() {
      await this.$store.dispatch('GET_CATEGORY', this.$i18n.locale)
      this.categoryItem = [...this.getCategoryList]
    },
    async sendSearchTeacher() {
      this.dataFilter.nameCategory = this.nameCategory
      this.dataFilter.subject = this.name
      if (this.city) {
        this.dataFilter.citiesForLessons = [this.city]
      }
      await this.$store.dispatch('POST_TEACHER_FILTER', this.dataFilter)
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

<style lang="scss">
.field-hint .v-messages__message {
  color: #ffffffb0;
}
.v-messages__message:before {
  content: '*';
  margin-right: 0.2rem;
}

.search-city .v-input__slot {
  padding: 0 12px;
  border-radius: 5px 5px 0px 0px;
}

.block-search {
  position: relative;
  background: url(https://cdn.discordapp.com/attachments/914528007132180521/930445892153114664/12-frustrated-student.png)
    center no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.block-search:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.block-search__container {
  position: absolute;
  display: inline-block;
  position: absolute;
  z-index: 3;
  top: 50px;
  display: flex;
  width: 100%;
  margin: 0px 100px;
  color: #fff;
  text-align: left;
  color: #fff;
  text-align: left;
}

.v-application--is-rtl {
  .block-search__container {
    text-align: right;
  }
}

.main-text {
  top: 10px;
  font-size: 20px;
}

.search {
  top: 50px;
}

.v-application--is-rtl {
  .select {
    max-width: 300px;
  }
}
.select {
  max-width: 300px;
}
.fields {
  position: relative;
  top: 10px;
  width: 80%;
}
</style>
