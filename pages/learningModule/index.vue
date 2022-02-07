<template>
  <v-container v-if="!isLoading">
    <div class="ag-board-main-tabs">
      <v-btn
        v-for="link in $t('learningModule_categories')"
        :key="link.routing"
        x-large
        color="primary"
        @click="routerValid(link.routing, link.key)"
      >
        {{ link.name }}
      </v-btn>
      <v-btn v-if="getValideModer" x-large color="primary" @click="nextModer()">
        {{ moder.name }}
      </v-btn>
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
        key: 'moderator'
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
