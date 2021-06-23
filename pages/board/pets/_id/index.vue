<template>
  <div>
    <v-container>
      <LayoutAppBreadcrumbs />
      <div v-if="ad" ref="ad">
        <v-card>
          <v-row no-gutters>
            <v-col cols="12" md="6" sm="12" lg="6">
              <img
                v-if="ad.purls[0] !== 'no_img'"
                style="
                  max-width: 100%;
                  height: 100%;
                  width: 100%;
                  object-fit: cover;
                "
                :src="ad.purls[0]"
              />
              <v-img
                v-else
                :src="require('~/assets/no_img.png')"
                style="
                  max-width: 100%;
                  height: 100%;
                  width: 100%;
                  object-fit: cover;
                "
              ></v-img>
            </v-col>
            <v-col cols="12" md="6" sm="12" lg="6" class="post-body">
              <v-toolbar
                id="sys_bar"
                flat
                color="transparent"
                class="system-ad-bar"
              >
                <v-btn icon color="primary" @click="share">
                  <v-icon>{{ svg.share }}</v-icon>
                </v-btn>
                <v-btn icon color="primary" @click="bookmark">
                  <v-icon>{{ svg.bookmark }}</v-icon>
                </v-btn>
                <v-btn icon color="primary" @click="print">
                  <v-icon>{{ svg.print }}</v-icon>
                </v-btn>
                <v-btn :href="mailTo" icon color="primary">
                  <v-icon>{{ svg.email }}</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-card-subtitle class="pa-0 mr-3 text-right">
                  {{ ad.createdAt | day }}
                </v-card-subtitle>
              </v-toolbar>
              <v-toolbar outlined flat color="transparent" class="ad-bar">
                <v-spacer></v-spacer>
                <v-chip-group column>
                  <v-chip v-if="ad.deal_type" small class="ma-2">
                    {{ $t(`deal_type_opts.${ad.deal_type}`) }}
                  </v-chip>
                  <v-chip v-if="ad.animal_type" small class="ma-2">
                    {{ $t(`animal_types.${ad.animal_type}`) }}
                  </v-chip>
                  <v-chip v-if="ad.breed" small class="ma-2">
                    {{ $t(`breeds_${ad.animal_type}.${ad.breed}`) }}
                  </v-chip>
                  <v-chip v-if="ad.gender" small class="ma-2">
                    {{ $t(`genders_pets.${ad.gender}`) }}
                  </v-chip>
                </v-chip-group>
              </v-toolbar>
              <v-card-subtitle class="mr-6 pa-0 text-right country">
                <div v-if="ad.country">
                  <country-flag :country="ad.country" size="small" />
                  {{ $t(`countries.${ad.country}`) }}
                  {{ aDcity }}
                </div>
                <span v-if="ad.age">
                  <strong>{{ $t('age') }}: </strong>
                  {{ ad.age }}
                </span>
              </v-card-subtitle>
              <div class="ml-3" style="flex-grow: 2; position: relative">
                <h1>
                  <v-card-title style="text-transform: capitalize">
                    {{ ad.title }}
                  </v-card-title>
                </h1>
                <v-card-text v-if="ad.description">
                  {{ ad.description }}
                </v-card-text>
                <v-card-title v-if="ad.price">
                  <span>{{ ad.price }}</span>
                  <v-icon class="shekel ml-2">{{ `${svg.shekel} ` }}</v-icon>
                </v-card-title>
                <div
                  v-if="
                    isAuthenticated &&
                    userCredentials &&
                    userCredentials.userId === ad.uid
                  "
                  class="auth_user__buttons"
                >
                  <edit-ad-button :adId="$route.params.id"></edit-ad-button>
                  <!--------------------------- ad DELETE MODAL -------------------------->
                  <delete-ad-button :adId="$route.params.id"></delete-ad-button>
                </div>
              </div>
              <div>
                <v-card-actions v-if="user">
                  <v-row align="center">
                    <v-col>
                      <v-btn
                        v-if="!showContacts"
                        class="show-phone-btn ma-3"
                        color="primary"
                        @click="showContacts = !showContacts"
                        >{{ $t('board.showContacts') }}</v-btn
                      >
                      <v-list-item v-if="showContacts">
                        <v-list-item-avatar tile size="80">
                          <v-img :src="user.imageUrl" aspect-ratio="1"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="headline">
                            {{ user.name }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                    <v-col>
                      <div v-if="showContacts" class="title text-center ma-3">
                        {{ ad.phone }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <v-snackbar v-model="snackbar" color="info" :timeout="snackTimeout" top>
        {{ snackText }}
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import deleteAdButton from '@/components/board/deleteAdButton'
import editAdButton from '@/components/board/editAdButton'
import LayoutAppBreadcrumbs from '@/components/Layout/AppBreadcrumbs'
import CountryFlag from 'vue-country-flag'
import {
  mdiBookmarkPlusOutline,
  mdiShare,
  mdiPrinter,
  mdiEmailSend,
  mdiCurrencyIls
} from '@mdi/js'
import { mapGetters } from 'vuex'

export default {
  components: {
    CountryFlag,
    deleteAdButton,
    editAdButton,
    LayoutAppBreadcrumbs
  },
  data() {
    return {
      svg: {
        bookmark: mdiBookmarkPlusOutline,
        share: mdiShare,
        print: mdiPrinter,
        email: mdiEmailSend,
        shekel: mdiCurrencyIls
      },
      ad: null,
      user: null,
      showContacts: false,
      snackbar: false,
      snackText: '',
      snackTimeout: 1500,
      mobile: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userLikes', 'userCredentials']),
    aDcity() {
      return this.ad.city
        ? this.$t('cities_isr').find(c => c.key === this.ad.city).text
        : ''
    },
    mailTo() {
      if (process.client) {
        const host = window.location.origin
        return `mailto:?subject=${this.ad.title}&amp;body=${host}${this.$route.fullPath}`
      } else {
        return null
      }
    }
  },
  async mounted() {
    this.ad = await this.$store.dispatch('board/GET_AD', this.$route.params.id)
    this.user = await this.$store.dispatch('GET_U', this.ad.uid)
    this.user.name = this.ad.name ? this.ad.name : this.user.name
  },
  methods: {
    share() {
      if (process.client) {
        const host = window.location.origin
        navigator.clipboard
          .writeText(`${host}${this.$route.fullPath}`)
          .then(() => {
            this.snackText = this.$t('board.linkСopied')
            this.snackTimeout = 1500
            this.snackbar = true
          })
          .catch(err => {
            console.log('Something went wrong', err)
          })
      }
    },
    bookmark() {
      if (process.client) {
        this.snackText = this.$t('board.bookmarkHint')
        this.snackTimeout = 3000
        this.snackbar = true
      }
    },
    print() {
      const printWindow = window.open('', 'PRINT', 'height=400,width=550')

      printWindow.document.write(
        '<html><head><title>' + this.ad.title + '</title>'
      )
      printWindow.document.write('</head><body >')
      printWindow.document.write('<style>svg { max-width:20px } </style>')
      printWindow.document.write(this.$refs.ad.innerHTML)
      printWindow.document.getElementById('sys_bar').remove()
      printWindow.document.write('</body></html>')
      printWindow.document.close() // necessary for IE >= 10
      printWindow.focus() // necessary for IE >= 10*/

      printWindow.print()
      printWindow.close()

      return true
    }
  }
}
</script>

<style lang="scss">
.post-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .system-ad-bar {
    margin-left: 12px;
    .v-toolbar__content {
      @media screen and (min-width: 960px) {
        max-height: 20px;
      }
    }
    @media screen and (min-width: 960px) {
      max-height: 20px;
      margin-top: 18px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 0px;
      max-height: unset;
      height: unset;
    }
  }
  .ad-bar {
    max-height: 52px;
    @media screen and (max-width: 480px) {
      margin: 24px 0px;
    }
  }
  .show-phone-btn {
    display: block;
  }
  .country {
    margin-top: 0px;
    @media screen and (max-width: 1263px) {
      margin-top: 0px;
    }
  }
}
.v-application--is-rtl .auth_user__buttons {
  position: absolute;
  left: 80px;
  top: 0;
}
</style>
