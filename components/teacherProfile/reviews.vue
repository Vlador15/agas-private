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
              half-increments
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

    <div v-for="(sub, i) in data" :key="i" class="my-12">
      <v-card
        class="mx-auto elevation-20"
        color="primary"
        dark
        readonly
        style="max-width: 850px"
      >
        <v-row justify="space-between">
          <v-col cols="12" md="3" xs="4">
            <v-card-title>
              <v-row>
                <v-col cols="12" class="text-h7 pa-4">
                  {{ sub.fullName }}
                </v-col>
                <v-col class="text-h7 pa-4" style="font-size: 15px">
                  {{ new Date(sub.createdAt).toLocaleString() }}
                </v-col>
              </v-row>
            </v-card-title>
          </v-col>
          <v-col cols="12" md="4">
            <div class="ma-8">
              <v-row>
                <v-rating
                  v-model="sub.rating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  readonly
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <span class="grey--text text--lighten-2 text-caption mr-2"
                  >({{ sub.rating }})</span
                >
              </v-row>
            </div>
          </v-col>

          <v-img
            class="shrink ma-4 mr-8"
            height="125px"
            :src="profileImg(sub.photo)"
            style="flex-basis: 125px"
          ></v-img>
        </v-row>

        <v-divider dark></v-divider>
        <v-card-actions class="pa-4">
          <!-- <v-textarea v-model="sub.text"></v-textarea> -->
          <div class="text-h5" style="overflow: auto">
            {{ sub.text }}
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

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
      return `${process.env.LEARNING_API}/${path}`
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
