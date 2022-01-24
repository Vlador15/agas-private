<template>
  <v-container v-if="!isLoading">
    <h1 class="ma-5" style="text-align: center">
      {{ $t('teacherProfile.subjects') }}
    </h1>
    <v-row class="px-12 pt-6 justify-center">
      <v-row class="pb-12 justify-center">
        <v-col
          v-for="(sub, i) in dataTestSubject"
          :key="i"
          class="card"
          cols="12"
          lg="4"
          sm="6"
        >
          <v-row>
            <v-col cols="12" class="text-h5 text">
              {{ sub.name }}
              <v-divider></v-divider>
            </v-col>

            <v-col cols="12" class="text-h5 text">
              {{ sub.price }} {{ sub.currency }}
              <v-divider></v-divider>
            </v-col>

            <v-col cols="12" class="text block">
              <p
                v-for="(city, j) in sub.lessonLocation"
                :key="j"
                cols="12"
                class="mr-1 mb-0 block-item"
              >
                {{ city }},
              </p>
            </v-col>
            <v-col
              cols="12"
              class="mb-4"
              style="width: 300px; height: 150px; overflow-y: auto"
            >
              <v-divider></v-divider>
              {{ sub.comment }}
              <v-divider class="my-2"></v-divider>
            </v-col>
            <v-col cols="7" class="text-h5 btn">
              <v-btn small @click="deleteSubject(sub._id)">{{
                $t('teacherProfile.delete')
              }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BotCourses',
  data() {
    return {
      dataTestSubject: [],
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['getTestSubject'])
    // getAddSubject() {
    //   this.dataTestSubject = [...this.getTestSubject]

    //   return this.dataTestSubject
    // }
  },
  watch: {
    getTestSubject() {
      this.dataTestSubject.push(this.getTestSubject)
    }
  },
  async mounted() {
    await this.getDataTestSubject()
    this.isLoading = false
  },
  methods: {
    async getDataTestSubject() {
      await this.$store.dispatch('GET_TEST_SUBJECT')
      this.dataTestSubject = this.getTestSubject
    },
    async deleteSubject(sub) {
      await this.$store.dispatch('DELETE_TEST_SUBJECT', sub)
      await this.getDataTestSubject()
    }
  }
}
</script>

<style>
.card {
  /* max-width: 33.3%; */
  border: 1px solid #cccccca3;
  height: 400px;
  position: relative;
}
.text {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.btn {
  position: absolute;
  bottom: 5px;
}
.block {
  display: flex;
  flex-wrap: wrap;
}
.block-item {
  margin-bottom: 0;
  overflow-y: auto;
}
</style>
