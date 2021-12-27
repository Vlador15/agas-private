<template>
  <div>
    <v-card
      v-if="
        $store.getters.isAuthenticated &&
        $store.getters.userCredentials &&
        $store.getters.userCredentials.userId
      "
      class="ag-post-form"
      :loading="loading"
    >
      <v-form
        ref="form"
        v-model="valid"
        class="pa-6 mb-12"
        lazy-validation
        :disabled="loading"
      >
        <v-select
          v-model="category"
          :items="$t('main_categories')"
          :label="$t('category')"
          item-value="key"
          item-text="name"
          outlined
          dense
          :menu-props="{ top: false, offsetY: true }"
          disabled
        />
        <v-divider class="mb-6"></v-divider>
        <component
          :is="`${category}-fields`"
          v-if="ad_data"
          :model-object="ad_data"
          :rules="validation"
        ></component>
        <div style="margin-bottom: 12px">
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
            id="adimage"
            accept="image/*"
            type="file"
            hidden
            @change="imageUpload"
          />
          <span v-if="imgFormatError" style="color: #ff5252">{{
            imgFormatError
          }}</span>
        </div>
        <div v-show="showImg" class="image-wrapper">
          <v-btn class="image-delete" icon color="red" @click="clearImg">
            <v-icon>{{ svg.cancel }}</v-icon>
          </v-btn>
          <img id="output" class="ad__output-image" />
        </div>
        <div class="mt-6">
          <v-btn
            :loading="$store.getters.loadingForm"
            color="primary"
            @click="adEdit()"
            >{{ $t('profile.save') }}</v-btn
          >
        </div>
      </v-form>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      class="text-right"
      color="success"
      timeout="2500"
      bottom
    >
      {{ snackText }}
    </v-snackbar>
  </div>
</template>

<script>
import { mdiImage, mdiCloseCircle } from '@mdi/js'
import PetsFields from '@/components/board/form/PetsFields'
import Instruments from '@/mixins/instruments'
import { imageProcessing } from '@/mixins/mixins'

export default {
  components: {
    PetsFields
  },
  mixins: [Instruments, imageProcessing],
  data() {
    return {
      adImg: null,
      imgFormatError: null,
      svg: {
        cancel: mdiCloseCircle,
        image: mdiImage
      },
      newImg: null,
      disabled: false,
      loading: true,
      snackbar: false,
      snackText: 'Success',
      valid: true,
      category: 'pets',
      ad_data: null,
      purls: null,
      validation: {
        titleRules: [
          v => !!v || this.$t('board.titleErr'),
          v =>
            (v && v.length <= 62) ||
            'Title must be not greater than 62 characters'
        ],
        dealTypeRules: [v => !!v || this.$t('board.dealTypeErr')],
        animalTypeRules: [v => !!v || this.$t('board.animalTypeErr')],
        phoneRules: [v => !!v || this.$t('board.phoneErr')]
      }
    }
  },
  computed: {
    showImg() {
      return !!(this.newImg || this.adImg)
    },
    adData() {
      return {
        ad: {
          title: this.ad_data.title || null,
          description: this.ad_data.description || null,
          category: this.ad_data.category || 'pets',
          purl: this.ad_data.purl || 'no_img',
          purls: this.ad_data.purls || [`${null}`],
          deal_type: this.ad_data.deal_type || null,
          price: this.ad_data.price || null,
          animal_type: this.ad_data.animal_type || null,
          breed: this.ad_data.breed || null,
          gender: this.ad_data.gender || null,
          age: this.ad_data.age || null,
          country: this.ad_data.country || null,
          city: this.ad_data.city || null,
          delivery: this.ad_data.delivery || null,
          phone: this.ad_data.phone || null,
          name: this.ad_data.name || null,
          status: this.ad_data.status || 'published'
        },
        uid: this.$store.getters.userCredentials.userId,
        adId: this.$route.params.id
      }
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch('board/CHECK_AUTH')
      this.ad_data = await this.$store.dispatch(
        'board/GET_AD',
        this.$route.params.id
      )
      this.loading = false
      this.ad_data.name = this.ad_data.name
        ? this.ad_data.name
        : this.$store.getters.userCredentials.name
      if (this.ad_data.purl !== 'no_img') {
        document.getElementById('output').src = this.ad_data.purl
        this.adImg = this.ad_data.purl
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    openFileupload() {
      document.getElementById('adimage').click()
    },
    clearImg() {
      document.getElementById('output').src = ''
      this.adImg = null
      this.newImg = null
      this.ad_data.purls = null
      this.ad_data.purl = null
    },
    async imageUpload(event) {
      this.disabled = true
      // this.postImg = true
      try {
        this.newImg = await this.imageProcessing(event, 750, 'output')
      } catch (e) {
        if (e.formatErr) {
          this.imgFormatError = e.formatErr
        }
        console.log(e)
      }
      this.disabled = false
    },
    async adEdit() {
      if (!this.$refs.form.validate()) {
        return null
      }
      if (
        this.$store.getters.isAuthenticated &&
        this.$store.getters.userCredentials &&
        this.$store.getters.userCredentials.userId === this.ad_data.uid
      ) {
        const formData = new FormData()
        if (
          this.newImg &&
          this.newImg.type &&
          this.newImg.type.startsWith('image')
        ) {
          formData.append('image', this.newImg, this.newImg.name)
        }
        for (const key in this.adData.ad) {
          formData.append(key, this.adData.ad[key])
        }

        formData.append('uid', this.adData.uid)
        formData.append('adId', this.adData.adId)

        try {
          this.loading = true
          const editStatus = await this.$store.dispatch(
            'board/EDIT_AD',
            formData
          )
          if (editStatus === 'success') {
            this.snackbar = true
            this.$router.push(
              this.localePath(`/board/pets/${this.$route.params.id}`)
            )
          }
          this.loading = false
          // const image = document.getElementById('imageInput').files[0]
          // try {
          //   if (image) {
          //     const formData = new FormData()
          //     formData.append('image', image, image.name)
          //     const imgUrl = await this.$store.dispatch(
          //       'board/UPLOAD_IMAGE',
          //       formData
          //     )
          //     this.ad_data.purls = [imgUrl]
          //   }
          //   const editStatus = await this.$store.dispatch(
          //     'board/EDIT_AD',
          //     this.adData
          //   )
          //   if (editStatus === 'success') {
          //     this.resetForm()
          //     this.$refs.form.resetValidation()
          //     this.snackbar = true
          //     this.$router.push(
          //       this.localePath(`/board/pets/${this.$route.params.id}`)
          //     )
          //   }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    },
    handleImageChange(event) {
      if (this.$store.getters.isAuthenticated) {
        const image = document.getElementById('imageInput').files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        console.log('ALL', formData.getAll('image'))
        console.log('ONE', formData.get('image'))
        this.$store.dispatch('board/UPLOAD_IMAGE', formData)
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ag-post-form .ag-filters-grid {
  margin-bottom: 20px;
}
.image-wrapper {
  position: relative;
  max-width: 120px;
  margin-left: 12px;
  & .image-delete {
    position: absolute;
  }
  .ad__output-image {
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 5px;
  }
}
.v-card--loading {
  overflow: unset !important;
}
</style>
