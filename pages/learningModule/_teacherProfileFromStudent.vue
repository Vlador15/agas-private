<template>
  <v-container v-if="!isLoading">
    <v-card max-width="1200">
      <v-img
        class="white--text align-end"
        height="100%"
        :src="require('@/assets/teacherProfile.jpg')"
      >
        <v-row align="end" class="fill-height">
          <v-col cols="12" md="4" sm="4" xs="4" class="ml-8">
            <v-avatar size="230">
              <v-img class="ma-8 profile" :src="profileImg"></v-img>
            </v-avatar>
          </v-col>

          <v-col cols="12" md="4" sm="4" xs="4">
            <v-row class="py-7 justify-center">
              <v-col cols="7">
                <v-rating
                  v-model="dataTeacher.rating"
                  readonly
                  class="mr-n5"
                  background-color="white lighten-3"
                  color="white"
                ></v-rating>
              </v-col>
              <v-col cols="5">
                <span class="grey--text text--lighten-2 text-caption">
                  ({{ dataTeacher.rating.toFixed(1) }})
                </span>
              </v-col>
              <v-col v-if="dataTeacher.subscription.status" cols="12" md="11">
                <div>{{ $t('teacherProfile.phoneTeacher') }}</div>

                <div v-if="showPhone" cols="5">
                  <div>{{ dataTeacher.phone }}</div>
                </div>
                <div v-if="!showPhone" cols="4">
                  <v-btn x-small @click="showPhone = true">{{
                    $t('teacherProfile.showPhone')
                  }}</v-btn>
                </div>
              </v-col>
              <v-col cols="11">
                <div>
                  {{ $t('teacherProfile.location') }}:
                  {{ dataTeacher.cityOfResidence.city }}
                </div>
              </v-col>
              <v-col cols="11">
                <div>
                  {{ $t('teacherProfile.gender') }}:
                  {{ dataTeacher.sex }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-card-title class="ml-6"
          >{{ dataTeacher.fullName }}
          <div class="mx-3">
            {{ $t('teacherProfile.age') }} {{ dataTeacher.age }}
            <span>{{ ageChange(dataTeacher.age) }}</span>
          </div>

          <v-btn small @click="nextPageChat">{{
            $t('teacherProfile.writeTeacher')
          }}</v-btn>
        </v-card-title>
      </v-img>

      <v-card-text class="text--primary text-center">
        <v-row class="justify-center">
          <v-col cols="12" md="12">
            <v-card
              width="100%"
              outlined
              style="
                width: 100%;
                background: #e2f1fc;
                border: 1px solid #a9c9ff;
                font-size: 16px;
                padding: 1rem 0.5rem;
              "
            >
              <v-row style="text-align: left">
                <v-col cols="6">
                  {{ $t('teacherProfile.descriptionLesson') }}
                  {{ dataTeacher.descriptionLesson }}
                </v-col>
                <v-col cols="6">
                  {{ $t('teacherProfile.contactInformation') }}
                  {{ dataTeacher.contactInformation }}
                </v-col>
                <v-col cols="6">
                  {{ $t('teacherProfile.education') }}
                  {{ dataTeacher.education }}
                </v-col>
                <v-col cols="6">
                  {{ $t('teacherProfile.about') }} {{ dataTeacher.aboutMe }}
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="(sub, i) in dataTeacher.subjects"
            :key="i"
            cols="12"
            md="4"
            sm="4"
            class="pr-14"
          >
            <v-card
              height="auto"
              width="auto"
              style="background: #a9c9ff; text-align: left; padding: 1em"
            >
              <p>{{ $t('teacherProfile.subName') }}</p>
              <p class="text-h6 mb-1">
                {{ sub.name }}
              </p>
              <!-- <v-text-field
                v-model="sub.name"
                clearable
                clear-icon="mdi-close-circle"
                label="Название предмета"
                disabled
              ></v-text-field> -->

              <v-checkbox
                v-if="sub.lessonLocation[0]"
                v-model="sub.lessonLocation"
                :label="$t('teacherProfile.subRemotely')"
                :value="$t('teacherProfile.subRemotely')"
                readonly
              ></v-checkbox>
              <v-checkbox
                v-if="sub.lessonLocation[1]"
                v-model="sub.lessonLocation"
                :label="$t('teacherProfile.subHomeTeacher')"
                :value="$t('teacherProfile.subHomeTeacher')"
                readonly
              ></v-checkbox>

              <v-checkbox
                v-if="sub.lessonLocation[2]"
                v-model="sub.lessonLocation"
                :label="$t('teacherProfile.subHomeStudent')"
                :value="$t('teacherProfile.subHomeStudent')"
                readonly
              ></v-checkbox>
              <v-checkbox
                v-if="sub.lessonLocation[3]"
                v-model="sub.lessonLocation"
                :label="$t('teacherProfile.subHomeTeacherOrStudent')"
                :value="$t('teacherProfile.subHomeTeacherOrStudent')"
                readonly
              ></v-checkbox>
              <p>Цена</p>
              <p class="text-h6 mb-1">
                {{ sub.price }}
              </p>
              <p>{{ $t('teacherProfile.subCurrency') }}</p>
              <p class="text-h6 mb-1">
                {{ sub.currency }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <reviews
      style="background: #e3f2fd"
      class="px-auto mx-auto pt-10"
      :data="feedbacks"
      :uId="$route.params.teacherProfileFromStudent"
    >
    </reviews>
  </v-container>
</template>

<script>
import reviews from '@/components/teacherProfile/reviews.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    reviews
  },
  props: {
    dataStudent: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showPhone: false,
      feedbacks: [],
      isLoading: true,
      dataTeacher: {},
      text_forms: [
        this.$t('studentProfile.ageFormFirst'),
        this.$t('studentProfile.ageFormSecond'),
        this.$t('studentProfile.ageFormThird')
      ]
    }
  },
  computed: {
    ...mapGetters(['getTeacherIdData']),

    profileImg() {
      return `${process.env.LEARNING_API}/` + this.dataTeacher.photo[0]
    }
  },
  async mounted() {
    await this.getForm()
    // await this.getFeedBacks()
    this.isLoading = false
  },
  methods: {
    async getForm() {
      await this.$store.dispatch(
        'GET_TEACHER_ID',
        this.$route.params.teacherProfileFromStudent
      )
      this.dataTeacher = this.getTeacherIdData
      console.log(this.dataTeacher)
      this.feedbacks = this.getTeacherIdData.feedbacks
    },
    ageChange(n) {
      n = Math.abs(n) % 100
      const n1 = n % 10
      if (n > 10 && n < 20) {
        return this.text_forms[2]
      }
      if (n1 > 1 && n1 < 5) {
        return this.text_forms[1]
      }
      if (n1 === 1) {
        return this.text_forms[0]
      }
      return this.text_forms[2]
    },
    nextPageChat() {
      this.$router.push({
        name: `messager-dialog-id___${this.$i18n.locale}`,
        params: { id: this.dataTeacher.uid }
      })
    }
    // async getFeedBacks() {
    //   await this.$store.dispatch('GET_FEEDBACKS')
    //   this.feedbacks = this.feedbacksGet
    // }
  }
}
</script>
