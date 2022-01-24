<template>
  <v-container>
    <div class="ag-board-main-tabs">
      <v-btn
        v-for="link in $t('learningModule_categories')"
        :key="link.routing"
        x-large
        color="primary"
        @click="routerValid(link.routing, link.key)"
      >
        <!-- @click="$router.push(link.routing)" -->
        <!-- routerValid(link.routing,link.name) -->

        {{ link.name }}
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LearningModule',
  components: {},
  data() {
    return {
      tab: null,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['profileTeacherGet', 'profileStudentGet']),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  async mounted() {
    await this.getTeacher()
    await this.getStudent()
  },

  methods: {
    async getTeacher() {
      await this.$store.dispatch('GET_FORM_TEACHER')
    },
    async getStudent() {
      await this.$store.dispatch('GET_FORM_STUDENT')
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
