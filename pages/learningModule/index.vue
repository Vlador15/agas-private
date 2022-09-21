<template>
  <v-container v-if="!isLoading">
    <div class="ag-board-main-tabs">
      <!-- <v-btn
        v-for="link in $t('learningModule_categories')"
        :key="link.routing"
        x-large
        color="primary"
        class="categories-btn"
        @click="routerValid(link.routing, link.key)"
      >
        <p class="categories-text">{{ link.name }}</p>
      </v-btn>

      <v-img
        v-for="link in $t('learningModule_categories')"
        :key="link.routing"
        class="categories-img"
        :src="require('~/assets/teacherFon.jpg')"
        @click="routerValid(link.routing, link.key)"
      >
        <p class="categories-text">
          <span>{{ link.name }}</span>
        </p>
      </v-img> -->

      <div
        v-for="link in $t('learningModule_categories')"
        :key="link.routing"
        class="categories-btn"
        @click="routerValid(link.routing, link.key)"
      >
        <img width="80" :src="link.img" alt="img" />
        <p class="categories-text">
          {{ link.name }}
        </p>
      </div>

      <div v-if="getValideModer" class="categories-btn" @click="nextModer()">
        <img width="80" :src="moder.img" alt="img" />
        <p class="categories-text">
          {{ moder.name }}
        </p>
      </div>

      <!-- <v-btn v-if="getValideModer" x-large color="primary" @click="nextModer()">
        {{ moder.name }}
      </v-btn> -->
    </div>
  </v-container>
  <div v-else>
    <v-progress-circular
      style="margin-left: 45%; margin-top: 20%"
      :size="120"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LearningModule',
  components: {},
  data() {
    return {
      tab: null,
      isLoading: true,
      moder: {
        name: this.$t('moder.Cabinetmoder'),
        routing: '/ru/learningModule/moderator',
        key: 'moderator',
        img: require('~/assets/moderLogo.png')
      }
    }
  },
  computed: {
    ...mapGetters(['profileTeacherGet', 'profileStudentGet', 'getValideModer']),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  async mounted() {
    await this.getTeacher()
    await this.getStudent()
    await this.validateModer()
    this.isLoading = false
  },

  methods: {
    nextModer() {
      this.$router.push({
        name: `learningModule-moderator___${this.$i18n.locale}`
      })
    },
    async getTeacher() {
      await this.$store.dispatch('GET_FORM_TEACHER')
    },
    async getStudent() {
      await this.$store.dispatch('GET_FORM_STUDENT')
    },
    async validateModer() {
      await this.$store.dispatch('VALIDATE_MODER')
    },
    routerValid(link, key) {
      if (key === 'teacher') {
        if (this.profileTeacherGet) {
          this.$router.push({
            name: `learningModule-teacher-teacherProfile___${this.$i18n.locale}`
          })
        } else {
          this.$router.push({
            name: `learningModule-teacher___${this.$i18n.locale}`
          })
        }
      } else if (key === 'student') {
        if (this.profileStudentGet) {
          this.$router.push({
            name: `learningModule-student-studentProfile___${this.$i18n.locale}`
          })
        } else {
          this.$router.push({
            name: `learningModule-student___${this.$i18n.locale}`
          })
        }
      } else {
        this.$router.push({
          path: link
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/mixins';
@import 'assets/variables';

.categories-btn {
  background: linear-gradient(180deg, #00adff 0%, #4742ab 55%, #595bb7 100%);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.categories-img {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.categories-text {
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-bottom: 0 !important;
  filter: drop-shadow(2px 4px 6px black);
  font-weight: normal;
  text-transform: none;
  letter-spacing: 0;
}

.ag-board-main-tabs {
  margin: 15px 0;
  align-items: flex-start;
  align-content: flex-start;
  @include setGrid(
    repeat(auto-fit, minmax(220px, 1fr)),
    20px,
    auto,
    25px,
    'both'
  );

  li {
    background: white;
  }

  a {
    text-decoration: none;
    font-size: $font-regular;
    color: #fff;
  }

  .v-btn--disabled a {
    color: rgba(0, 0, 0, 0.26) !important;
  }

  .v-btn {
    width: 100%;
    font-size: $button_font_md;
  }
}

.v-application--is-rtl {
  .ag-board-main-tabs .v-btn {
    font-size: $font-regular;
  }
}

.ag-main-content {
  @include setGrid(1fr, null, null, null, 'columns');
}
</style>
