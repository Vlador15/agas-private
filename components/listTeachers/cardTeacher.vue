<template>
  <div>
    <v-card
      v-if="dataCard.subscription.status"
      class="mx-auto my-7"
      max-width="800"
      style="border: 2px solid #b90404"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-col cols="7" class="text-h5 mb-4">
              {{ dataCard.fullName }}
              <p class="text-overline mt-2">
                {{ $t('studentProfile.gender') }} {{ dataCard.sex }}
              </p>
              <p class="text-overline mb-n2">
                {{ $t('studentProfile.age') }} {{ dataCard.age }}
                <span>{{ ageChange(dataCard.age) }}</span>
              </p>
            </v-col>
            <v-col cols="12" md="5">
              <v-rating
                v-model="dataCard.rating"
                readonly
                background-color="yellow lighten-3"
                color="yellow"
              ></v-rating>
            </v-col>
          </v-row>
          <v-list-item-title class="text-h6 mb-1">
            {{ dataCard.aboutMe }}
            <v-divider class="my-2"></v-divider>
            <p class="text-overline mb-4">
              {{ $t('studentProfile.citiesForLessons') }}
            </p>
            <div v-for="(city, j) in dataCard.citiesForLessons" :key="j">
              <p class="mr-1">{{ city }}</p>
            </div>
            <v-divider class="my-2"></v-divider>
            <p class="text-overline mb-4">{{ $t('studentProfile.subName') }}</p>
            <div v-for="(subjects, m) in dataCard.subjects" :key="m">
              <v-row>
                <v-col cols="5">
                  <p>- {{ subjects.name }}</p>
                </v-col>
                <v-col cols="6" class="ml-10">
                  <p>
                    {{ $t('studentProfile.subPrice') }} {{ subjects.price }}
                    {{ subjects.currency }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('studentProfile.lengthReviews') }}
            {{ dataCard.feedbacks.length }}</v-list-item-subtitle
          >
        </v-list-item-content>

        <v-list-item-avatar v-if="dataCard.photo[0]" size="85">
          <v-img class="card-img" :src="profileImg"></v-img
        ></v-list-item-avatar>

        <v-list-item-avatar
          v-else
          tile
          size="85"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="nextPageTeacher()">
          {{ $t('studentProfile.pageTeacher') }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-else class="mx-auto my-7" max-width="800" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-row>
            <v-col cols="7" class="text-h5 mb-4">
              {{ dataCard.fullName }}
              <p class="text-overline mt-2">
                {{ $t('studentProfile.gender') }} {{ dataCard.sex }}
              </p>
              <p class="text-overline mb-n2">
                {{ $t('studentProfile.age') }}{{ dataCard.age }}
                <span>{{ ageChange(dataCard.age) }}</span>
              </p>
            </v-col>
            <v-col cols="12" md="5">
              <v-rating
                v-model="dataCard.rating"
                readonly
                background-color="yellow lighten-3"
                color="yellow"
              ></v-rating>
            </v-col>
          </v-row>
          <v-list-item-title class="text-h6 mb-1">
            {{ dataCard.aboutMe }}
            <v-divider class="my-2"></v-divider>
            <p class="text-overline mb-4">
              {{ $t('studentProfile.citiesForLessons') }}
            </p>
            <div v-for="(city, j) in dataCard.citiesForLessons" :key="j">
              <p class="mr-1">{{ city }}</p>
            </div>
            <v-divider class="my-2"></v-divider>
            <p class="text-overline mb-4">{{ $t('studentProfile.subName') }}</p>
            <div v-for="(subjects, m) in dataCard.subjects" :key="m">
              <v-row>
                <v-col cols="5">
                  <p>- {{ subjects.name }}</p>
                </v-col>
                <v-col cols="6" class="ml-10">
                  <p>
                    {{ $t('studentProfile.subPrice') }} {{ subjects.price }}
                    {{ subjects.currency }}
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('studentProfile.lengthReviews') }}
            {{ dataCard.feedbacks.length }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar v-if="dataCard.photo[0]" size="85">
          <v-img class="card-img" :src="profileImg"></v-img
        ></v-list-item-avatar>

        <v-list-item-avatar
          v-else
          tile
          size="85"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="nextPageTeacher()">
          {{ $t('studentProfile.pageTeacher') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

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
      text_forms: [
        this.$t('studentProfile.ageFormFirst'),
        this.$t('studentProfile.ageFormSecond'),
        this.$t('studentProfile.ageFormThird')
      ]
    }
  },
  computed: {
    profileImg() {
      return `${process.env.LEARNING_API}/` + this.dataCard.photo[0]
    }
  },
  mounted() {},
  methods: {
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
