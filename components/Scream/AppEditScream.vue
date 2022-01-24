<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          elevation="0"
          small
          absolute
          right
          top
          fab
          style="transform: translateY(35px)"
          @click.stop="openEditDialog()"
          v-on="on"
        >
          <v-icon color="black lighten-1">{{ svg.edit }}</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('scream.editPost') }}</span>
    </v-tooltip>

    <v-dialog v-model="dialog" max-width="540" :persistent="disabled">
      <v-card :loading="disabled">
        <v-form
          ref="form"
          :disabled="disabled"
          @submit.prevent="handleEditScream"
        >
          <div v-show="showImg" class="image-wrapper">
            <v-btn class="image-delete" icon color="red" @click="clearImg">
              <v-icon>{{ svg.cancel }}</v-icon>
            </v-btn>
            <img :id="`output-${scream.screamId}`" class="outputimg" />
          </div>
          <v-list-item>
            <v-textarea
              v-model="newBody"
              class="mx-2"
              rows="2"
              :placeholder="`${$t('scream.write')}`"
              auto-grow
              @keydown.ctrl.enter.prevent="handlePostSubmit"
            ></v-textarea>
          </v-list-item>
          <v-divider></v-divider>
          <v-col cols="12" md="12">
            <v-combobox
              v-model="tags"
              :label="$t('scream.tags')"
              multiple
              small-chips
              append-icon=""
              counter
              deletable-chips
              :delimiters="[',', '.', '/', '?', ' ', '|', '\\']"
            ></v-combobox>
          </v-col>
          <v-col cols="auto" md="auto">
            <v-chip
              link
              color="blue lighten-5 blue--text text--accent-5"
              @click="openFileupload"
            >
              <v-avatar left class="">
                <v-icon>{{ svg.image }}</v-icon>
              </v-avatar>
              {{ $t('scream.image') }}
            </v-chip>
            <input
              :id="`newpostimg-${scream.screamId}`"
              accept="image/*"
              type="file"
              hidden
              @change="imageUpload"
            />
            <span v-if="imgFormatError" style="color: #ff5252">{{
              imgFormatError
            }}</span>
          </v-col>
          <!---------------------- ACTIOS BUTTONS -------------------->
          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn
              color="cyan darken-1"
              text
              :disabled="loadingUser"
              @click="cancelEdit"
            >
              {{ $t('scream.cancel') }}
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              type="submit"
              :loading="loadingUser"
            >
              {{ $t('profile.save') }}
            </v-btn>
          </v-card-actions>
          <!---------------------- END ACTIOS BUTTONS -------------------->
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { mdiPencil, mdiImage, mdiCloseCircle } from '@mdi/js'
import { imageProcessing } from '@/mixins/mixins'

export default {
  mixins: [imageProcessing],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    scream: {
      type: Object
    }
  },
  data() {
    return {
      imgFormatError: null,
      tags: [],
      dialog: false,
      svg: {
        edit: mdiPencil,
        image: mdiImage,
        cancel: mdiCloseCircle
      },
      newBody: '',
      postImg: null,
      newImg: null,
      disabled: false
    }
  },
  computed: {
    ...mapGetters(['loadingUser']),
    showImg() {
      return !!(
        (this.newImg && this.newImg !== 'no_img') ||
        (this.scream.imgUrls &&
          this.scream.imgUrls[0] &&
          this.scream.imgUrls[0] !== 'no_img' &&
          this.newImg !== 'no_img')
      )
    },
    postHasImg() {
      if (
        (this.scream.imgUrls &&
          this.scream.imgUrls[0] &&
          this.scream.imgUrls[0] !== 'no_img') ||
        this.postImg
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    openEditDialog() {
      this.dialog = true
      setTimeout(() => {
        this.newBody = this.scream.body
        this.tags = this.scream.tags
        if (
          this.scream &&
          this.scream.imgUrls &&
          this.scream.imgUrls[0] &&
          this.scream.imgUrls[0] !== 'no_img'
        ) {
          document.getElementById(`output-${this.scream.screamId}`).src =
            this.scream.imgUrls[0]
        }
      }, 0)
    },
    openFileupload() {
      document.getElementById(`newpostimg-${this.scream.screamId}`).click()
    },
    async imageUpload(event) {
      this.disabled = true
      try {
        this.newImg = await this.imageProcessing(
          event,
          750,
          `output-${this.scream.screamId}`
        )
      } catch (e) {
        if (e.formatErr) {
          this.imgFormatError = e.formatErr
        }
        console.log(e)
      }
      this.disabled = false
    },
    handleEditScream() {
      this.disabled = true
      const formData = new FormData()
      if (
        this.newImg &&
        this.newImg.type &&
        this.newImg.type.startsWith('image')
      ) {
        formData.append('image', this.newImg, this.newImg.name)
      } else if (this.newImg === 'no_img') {
        formData.append('imageUrl', 'no_img')
      }
      formData.append('body', this.newBody)
      formData.append('tags', this.tags)
      formData.append('handle', this.$store.getters.userCredentials.handle)

      this.$store
        .dispatch('EDIT_SCREAM', { formData, sid: this.scream.screamId })
        .then(() => {
          document.getElementById(`newpostimg-${this.scream.screamId}`).value =
            ''
          this.newImg = null
          this.disabled = false
          this.dialog = false
        })
    },
    cancelEdit() {
      this.dialog = false
      this.newBody = this.scream.body
    },
    clearImg() {
      document.getElementById(`output-${this.scream.screamId}`).src = ''
      this.newImg = 'no_img'
    }
  }
}
</script>
<style lang="scss" scoped>
.outputimg {
  width: 100%;
  object-fit: cover;
}
.image-wrapper {
  position: relative;
  & .image-delete {
    position: absolute;
  }
}
</style>
