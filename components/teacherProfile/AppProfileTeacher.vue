<template>
  <div v-if="data">
    <v-row class="px-3 py-0">
      <v-col offset="1" cols="10" class="center relative">
        <v-avatar size="200">
          <v-img class="card-img" :src="profileImg"></v-img>
        </v-avatar>

        <!------------------ EDIT IMAGE BUTTON ------------------>
        <div v-if="isAuthenticated && userCredentials.handle === data.handle">
          <input
            id="imageInput"
            type="file"
            hidden
            @change="handleImageChange"
          />
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2"
                fab
                small
                color="primary"
                absolute
                right
                bottom
                dark
                :loading="loadingForm"
                @click="editImage"
                v-on="on"
              >
                <v-icon dark>{{ svg.camera }}</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('profile.changeAvatar') }}</span>
          </v-tooltip>
        </div>
        <!------------------ EDIT IMAGE BUTTON ------------------>
      </v-col>
      <v-col
        cols="12"
        class="secondary"
        style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px"
      >
        <v-row class="mb-3">
          <v-col>
            <!------------------ PROFILE DATA ------------------>
            <div
              class="text-center mb-3 title text-secundario font-weight-bold"
            >
              <span>@</span>{{ dataTeacher.fullName }}
            </div>
            <div
              v-if="dataTeacher.aboutMe"
              class="text-center mb-3 pr-5 pl-5 font-weight-regular"
            >
              {{ dataTeacher.aboutMe }}
            </div>
            <div v-if="dataTeacher.email" class="text-center mb-3">
              <v-icon>{{ svg.web }}</v-icon>
              <span>
                <a :href="dataTeacher.email" target="_blank"
                  >&nbsp;{{ dataTeacher.email }}</a
                >
              </span>
            </div>
            <!-- <div class="text-center mb-3">
              <v-icon>{{ svg.bitcoin }}</v-icon>
              <span>{{ data.bBalance }}</span>
            </div> -->
            <!-- <div class="text-center">
              <v-icon>{{ svg.calendar }}</v-icon>
              <span>
                {{ data.createdAt | day }}
              </span>
            </div> -->
            <!------------------ END PROFILE DATA ------------------>
            <div class="mt-5">
              <div
                v-if="isAuthenticated && userCredentials.handle === data.handle"
              >
                <!--------------- EDIT PROFILE MODAL ----------------->
                <v-row class="center">
                  <v-btn color="primary" dark @click="editProfile()">
                    <v-icon left>{{ svg.pencil }}</v-icon>
                    {{ $t('profile.editProfile') }}
                  </v-btn>
                </v-row>
                <v-row class="center mt-8">
                  <p style="font-size: 12px">id: {{ dataTeacher.uid }}</p>
                </v-row>
                <!-- <AppEditProfile :data="data"></AppEditProfile> -->
                <!---------------END EDIT PROFILE MODAL ------------->
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// COMPONENTS
// import AppEditProfile from '@/components/Profile/AppEditProfile.vue'

// SVG ICONS
import {
  mdiMapMarker,
  mdiWeb,
  mdiCalendar,
  mdiPencil,
  mdiCameraRetakeOutline,
  mdiCurrencyBtc
} from '@mdi/js'

// VUEX
import { mapGetters } from 'vuex'
export default {
  components: {
    // AppEditProfile
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    dataTeacher: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    svg: {
      location: mdiMapMarker,
      web: mdiWeb,
      calendar: mdiCalendar,
      pencil: mdiPencil,
      camera: mdiCameraRetakeOutline,
      bitcoin: mdiCurrencyBtc
    }
  }),
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'userCredentials',
      'loadingForm',
      'profileTeacherGet'
    ]),
    profileImg() {
      return `${process.env.LEARNING_API}/` + this.dataTeacher.photo[0]
    }
  },
  mounted() {
    // if (this.dataTeacher) {
    //   this.formTeacher = { ...this.dataTeacher }
    // }
  },
  methods: {
    async handleImageChange(event) {
      if (
        this.isAuthenticated &&
        this.userCredentials.handle === this.data.handle
      ) {
        const photo = event.target.files[0]
        if (photo) {
          const formData = new FormData()
          formData.append('photo', photo, photo.name)
          formData.append('data', JSON.stringify(this.dataTeacher))
          console.log(formData)
          await this.$store.dispatch('PUT_TEACHER', formData)
          this.dataTeacher.photo = this.profileTeacherGet.photo
        }
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    },
    async sendFormTeacher(formData) {
      await this.$store.dispatch('AUTH_FORM_TEACHER', formData)
    },
    editImage() {
      const imageInput = document.getElementById('imageInput')
      imageInput.click()
    },
    editProfile() {
      if (
        this.isAuthenticated &&
        this.userCredentials.handle === this.data.handle
      ) {
        this.$router.push({
          name: `learningModule-teacher-teacherProfile___${this.$i18n.locale}`
        })
        this.$store.commit('PROFILE_EDITABLE')
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    }
  }
}
</script>
