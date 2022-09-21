<template>
  <v-container>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" width="200px" v-on="on">
            {{ $t('teacherProfile.addFeedback') }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 primary lighten-2">
            <p style="font-size: 15px">({{ rating }})</p>
            <v-rating
              v-model="rating"
              background-color="white"
              color="yellow accent-4"
              dense
              hover
              size="18"
            ></v-rating>
          </v-card-title>

          <v-card-text>
            <v-textarea
              v-model="textFeedback"
              clearable
              auto-grow
              rows="2"
              row-height="10"
              :label="$t('teacherProfile.feedback')"
            ></v-textarea>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="sendReviews">
              {{ $t('teacherProfile.addFeedback') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div v-for="(sub, i) in data" :key="i" class="my-6">
      <v-card class="mx-auto elevation-2" color="card-reviews" readonly>
        <v-row justify="space-between">
          <v-col cols="12" md="12" lg="12">
            <v-card-title>
              <div>
                <img
                  class="reviews-img"
                  :src="profileImg(sub.photo)"
                  alt="logo"
                />
              </div>
              <v-row class="reviews-block">
                <p class="text-title">
                  {{ sub.fullName }}
                </p>
                <p class="text-desc">
                  {{ new Date(sub.createdAt).toLocaleString() }}
                </p>
                <div class="d-flex">
                  <v-rating
                    v-model="sub.rating"
                    background-color="white"
                    color="yellow accent-4"
                    dense
                    readonly
                    hover
                    size="18"
                  ></v-rating>
                  <span class="grey--text text--lighten-2 text-caption mr-2"
                    >({{ sub.rating }})</span
                  >
                </div>
              </v-row>
            </v-card-title>
            <v-card-title class="reviews-text">
              <p class="text-title">{{ sub.text }}</p>
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<style lang="scss">
.reviews-block {
  line-height: normal;
  display: flex;
  flex-direction: column;
}
.reviews-block p {
  margin-bottom: 0;
}
.card-reviews {
  border-radius: 5px;
  border: 1px solid #d7d7d7 !important;
  border-color: #d7d7d7 !important;
  background-color: #f7f7f7 !important;
  color: #000;
}
.reviews-img {
  width: 70px;
  height: 70px;
  max-width: 70px;
  max-height: 70px;
  border-radius: 50%;
  margin: 1rem 2rem;

  @media (max-width: 500px) {
    margin: 0.5rem 1rem;
  }
  @media (max-width: 400px) {
    margin: 0.5rem 1rem 0.5rem 0;
  }
}
.reviews-text {
  margin-top: -32px;
  @media (max-width: 500px) {
    margin-top: -0;
  }
}
</style>

<script>
export default {
  name: 'Reviews',
  components: {},
  props: {
    data: {
      type: Array,
      required: true
    },
    uId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      rating: 0,
      textFeedback: '',
      dataFeedback: {}
    }
  },
  computed: {},
  mounted() {},

  methods: {
    profileImg(path) {
      return `${process.env.LEARNING_API}/apiLearning/${path}`
    },
    async sendReviews() {
      this.dataFeedback.teacherId = this.uId
      this.dataFeedback.text = this.textFeedback
      this.dataFeedback.rating = this.rating
      await this.$store.dispatch('POST_FEEDBACK', this.dataFeedback)
      this.reloadPage()
      this.dialog = false
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>
