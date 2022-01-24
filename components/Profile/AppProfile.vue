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
              <span>@</span>{{ data.name }}
            </div>
            <div
              v-if="data.bio"
              class="text-center mb-3 pr-5 pl-5 font-weight-regular"
            >
              {{ data.bio }}
            </div>
            <div v-if="data.location" class="text-center mb-3">
              <v-icon>{{ svg.location }}</v-icon>
              <span>
                {{ data.location }}
              </span>
            </div>
            <div v-if="data.website" class="text-center mb-3">
              <v-icon>{{ svg.web }}</v-icon>
              <span>
                <a :href="data.website" target="_blank"
                  >&nbsp;{{ data.website }}</a
                >
              </span>
            </div>
            <!-- <div class="text-center mb-3">
              <v-icon>{{ svg.bitcoin }}</v-icon>
              <span>{{ data.bBalance }}</span>
            </div> -->
            <div class="text-center">
              <v-icon>{{ svg.calendar }}</v-icon>
              <span>
                {{ data.createdAt | day }}
              </span>
            </div>
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
    ...mapGetters(['isAuthenticated', 'userCredentials', 'loadingForm']),
    profileImg() {
      return this.data.imageUrl
    }
  },
  methods: {
    handleImageChange(event) {
      if (
        this.isAuthenticated &&
        this.userCredentials.handle === this.data.handle
      ) {
        const image = event.target.files[0]
        if (image) {
          const formData = new FormData()
          formData.append('image', image, image.name)
          this.$store.dispatch('UPLOAD_IMAGE', formData)
        }
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
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
        if (this.$route.name === 'profile') {
          this.$store.commit('PROFILE_EDITABLE')
        } else {
          this.$router.push({ name: `profile___${this.$i18n.locale}` })
          this.$store.commit('PROFILE_EDITABLE')
        }
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    }
  }
}
</script>
