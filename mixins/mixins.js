// SVG ICONS
import {
  mdiSchool,
  mdiCat,
  mdiFood,
  mdiPaw,
  mdiDonkey,
  mdiDogSide,
  mdiDogService,
  mdiToolboxOutline,
  mdiCoatRack
} from '@mdi/js'
import Compressor from 'compressorjs'

export const reset = {
  methods: {
    reset() {
      if (this.loginUser) {
        this.loginUser.email = ''
        this.loginUser.password = ''
      }
      if (this.formNewUser) {
        this.formNewUser.email = ''
        this.formNewUser.password = ''
        this.formNewUser.confirmPassword = ''
        this.formNewUser.handle = ''
      }
    }
  }
}

export const likeMethod = {
  methods: {
    likeScream(isAuthenticated, scream, type) {
      if (isAuthenticated && scream) {
        if (!this.isLiked) {
          this.$store.dispatch('LIKE_SCREAM', {
            screamId: scream.screamId,
            type
          })
        } else if (this.likeType === type) {
          this.$store.dispatch('UNLIKE_SCREAM', scream.screamId)
        } else {
          this.$store.dispatch('EDIT_LIKE_SCREAM', {
            screamId: scream.screamId,
            type
          })
        }
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    }
  }
}

export const storeCatIcons = {
  data() {
    return {
      svg: {
        food: mdiFood,
        animals: mdiCat,
        dog: mdiDogSide,
        donkey: mdiDonkey,
        accessories: mdiDogService,
        box: mdiToolboxOutline,
        rack: mdiCoatRack,
        paw: mdiPaw,
        edu: mdiSchool
      }
    }
  }
}

export const imageProcessing = {
  methods: {
    /**
     * Image handler
     * @param event - event
     * @param maxWidth - Number, image max width
     * @param output - optional, String, id of <img> node
     * @return Optimized image blob
     * Iakov.
     */
    imageProcessing(event, maxWidth, output = null) {
      return new Promise((resolve, reject) => {
        const type = event.target.files[0].type
        if (
          type === 'image/jpeg' ||
          type === 'image/jpg' ||
          type === 'image/pjpeg' ||
          type === 'image/png' ||
          type === 'image/gif'
        ) {
          let outputImg = null
          if (output) {
            setTimeout(() => {
              outputImg = document.getElementById(output)
            }, 0)
          }

          const compressImg = new Promise((resolve, reject) => {
            return new Compressor(event.target.files[0], {
              quality: 0.7,
              maxWidth,
              convertSize: 0,
              success: result => {
                if (output) {
                  outputImg.src = URL.createObjectURL(result)
                }
                resolve(result)
              },
              error(err) {
                reject(err.message)
              }
            })
          })

          compressImg.then(result => {
            resolve(result)
          })
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ formatErr: "File type doesn't supported" })
        }
      })
    }
  }
}
