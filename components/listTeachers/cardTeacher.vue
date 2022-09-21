<template>
  <div>
    <v-card
      class="mx-auto my-7 card"
      max-width="900"
      outlined
      :class="{ 'sub-active': dataCard.subscription.status }"
      @click="nextPageTeacher()"
    >
      <v-list-item three-line>
        <v-list-item-content class="list-content">
          <v-row class="w-max card-top">
            <v-col cols="9" md="10" sm="9" lg="10" class="text-h5 card-title">
              <div>
                <p class="text-small mb-n1">
                  {{ $t('tutor') }}:
                  <b>{{ dataCard.subjects[0] && dataCard.subjects[0].name }}</b>
                </p>

                <p class="teacher-title mb-n1">{{ dataCard.fullName }}</p>
                <v-rating
                  v-model="dataCard.rating"
                  readonly
                  background-color="yellow lighten-3"
                  color="yellow"
                  class="pa-0"
                ></v-rating>

                <v-list-item-subtitle>
                  {{ $t('studentProfile.lengthReviews') }}:
                  {{ dataCard.feedbacks.length }}
                </v-list-item-subtitle>
              </div>
              <div>
                <v-list-item-title class="price">
                  {{ dataCard.subjects[0] && dataCard.subjects[0].price
                  }}<span class="price">{{
                    dataCard.subjects[0] && dataCard.subjects[0].currency
                  }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>{{ $t('inHour') }} </v-list-item-subtitle>
              </div>
            </v-col>

            <!-- <v-col cols="12" md="2" sm="3" lg="2">
              <v-list-item-title class="price">
                {{ dataCard.subjects[0] && dataCard.subjects[0].price
                }}<span class="price">{{
                  dataCard.subjects[0] && dataCard.subjects[0].currency
                }}</span>
              </v-list-item-title>
              <v-list-item-subtitle> в час </v-list-item-subtitle>
            </v-col> -->

            <v-col cols="3" md="2" sm="3" lg="2">
              <span v-if="dataCard.photo[0]" rounded="0" size="100">
                <v-img
                  class="card-img"
                  :src="profileImg"
                  style="max-width: 150px"
                ></v-img
              ></span>

              <span v-else tile size="85" color="grey"></span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" sm="12">
              <p class="text-overline city-text mb-n1">
                {{ $t('trained') }}:
                <b class="mb-n1 ellipse">{{ dataCard.placeOfWork }}</b>
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" sm="12">
              <p class="text-overline city-text mb-n1">
                {{ $t('studentProfile.citiesForLessons') }}:
                <b
                  v-for="(city, j) in dataCard.citiesForLessons"
                  :key="j"
                  class="ellipse"
                >
                  {{ city.trim() }}
                </b>
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" sm="12">
              <p class="mb-n1 about-me">
                <span class="mark"> «</span>
                {{ dataCard.aboutMe.substring(0, 230) }}...
                <span class="mark"> »</span>
              </p>
            </v-col>
          </v-row>

          <v-row class="my-4">
            <!-- <v-btn
              v-if="dataCard.subscription.status"
              class="button"
              small
              color="#2962ff"
              elevation="3"
              >Написать в WhatsApp</v-btn
            > -->
            <div
              v-if="dataCard.subscription.status && showPhone"
              class="d-flex align-center ml-1"
              @click.stop.prevent=""
            >
              <b style="padding: 0.5rem">{{ dataCard.phone }}</b>
            </div>
            <div v-if="dataCard.subscription.status && !showPhone">
              <v-btn
                v-if="dataCard.subscription.status"
                class="button"
                small
                color="#2962ff"
                elevation="3"
                @click.stop.prevent="showPhoneF"
                >{{ $t('teacherProfile.showPhone') }}</v-btn
              >
            </div>
            <v-btn
              class="button"
              color="#2962ff"
              elevation="3"
              small
              @click.stop.prevent="nextPageChat"
              >{{ $t('teacherProfile.writeTeacher') }}</v-btn
            >
          </v-row>
        </v-list-item-content>

        <!-- <v-list-item-avatar v-if="dataCard.photo[0]" rounded="0" size="100">
          <v-img class="card-img" :src="profileImg"></v-img
        ></v-list-item-avatar>

        <v-list-item-avatar
          v-else
          tile
          size="85"
          color="grey"
        ></v-list-item-avatar> -->
      </v-list-item>
    </v-card>
  </div>
</template>

<style lang="scss">
.card-title {
  display: flex;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.button {
  font-size: 12px !important;
  margin: 0.2rem 0.2rem 0.2rem 1rem;
  border-radius: 5px;
  color: #fff !important;

  @media (max-width: 600px) {
    width: 90%;
    margin: 0.2rem 12px;
  }
}
.mark {
  font-size: 24px;
  color: #ff5a1b;
  font-weight: bold;
}
.w-max {
  width: 100%;
}
.list-content {
  flex-direction: column;
  align-items: flex-start;
}
.list-content .row {
  margin-top: -12px;
}
.text-small {
  font-size: 12px;
  line-height: normal;
}
.price {
  color: #ff4700;
  font-size: 18px;
}
.ellipse {
  background: #c9e8ff;
  padding: 0.5rem;
  border-radius: 15px;
  margin-right: 0.5rem;
}
.card {
  box-shadow: 2px 2px 10px 2px #4242428c;
  /* overflow: auto; */
  height: auto !important;
  padding: 0.5rem;
}
.card:hover {
  background: #f5f5f5;
}
.card-img {
  width: 100px;
  height: 100px;
  @media (max-width: 440px) {
    width: 80px;
    height: 80px;
  }
}
.teacher-title {
  font-size: 24px;
  line-height: normal;
  padding: 0.5rem 0;
}
.v-rating .v-icon {
  padding: 0rem;
}

@media (max-width: 900px) {
  .v-application .city-text {
    letter-spacing: 0.01rem !important;
    text-transform: none !important;
  }
}
@media (max-width: 600px) {
  .v-list-item {
    padding: 0 !important;
  }
}
.sub-active {
  border: 2px solid #d06647 !important;
}
</style>

<script>
export default {
  components: {},
  props: {
    dataCard: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showPhone: false,
      text_forms: [
        this.$t('studentProfile.ageFormFirst'),
        this.$t('studentProfile.ageFormSecond'),
        this.$t('studentProfile.ageFormThird')
      ]
    }
  },
  computed: {
    profileImg() {
      return `${process.env.LEARNING_API}/apiLearning/` + this.dataCard.photo[0]
    }
  },
  mounted() {},
  methods: {
    showPhoneF(e) {
      console.log(e)
      e.preventDefault()
      this.showPhone = true
    },
    nextPageChat() {
      this.$router.push({
        name: `messager-dialog-id___${this.$i18n.locale}`,
        params: { id: this.dataCard.uid }
      })
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
    nextPageTeacher() {
      this.$router.push({
        name: `learningModule-teacherProfileFromStudent___${this.$i18n.locale}`,
        params: { teacherProfileFromStudent: this.dataCard.uid }
      })
    }
  }
}
</script>
