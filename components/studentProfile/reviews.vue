<template>
  <v-container>
    <!-- добавить отзыв -->
    <!-- <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Добавить отзыв
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
            <v-text-field
              v-model="second"
              clearable
              clear-icon="mdi-close-circle"
              label="Отзыв"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Добавить отзыв
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> -->
    <h1>greherh</h1>
    <div
      v-for="(sub, i) in data"
      :key="i"
      class="my-12"
      style="margin-right: 220px"
    >
      <v-card
        class="mx-auto elevation-20"
        color="primary"
        dark
        disabled
        style="max-width: 800px"
      >
        <v-row justify="space-between">
          <v-col cols="3" md="3">
            <div class="ml-8 mt-5">
              <v-row>
                <v-rating
                  v-model="sub.rating"
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="18"
                ></v-rating>
                <span class="grey--text text--lighten-2 text-caption mr-2"
                  >({{ sub.rating }})</span
                >
              </v-row>
            </div>

            <v-card-title>
              <div>
                <div class="text-h7">{{ sub.createdName }}</div>
                <div class="text-h7" style="font-size: 15px">
                  {{ moment(sub.createdAt).format('DD.MM.YYYY') }}
                </div>
                <div class="text-h7" style="font-size: 15px">
                  <h1>greehre</h1>
                </div>
              </div>
            </v-card-title>
          </v-col>

          <v-img
            class="shrink ma-4 mr-8"
            contain
            height="125px"
            src="sub.photo"
            style="flex-basis: 125px"
          ></v-img>
        </v-row>

        <v-divider dark></v-divider>
        <v-card-actions class="pa-4">
          <div class="text-h5">
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
    }
  },
  data() {
    return {
      dialog: false,
      rating: 0,
      second: ''
    }
  },
  computed: {},
  mounted() {},

  methods: {}
}
</script>
