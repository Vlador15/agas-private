<template>
  <v-container>
    <v-row v-if="isLoading">
      <v-spacer></v-spacer>
      <v-col cols="12" md="12">
        <div class="mr-12 pt-8 float-right">
          <v-btn color="primary" width="250" @click="openAddProduct">{{
            $t('moder.addProduct')
          }}</v-btn>
        </div>
      </v-col>
      <v-col
        v-for="(product, i) in dataProducts"
        :key="i"
        cols="12"
        md="6"
        class="my-5"
      >
        <v-card class="mx-auto" max-width="400">
          <div
            v-if="currentRouteName.substr(-2) === 'ru'"
            style="background-color: #00825c"
            class="white--text align-end"
            height="200px"
          >
            <!-- сделать на 3 языках -->
            <v-card-title
              >{{ product.ru.title }}
              <span class="mx-5"
                >{{ $t('moder.discount') }}
                <span>{{ product.discount }}</span></span
              ></v-card-title
            >
          </div>
          <div
            v-if="currentRouteName.substr(-2) === 'en'"
            style="background-color: #00825c"
            class="white--text align-end"
            height="200px"
          >
            <!-- сделать на 3 языках -->
            <v-card-title
              >{{ product.en.title }}
              <span class="mx-5"
                >{{ $t('moder.discount') }}
                <span>{{ product.discount }}</span></span
              ></v-card-title
            >
          </div>
          <div
            v-if="currentRouteName.substr(-2) === 'he'"
            style="background-color: #00825c"
            class="white--text align-end"
            height="200px"
          >
            <!-- сделать на 3 языках -->
            <v-card-title
              >{{ product.he.title }}
              <span class="mx-5"
                >{{ $t('moder.discount') }}
                <span>{{ product.discount }}</span></span
              ></v-card-title
            >
          </div>

          <div v-if="showEnInfo">
            <v-card-subtitle class="pb-0">
              {{ $t('moder.price') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                {{ product.en.price }}
                {{ product.en.currency_text }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">
              {{ $t('moder.description') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.en.description }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">
              {{ $t('moder.timeSub') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.en.time }}</div>
            </v-card-text>
          </div>

          <div v-if="showRuInfo">
            <v-card-subtitle class="pb-0">
              {{ $t('moder.price') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                {{ product.ru.price }}
                {{ product.ru.currency_text }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">
              {{ $t('moder.description') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.ru.description }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">
              {{ $t('moder.timeSub') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.ru.time }}</div>
            </v-card-text>
          </div>

          <div v-if="showHeInfo">
            <v-card-subtitle class="pb-0">
              {{ $t('moder.price') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                {{ product.he.price }}
                {{ product.he.currency_text }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">
              {{ $t('moder.description') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.he.description }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle class="pb-0">
              {{ $t('moder.timeSub') }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ product.he.time }}</div>
            </v-card-text>
          </div>
          <v-card-actions>
            <v-row>
              <v-col cols="12" md="7">
                <v-btn color="orange" text @click="changeShowRuInfo">
                  {{ $t('moder.showInfoRu') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="7">
                <v-btn color="orange" text @click="changeShowEnInfo">
                  {{ $t('moder.showInfoEn') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="10">
                <v-btn color="orange" text @click="changeShowHeInfo">
                  {{ $t('moder.showInfoHe') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn color="red" text @click="deleteProduct(product, i)">{{
                  $t('moder.delete')
                }}</v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn text @click="editProducts(product, i)">{{
                  $t('moder.editProducts')
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-dialog v-model="dialogAddProduct" max-width="80%">
        <v-card height="80%">
          <v-card-title>
            <span class="text-h5">{{ $t('moder.addProduct') }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="discountData"
                    :items="itemDiscount"
                    :label="$t('moder.discountItem')"
                    @change="changeShowDiscountNumber"
                  ></v-select>
                </v-col>
                <v-col v-if="showDiscountNumber" cols="12" md="6">
                  <div>{{ $t('moder.discount') }}</div>
                  <v-slider
                    v-model="discountNumber"
                    class="align-center"
                    :max="maxDiscount"
                    :min="minDiscount"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="discountNumber"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-col>
                <v-col cols="12" md="12">
                  <v-divider></v-divider>
                  <span>{{ $t('moder.infoRu') }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoRu.title"
                    :label="$t('moder.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoRu.description"
                    :label="$t('moder.subscriptionItem')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoRu.price"
                    :label="$t('moder.price')"
                    :rules="numRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoRu.time"
                    :label="$t('moder.timeSub')"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-divider></v-divider>
                  <span>{{ $t('moder.infoEn') }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoEn.title"
                    :label="$t('moder.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoEn.description"
                    :label="$t('moder.subscriptionItem')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoEn.price"
                    :label="$t('moder.price')"
                    :rules="numRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoEn.time"
                    :label="$t('moder.timeSub')"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-divider></v-divider>
                  <span>{{ $t('moder.infoHe') }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoHe.title"
                    :label="$t('moder.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoHe.description"
                    :label="$t('moder.subscriptionItem')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoHe.price"
                    :label="$t('moder.price')"
                    :rules="numRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="infoHe.time"
                    :label="$t('moder.timeSub')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">
              {{ $t('moder.cancel') }}
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              {{ $t('moder.create') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogEditProduct" max-width="80%">
        <v-card height="80%">
          <v-card-title>
            <span class="text-h5">{{ $t('moder.addProduct') }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="discountDataEdit"
                    :items="itemDiscount"
                    :label="$t('moder.discountItem')"
                    @change="changeShowDiscountNumberEdit"
                  ></v-select>
                </v-col>
                <v-col v-if="dialogEditData.discountBool" cols="12" md="6">
                  <div>{{ $t('moder.discount') }}</div>
                  <v-slider
                    v-model="dialogEditData.discount"
                    class="align-center"
                    :max="maxDiscount"
                    :min="minDiscount"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="dialogEditData.discount"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-col>
                <v-col cols="12" md="12">
                  <v-divider></v-divider>
                  <span>{{ $t('moder.infoRu') }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.ru.title"
                    :label="$t('moder.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.ru.description"
                    :label="$t('moder.subscriptionItem')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.ru.price"
                    :label="$t('moder.price')"
                    :rules="numRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.ru.time"
                    :label="$t('moder.timeSub')"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-divider></v-divider>
                  <span>{{ $t('moder.infoEn') }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.en.title"
                    :label="$t('moder.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.en.description"
                    :label="$t('moder.subscriptionItem')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.en.price"
                    :label="$t('moder.price')"
                    :rules="numRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.en.time"
                    :label="$t('moder.timeSub')"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-divider></v-divider>
                  <span>{{ $t('moder.infoHe') }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.he.title"
                    :label="$t('moder.name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.he.description"
                    :label="$t('moder.subscriptionItem')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.he.price"
                    :label="$t('moder.price')"
                    :rules="numRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="dialogEditData.he.time"
                    :label="$t('moder.timeSub')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEdit">
              {{ $t('moder.cancel') }}
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveEdit">
              {{ $t('moder.save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row v-else>
      <v-progress-circular
        style="margin-left: 45%; margin-top: 20%"
        :size="120"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Catalog',
  components: {},
  data() {
    return {
      isLoading: false,
      dataProducts: [],
      showRuInfo: false,
      showHeInfo: false,
      showEnInfo: false,
      dialogAddProduct: false,
      itemDiscount: [this.$t('moder.yes'), this.$t('moder.no')],
      discountData: '',
      showDiscountNumber: false,
      discountNumber: 0,
      maxDiscount: 100,
      minDiscount: 0,
      infoRu: {
        currency: 'RUB',
        currency_text: 'руб.'
      },
      infoEn: {
        currency: 'USD',
        currency_text: '$'
      },
      infoHe: {
        currency: 'ILS',
        currency_text: '₪'
      },
      showDeleteBtn: false,
      dialogEditProduct: false,
      dialogEditData: {
        ru: {
          currency: 'RUB',
          currency_text: 'руб.',
          description: '',
          price: 0,
          title: ''
        },
        en: {
          currency: 'USD',
          currency_text: '$',
          description: '',
          price: 0,
          title: ''
        },
        he: {
          currency: 'ILS',
          currency_text: '₪',
          description: '',
          price: 0,
          title: ''
        }
      },
      discountDataEdit: '',
      indexEdit: 0
    }
  },
  computed: {
    ...mapGetters(['getProductsDataModer']),
    numRules() {
      return [
        v => !!v || this.$t('teacherProfile.fieldRules'),
        v => /^\d+$/.test(v) || this.$t('teacherProfile.rulesPattern')
      ]
    },
    currentRouteName() {
      return this.$route.name
    }
  },
  watch: {},
  async mounted() {
    await this.getProducts()
    this.isLoading = true
  },
  created() {},
  methods: {
    async getProducts() {
      await this.$store.dispatch('GET_PRODUCTS_IN_MODER')
      console.log(this.getProductsDataModer)
      this.dataProducts = [...this.getProductsDataModer]
    },
    openAddProduct() {
      this.dialogAddProduct = true
    },
    close() {
      this.dialogAddProduct = false
    },
    closeEdit() {
      this.dialogEditProduct = false
    },
    changeShowRuInfo() {
      this.showRuInfo = true
      this.showHeInfo = false
      this.showEnInfo = false
    },
    changeShowEnInfo() {
      this.showRuInfo = false
      this.showHeInfo = false
      this.showEnInfo = true
    },
    changeShowHeInfo() {
      this.showRuInfo = false
      this.showHeInfo = true
      this.showEnInfo = false
    },
    changeShowDiscountNumber() {
      if (this.discountData === this.$t('moder.yes')) {
        this.showDiscountNumber = true
      } else {
        this.showDiscountNumber = false
      }
    },
    changeShowDiscountNumberEdit() {
      if (this.discountDataEdit === this.$t('moder.yes')) {
        this.dialogEditData.discountBool = true
      } else {
        this.dialogEditData.discountBool = false
      }
    },
    async save() {
      const ids = this.dataProducts.map(x => x.id)
      const maxId = Math.max(...ids)
      const obj = {
        days: 30,
        discount: this.discountNumber,
        discountBool: this.showDiscountNumber,
        en: this.infoEn,
        ru: this.infoRu,
        he: this.infoHe,
        id: maxId + 1
      }
      await this.$store.dispatch('POST_PRODUCTS_IN_MODER', obj)
      this.dataProducts = [...this.getProductsDataModer]
      this.dialogAddProduct = false
    },
    async saveEdit() {
      if (this.dialogEditData.discountBool === false) {
        this.dialogEditData.discount = 0
      }
      await this.$store.dispatch('PUT_PRODUCTS_IN_MODER', this.dialogEditData)
      Object.assign(
        this.dataProducts[this.indexEdit],
        this.getProductsDataModer
      )
      this.dialogEditProduct = false
    },
    editProducts(product, i) {
      this.dialogEditProduct = true
      this.dialogEditData = product
      this.indexEdit = i
      console.log('product', this.dialogEditData)
      if (this.dialogEditData.discountBool === true) {
        this.discountDataEdit = this.$t('moder.yes')
      } else {
        this.discountDataEdit = this.$t('moder.no')
      }
    },
    async deleteProduct(data, index) {
      await this.$store.dispatch('DELETE_PRODUCTS_IN_MODER', data.id)
      this.dataProducts.splice(index, 1)
    }
  }
}
</script>
