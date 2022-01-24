<template>
  <div>
    <div v-if="ad" ref="ad" class="productcardstore">
      <div class="wrapper d-flex flex-no-wrap justify-space-between">
        <v-avatar class="ma-3 rounded" size="160" tile>
          <v-img v-if="ad.purl !== 'no_img'" :src="ad.purl"></v-img>
          <v-img v-else :src="require('~/assets/no_img.png')"></v-img>
        </v-avatar>
        <v-row class="">
          <v-col
            class="d-flex flex-no-wrap justify-space-between mx-n3"
            style="flex-direction: column"
          >
            <v-toolbar
              id="sys_bar"
              flat
              color="transparent"
              class="system-ad-bar"
            >
              <v-card-subtitle class="pa-0 mr-3 text-right">
                {{ ad.createdAt | day }}
              </v-card-subtitle>
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
            <v-card-title v-if="ad.title" class="headline"
              >{{ ad.title }}
            </v-card-title>

            <v-card-subtitle v-if="ad.description">{{
              ad.description
            }}</v-card-subtitle>
            <v-card-actions class="mb-3">
              <div v-if="ad.price" class="text-h5">
                {{ ad.price }}
              </div>
              <v-icon
                v-if="ad.price"
                class="shekel ml-2"
                color="rgba(0, 0, 0, 0.87)"
                >{{ svg.shekel }}</v-icon
              >
              <v-spacer></v-spacer>
              <template
                v-if="
                  isAuthenticated &&
                  userCredentials &&
                  userCredentials.userId === ad.uid
                "
              >
                <edit-ad-button :adId="ad.id"></edit-ad-button>
                <!--------------------------- ad DELETE MODAL -------------------------->
                <delete-ad-button :adId="ad.id"></delete-ad-button>
              </template>
              <!--------------------------- END ad DELETE MODAL -------------------------->
              <v-btn icon color="primary" @click="share">
                <v-icon>{{ svg.share }}</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="bookmark">
                <v-icon>{{ svg.bookmark }}</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="print">
                <v-icon>{{ svg.print }}</v-icon>
              </v-btn>
              <client-only>
                <v-btn :href="mailTo" icon color="primary">
                  <v-icon>{{ svg.email }}</v-icon>
                </v-btn>
              </client-only>

              <v-btn color="primary" @click="goToAdPage()">{{
                $t('board.details')
              }}</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-snackbar v-model="snackbar" color="info" :timeout="snackTimeout" top>
      {{ snackText }}
    </v-snackbar>
  </div>
</template>

<script>
// SVG ICONS
import {
  mdiBookmarkPlusOutline,
  mdiShare,
  mdiPrinter,
  mdiEmailSend,
  mdiCurrencyIls
} from '@mdi/js'
import deleteAdButton from '@/components/board/deleteAdButton'
import editAdButton from '@/components/board/editAdButton'
import { mapGetters } from 'vuex'

export default {
  components: { deleteAdButton, editAdButton },
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selection: null,
      isLiked: false,
      isMarked: false,
      svg: {
        bookmark: mdiBookmarkPlusOutline,
        share: mdiShare,
        print: mdiPrinter,
        email: mdiEmailSend,
        shekel: mdiCurrencyIls
      },
      snackbar: false,
      snackText: '',
      snackTimeout: 1500
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userCredentials']),
    city() {
      return this.ad.city === 'Не указано' ? '' : this.ad.city
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
      if (process.client) {
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
    },
    goToAdPage() {
      const id = this.ad.id
      this.$router.push(`pets/${id}`)
    }
  }
}
</script>

<style lang="scss">
.screamcardstore .v-toolbar__content {
  padding-right: 0px !important;
  padding-left: 0px !important;
}

.post-img {
  width: 100%;
  object-fit: cover;
  // max-height: 250px;
  object-position: top;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.productcardstore {
  div.wrapper {
    .system-ad-bar {
      margin-left: 12px;
      margin-right: 42px;
      .v-toolbar__content {
        @media screen and (min-width: 960px) {
          max-height: 20px;
        }
      }
      @media screen and (min-width: 960px) {
        max-height: 20px;
        margin-top: 18px;
      }
      @media screen and (max-width: 959px) {
        margin-top: 0px;
        margin-right: 0px;
        max-height: unset;
        height: unset !important;
        .v-toolbar__content {
          max-height: unset;
          height: unset !important;
        }
      }
    }

    .v-card__actions {
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }

    @media screen and (max-width: 599px) {
      flex-direction: column;
      .v-avatar {
        padding: 12px !important;
        margin: 12px 0 0 0 !important;
        width: auto !important;
      }
      .row {
        margin: 0 !important;
        .v-slide-group__content {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
        }
        .v-card__actions {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          -webkit-box-flex: 1;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
