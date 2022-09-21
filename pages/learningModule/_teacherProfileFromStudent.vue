<template>
  <v-container v-if="!isLoading">
    <v-card max-width="1200">
      <v-img
        class="white--text align-center teacher-fon-img"
        :src="require('@/assets/teacherProfile.jpg')"
      >
        <v-row class="fill-height header-block columns">
          <v-col class="columns" cols="12" md="12" lg="12">
            <div class="column">
              <div class="info-block__img">
                <v-avatar size="170">
                  <v-img class="ma-8 profile-img" :src="profileImg"></v-img>
                </v-avatar>
              </div>
            </div>

            <div class="column">
              <div class="info-block">
                <div class="info-block__text">
                  <p class="profile-name">{{ dataTeacher.fullName }}</p>
                  <p class="city">
                    {{ $t('teacherProfile.location') }}:
                    {{ dataTeacher.cityOfResidence.city }}
                  </p>
                  <p>
                    {{ dataTeacher.age }}
                    <span>{{ ageChange(dataTeacher.age) }}</span>
                  </p>
                  <div class="rating-block">
                    <v-rating
                      v-model="dataTeacher.rating"
                      readonly
                      background-color="yellow lighten-3"
                      color="yellow"
                      class="pa-0"
                    >
                    </v-rating>
                    <span class="white--text text--lighten-2 text-caption">
                      {{ $t('studentProfile.lengthReviews') }}:
                      {{ dataTeacher.feedbacks.length }}
                      <span class="grey--text text--lighten-2 text-caption">
                        ({{ dataTeacher.rating.toFixed(1) }})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col class="column" cols="12" md="12" lg="12">
            <div class="buttons">
              <div
                v-if="dataTeacher.subscription.status && showPhone"
                class="mr-2"
              >
                <div>{{ dataTeacher.phone }}</div>
              </div>

              <v-btn
                v-if="dataTeacher.subscription.status && !showPhone"
                small
                color="primary"
                class="mr-2"
                @click="showPhone = true"
                >{{ $t('teacherProfile.showPhone') }}</v-btn
              >
              <v-btn small color="primary" class="pa-2" @click="nextPageChat">{{
                $t('teacherProfile.writeTeacher')
              }}</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-img>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-card width="100%" outlined class="text-card">
              <div>
                <p class="text-title">{{ $t('teacherProfile.about') }}:</p>
                <p class="text-desc pb-4">{{ dataTeacher.aboutMe }}</p>
              </div>
              <div>
                <p class="text-title">
                  {{ $t('teacherProfile.descriptionLesson') }}:
                </p>
                <p class="text-desc pb-4">
                  {{ dataTeacher.descriptionLesson }}
                </p>
              </div>
              <div>
                <p class="text-title">{{ $t('teacherProfile.education') }}:</p>
                <p class="text-desc pb-4">{{ dataTeacher.education }}</p>
              </div>
              <div>
                <p class="text-title">
                  {{ $t('teacherProfile.contactInformation') }}:
                </p>
                <p class="text-desc">{{ dataTeacher.contactInformation }}</p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-card width="100%" outlined class="text-card">
              <div>
                <p class="text-title mb-4">
                  {{ $t('studentProfile.citiesForLessons') }}:
                </p>
                <span
                  v-for="(city, j) in dataTeacher.citiesForLessons"
                  :key="j"
                  class="ellipse text-desc"
                >
                  {{ city.trim() }}
                </span>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-card width="100%" outlined class="text-card">
              <div>
                <p class="text-title mb-4">{{ $t('subjectsTaught') }}:</p>

                <v-simple-table dense style="max-width: 500px">
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="sub in dataTeacher.subjects" :key="sub.name">
                        <td>{{ sub.name }}</td>
                        <td>
                          {{ sub.price }}{{ sub.currency }}/{{ $t('inHour') }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <reviews
            class="px-auto mx-auto pt-10"
            :data="feedbacks"
            :uId="$route.params.teacherProfileFromStudent"
          >
          </reviews>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="scss">
.buttons {
  display: flex;
  flex-wrap: wrap;
}
@media (max-width: 540px) {
  .buttons button {
    width: 100%;
    margin: 0.2rem 0 !important;
  }
}
.columns {
  display: flex;
  padding: 0 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}
.column {
  display: block;
  padding: 0.75rem;
}
.header-block {
  display: flex;
  justify-content: space-between;
}
.info-block__img {
  margin-right: 1rem;
}
.profile-img {
  border: 5px solid #fff;
}
.profile-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
}
.info-block p {
  margin-bottom: 0 !important;
}
.info-block {
  font-size: 18px !important;
}

.teacher-fon-img {
  max-height: 350px;

  @media (max-width: 620px) {
    max-height: none;
    padding: 1rem;
  }
  @media (max-width: 400px) {
    padding: 0.5rem;
  }
}

.text-block {
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.5rem;
}
.text-title {
  font-size: 18px;
  font-weight: bold;
  color: #484848;
  line-height: 1.125;
  margin-bottom: 0.5rem !important;
}
.text-desc {
  font-size: 14px;
  color: #4a4a4a;
}
.text-card {
  width: 100%;
  background: #f9f9f9;
  border: 1px solid #a9c9ff;
  font-size: 16px;
  padding: 1rem 0.5rem;
}
.ellipse {
  border: 1px solid #ccc;
  background: #fff;
  padding: 0.5rem;
  border-radius: 15px;
  margin-right: 0.5rem;
  line-height: 40px;
}
</style>

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
      return (
        `${process.env.LEARNING_API}/apiLearning/` + this.dataTeacher.photo[0]
      )
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
      this.feedbacks = this.getTeacherIdData.feedbacks
      console.log(this.dataTeacher)
    },
    ageChange(n) {
      n = Math.abs(n) % 100
      const n1 = n % 10
      if (n > 10 && n < 20) {
        return this.text_forms[2].toLowerCase()
      }
      if (n1 > 1 && n1 < 5) {
        return this.text_forms[1].toLowerCase()
      }
      if (n1 === 1) {
        return this.text_forms[0].toLowerCase()
      }
      return this.text_forms[2].toLowerCase()
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
