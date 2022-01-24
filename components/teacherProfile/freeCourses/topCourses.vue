<template>
  <v-container>
    <v-form v-if="!isLoading" ref="form" v-model="valid" lazy-validation>
      <v-row class="px-12 pt-6 justify-center">
        <v-row class="pb-12 justify-center">
          <v-col cols="12" md="3">
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
              v-model="nameSubject"
              background-color="white"
              :label="$t('studentProfile.subName')"
              filled
              :rules="[v => !!v || $t('studentProfile.fieldRules')]"
              :items="subjectItem"
              required
            ></v-select>
            <!-- <v-text-field
              v-model="itemCourses"
              :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
              clearable
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.subName')"
              required
            ></v-text-field> -->
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="price"
              clearable
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.subPrice')"
              disabled
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="currency"
              :items="CurrencyItem"
              :label="$t('teacherProfile.subCurrency')"
              :rules="[v => !!v || $t('teacherProfile.fieldRules')]"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="10">
            <v-row class="pb-12 justify-center">
              <h2 style="margin-bottom: -50px">
                {{ $t('teacherProfile.lessonLocation') }}
              </h2>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="selected"
                  :label="$t('teacherProfile.subRemotely')"
                  :value="$t('teacherProfile.subRemotely')"
                  :rules="checkboxRules"
                  required
                ></v-checkbox>

                <v-checkbox
                  v-model="selected"
                  :label="$t('teacherProfile.subHomeTeacher')"
                  :value="$t('teacherProfile.subHomeTeacher')"
                  :rules="checkboxRules"
                  required
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="6">
                <v-checkbox
                  v-model="selected"
                  :label="$t('teacherProfile.subHomeStudent')"
                  :value="$t('teacherProfile.subHomeStudent')"
                  :rules="checkboxRules"
                  required
                ></v-checkbox>
                <v-checkbox
                  v-model="selected"
                  :label="$t('teacherProfile.subHomeTeacherOrStudent')"
                  :value="$t('teacherProfile.subHomeTeacherOrStudent')"
                  :rules="checkboxRules"
                  required
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="infoCourses"
              clearable
              auto-grow
              rows="4"
              row-height="20"
              clear-icon="mdi-close-circle"
              :label="$t('teacherProfile.descriptionLesson')"
              :rules="[v => !!v || $t('studentProfile.fieldRules')]"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="pb-12 justify-center">
          <v-col cols="12" md="4">
            <v-btn :disabled="!valid" @click="addSubject">
              {{ $t('teacherProfile.addTestSubject') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopCourses',
  data() {
    return {
      subject: {
        name: '',
        lessonLocation: [],
        price: 0,
        currency: '',
        comment: ''
      },
      nameSubject: '',
      selected: [],
      infoCourses: '',
      price: 0,
      currency: '',
      CurrencyItem: ['USD', 'RUB', 'EUR'],
      valid: true,
      isLoading: true,
      nameCategory: '',
      categoryItem: [],
      subjectItem: [],
      openSubject: false
    }
  },
  computed: {
    ...mapGetters(['getCategoryList', 'getSubjects']),
    numRules() {
      return [
        v => !!v || this.$t('teacherProfile.fieldRules'),
        v => /^\d+$/.test(v) || this.$t('teacherProfile.rulesPattern')
      ]
    },
    checkboxRules() {
      return [this.selected.length > 0 || this.$t('learningModule.rulesField')]
    }
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
    async getSubject() {
      const object = { ln: this.$i18n.locale, name: this.nameCategory }
      await this.$store.dispatch('GET_SUBJECTS', object)
      this.subjectItem = this.getSubjects
      this.openSubject = true
    },
    addSubject() {
      if (this.$refs.form.validate()) {
        this.subject.categoryName = this.nameCategory
        this.subject.name = this.nameSubject
        this.subject.lessonLocation = [...this.selected]
        this.subject.price = this.price
        this.subject.currency = this.currency
        this.subject.comment = this.infoCourses
        this.sendTestSubject()
      }
    },
    async sendTestSubject() {
      await this.$store.dispatch('POST_TEST_SUBJECT', this.subject)
      this.$refs.form.reset()
      this.openSubject = false
      window.scrollTo(0, document.body.scrollHeight)
      // this.reloadPage()
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>
