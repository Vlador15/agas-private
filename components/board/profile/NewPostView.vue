<template>
  <div>
    <v-card
      v-if="
        $store.getters.userCredentials && $store.getters.userCredentials.userId
      "
      class="ag-post-form pa-6 mb-12"
    >
      <v-form ref="form" v-model="valid" lazy-validation :disabled="disabled">
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
          :model-object="form_model"
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
            id="newadimage"
            accept="image/*"
            type="file"
            hidden
            @change="imageUpload"
          />
          <span v-if="imgFormatError" style="color: #ff5252">{{
            imgFormatError
          }}</span>
        </div>
        <div v-show="newImg" class="image-wrapper">
          <v-btn class="image-delete" icon color="red" @click="clearImg">
            <v-icon>{{ svg.cancel }}</v-icon>
          </v-btn>
          <img id="output" class="new-ad__output-image" />
        </div>
        <div class="mt-6">
          <v-btn
            :loading="$store.getters.loadingForm"
            color="primary"
            @click="adCreate()"
            >{{ $t('publish') }}</v-btn
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
// ICONS
import { mdiImage, mdiCloseCircle } from '@mdi/js'
import PetsFields from '@/components/board/form/PetsFields'
import Instruments from '@/mixins/instruments'
import { imageProcessing } from '@/mixins/mixins'

export default {
  name: 'NewPostView',
  components: {
    PetsFields
    // DropZ
  },
  mixins: [Instruments, imageProcessing],
  data() {
    return {
      imgFormatError: null,
      svg: {
        cancel: mdiCloseCircle,
        image: mdiImage
      },
      newImg: null,
      disabled: false,
      snackbar: false,
      snackText: this.$t('board.adCreateSuccess'),
      valid: true,
      category: 'pets',
      form_model: this.getCategoryScheme('pets'),
      dropZoneInstance: {
        zone: null
      },
      thumbnail: {
        file: null
      },
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
        // breedRules: [
        //   v => {
        //     const animalType = this.modelObject.animal_type
        //     // if (animalType !== 'cats' || animalType !== 'dogs') {
        //     //   return true
        //     // } else {
        //     //   return !!v || 'Breed of animal is required'
        //     // }

        //     return animalType !== 'cats' || animalType !== 'dogs'
        //       ? true
        //       : !!v || 'Breed of animal is required'
        //   }
        // ],
        // genderRules: [v => !!v || 'Gender is required'],
        // ageRules: [v => !!v || 'Age is required'],
        // countryRules: [v => !!v || 'Country is required'],
        // cityRules: [v => !!v || 'City is required'],
      }
    }
  },
  computed: {
    adData() {
      return {
        uid: this.$store.getters.userCredentials.userId,
        title: this.form_model.title || null,
        description: this.form_model.description || null,
        category: this.category || 'pets',
        purls: this.purls || [`${null}`],
        deal_type: this.form_model.deal_type || null,
        price: this.form_model.price || null,
        animal_type: this.form_model.animal_type || null,
        breed: this.form_model.breed || null,
        gender: this.form_model.gender || null,
        age: this.form_model.age || null,
        country: this.form_model.country || null,
        city: this.form_model.city || null,
        delivery: this.form_model.delivery || null,
        phone: this.form_model.phone || null,
        name: this.form_model.name || null
      }
    }
  },
  mounted() {
    this.form_model.country = 'isr'
    this.$store.dispatch('board/AUTH')
  },
  methods: {
    openFileupload() {
      document.getElementById('newadimage').click()
    },
    clearImg() {
      document.getElementById('output').src = ''
      this.newImg = null
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
    async adCreate() {
      if (!this.$refs.form.validate()) {
        return null
      }
      if (this.$store.getters.isAuthenticated) {
        const formData = new FormData()
        if (
          this.newImg &&
          this.newImg.type &&
          this.newImg.type.startsWith('image')
        ) {
          formData.append('image', this.newImg, this.newImg.name)
        }
        for (const key in this.adData) {
          formData.append(key, this.adData[key])
        }

        try {
          this.disabled = true
          const newAdId = await this.$store.dispatch(
            'board/CREATE_AD',
            formData
          )
          if (newAdId) {
            this.resetForm()
            this.$refs.form.resetValidation()
            this.disabled = false
            this.snackbar = true
            this.$router.push(this.localePath(`/board/pets/${newAdId}`))
          }
          this.disabled = false
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$router.push({ name: `login___${this.$i18n.locale}` })
      }
    },
    resetForm() {
      this.form_model.title = null
      this.form_model.description = null
      this.purls = null
      this.form_model.deal_type = null
      this.form_model.price = null
      this.form_model.animal_type = null
      this.form_model.breed = null
      this.form_model.gender = null
      this.form_model.age = null
      this.form_model.city = null
      this.form_model.delivery = null
      this.clearImg()
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
  .new-ad__output-image {
    height: 120px;
    width: 120px;
    object-fit: cover;
    border-radius: 5px;
  }
}
</style>
