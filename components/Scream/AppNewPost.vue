<template>
  <v-card id="new-post" ref="myScroll" :loading="disabled" class="mb-6">
    <v-form ref="form" :disabled="disabled" @submit.prevent="handlePostSubmit">
      <template v-if="!postImg">
        <v-list-item>
          <v-list-item-title class="headline mb-1">
            {{ $t('scream.createPost') }}
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </template>
      <div v-else class="image-wrapper">
        <v-btn class="image-delete" icon color="red" @click="clearImg">
          <v-icon>{{ svg.cancel }}</v-icon>
        </v-btn>
        <img id="output" />
      </div>
      <v-list-item>
        <v-list-item-avatar
          v-if="this.$store.getters.userCredentials"
          size="60"
        >
          <v-img :src="this.$store.getters.userCredentials.imageUrl"></v-img>
        </v-list-item-avatar>
        <v-textarea
          v-model="body"
          class="mx-2"
          rows="2"
          :placeholder="$t('scream.write')"
          auto-grow
          @keydown.ctrl.enter.prevent="handlePostSubmit"
        ></v-textarea>
      </v-list-item>
      <v-list-item>
        <v-row align="center" justify="start" class="mb-0">
          <v-col cols="12" md="12">
            <v-combobox
              v-model="tags"
              :label="`#${$t('scream.tags')}`"
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
              id="newpostimg"
              accept="image/*"
              type="file"
              hidden
              @change="imageUpload"
            />
            <span v-if="imgFormatError" style="color: #ff5252">{{
              imgFormatError
            }}</span>
          </v-col>

          <!-- <v-col cols="auto" md="auto">
            <v-menu
              v-model="menu"
              bottom
              right
              transition="scale-transition"
              origin="top left"
            >
              <template v-slot:activator="{ on }">
                <v-chip
                  color="blue lighten-5 blue--text text--accent-5"
                  v-on="on"
                >
                  <v-avatar left class="">
                    <v-icon>{{ visibility.icon }}</v-icon>
                  </v-avatar>
                  {{ visibility.text }}
                  <v-avatar>
                    <v-icon>{{ svg.menuDown }}</v-icon>
                  </v-avatar>
                </v-chip>
              </template>
              <v-card>
                <v-list color="blue lighten-5 blue--text text--accent-5">
                  <v-list-item>
                    <v-radio-group
                      v-model="radios"
                      mandatory
                      @change="visibilityChange"
                    >
                      <template v-slot:label>
                        <div>Кому будет <strong>видна публикация</strong></div>
                      </template>
                      <v-radio value="all">
                        <template v-slot:label>
                          <div>Всему интернету</div>
                          <v-icon class="ml-2">{{ svg.web }}</v-icon>
                        </template>
                      </v-radio>
                      <v-radio value="friends">
                        <template v-slot:label>
                          <div>
                            Вашим <strong class="primary--text">друзьям</strong>
                          </div>
                          <v-icon class="ml-2 primary--text">{{
                            svg.friends
                          }}</v-icon>
                        </template>
                      </v-radio>
                      <v-radio value="nobody">
                        <template v-slot:label>
                          <div>
                            Только <strong class="success--text">вам</strong>
                          </div>
                          <v-icon class="ml-2 success--text">{{
                            svg.lock
                          }}</v-icon>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-col> -->
          <v-col cols="12">
            <v-btn
              :loading="$store.getters.loadingForm"
              type="submit"
              block
              color="primary"
              :disabled="disabled"
            >
              {{ $t('scream.publish') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider></v-divider>
    </v-form>
  </v-card>
</template>

<script>
// ICONS
import {
  mdiMessageImageOutline,
  mdiMenuDown,
  mdiWeb,
  mdiAccountGroup,
  mdiLock,
  mdiImage,
  mdiCloseCircle
} from '@mdi/js'

// CUSTOM SCROLLBAR
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.min.css'
import { imageProcessing } from '@/mixins/mixins'
// import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  // components: {
  //   PerfectScrollbar
  // },
  mixins: [imageProcessing],
  data() {
    return {
      imgFormatError: null,
      tags: [],
      svg: {
        addImage: mdiMessageImageOutline,
        menuDown: mdiMenuDown,
        web: mdiWeb,
        friends: mdiAccountGroup,
        lock: mdiLock,
        image: mdiImage,
        cancel: mdiCloseCircle
      },
      menu: false,
      radios: 'all',
      postImg: false,
      body: '',
      newImg: null,
      imgUrls: null,
      disabled: false
    }
  },
  computed: {
    visibility() {
      return {
        icon: this.svg.web,
        text: 'Видно всем'
      }
    }
  },
  methods: {
    // enter(e) {
    //   console.log(e.target)
    //   var evt = new KeyboardEvent('keydown', { keyCode: 13 })
    //   e.target.dispatchEvent(evt)
    //   // e.target.dispatchEvent(event)
    // },
    openFileupload() {
      document.getElementById('newpostimg').click()
    },
    visibilityChange() {
      switch (this.radios) {
        case 'all':
          this.visibility.icon = this.svg.web
          this.visibility.text = 'Видно всем'
          break
        case 'friends':
          this.visibility.icon = this.svg.friends
          this.visibility.text = 'Видно друзьям'
          break
        case 'nobody':
          this.visibility.icon = this.svg.lock
          this.visibility.text = 'Никому'
          break
        default:
          break
      }
    },
    async imageUpload(event) {
      this.disabled = true
      this.postImg = true
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
    async handlePostSubmit() {
      const formData = new FormData()
      if (
        this.newImg &&
        this.newImg.type &&
        this.newImg.type.startsWith('image')
      ) {
        formData.append('image', this.newImg, this.newImg.name)
      }
      formData.append('body', this.body)
      formData.append('name', this.$store.getters.userCredentials.name)
      formData.append('tags', this.tags)

      try {
        this.disabled = true
        await this.$store.dispatch('POST_NEW_SCREAM', formData).then(() => {
          // clear form
          this.disabled = false
          this.newImg = null
          this.tags = null
          this.postImg = false
          this.body = ''
          this.imgUrls = null
          document.getElementById('newpostimg').value = ''
        })
      } catch (e) {
        console.log(e)
      }
    },
    clearImg() {
      document.getElementById('output').src = ''
      this.postImg = false
      this.newImg = null
    }
  }
}
</script>

<style lang="scss" scoped>
#output {
  width: 100%;
  object-fit: cover;
}

.ps {
  overflow-y: scroll;
  height: 300px;

  &.ps--active-y .ps__thumb-x,
  .ps__thumb-y {
    background-color: #81d4fa !important;
  }

  & .ps__rail-y {
    width: 10px;
  }

  & .ps__rail-y.ps--clicking .ps__thumb-y,
  .ps__rail-y:focus > .ps__thumb-y,
  .ps__rail-y:hover > .ps__thumb-y {
    background-color: #03a9f4;
    width: 6px;
  }
}
.image-wrapper {
  position: relative;
  & .image-delete {
    position: absolute;
  }
}
</style>
